import { useLocation } from "react-router-dom";
import { AlbumType } from "../Types/AlbumType";
import { useState, useEffect, useRef } from "react";
import { PhotoType } from "../Types/PhotoType";
import {
    addPhoto,
    deletePhoto,
    getPhotosByAlbumId,
} from "../httpRequests/photoRequest";
import Photo from "./Photo";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import InfoModal from "./InfoModal";
export default function AlbumPage() {
    const album: AlbumType = useLocation().state ?? {};
    const { id } = useParams();
    const title = album.title ? album.title : "";
    const [albumNotFound, setAlbumNotFound] = useState(false);
    const [isModalHidden, setIsModalHidden] = useState(true);
    const [modal, setModal] = useState<{ text: string; isError: boolean }>({
        text: "",
        isError: false,
    });

    const inputTitle = useRef<HTMLInputElement>(null);
    const inputUrl = useRef<HTMLInputElement>(null);

    const [photos, setPhotos] = useState<PhotoType[]>([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setAlbumNotFound(false);
        async function fetchPhotos() {
            setIsFetching(true);
            try {
                if (!id) {
                    setAlbumNotFound(true);
                    return;
                }
                const photos: PhotoType[] = await getPhotosByAlbumId(
                    id ? +id : -1
                );
                if (photos.length === 0) {
                    setAlbumNotFound(true);
                }
                setPhotos(photos);
            } catch (error) {
                throw new Error();
            }
            setIsFetching(false);
        }

        fetchPhotos();
    }, []);

    function showModal() {
        setIsModalHidden((prevState) => !prevState);
    }
    async function addPhotoHandler() {
        if (!inputTitle.current?.value || !inputUrl.current?.value) {
            return;
        }
        const title = inputTitle.current?.value;
        const url = inputUrl.current?.value;
        const albumId = album.id;
        const newImg: PhotoType = {
            albumId: albumId,
            id: photos.length + 1,
            title: title,
            url: url,
            thumbnailUrl: url,
        };
        try {
            const response = await addPhoto(newImg);
            if (response === 201) {
                setPhotos((prevState) => [newImg, ...prevState]);
                setModal({ text: "Added a new photo", isError: false });
                setIsModalHidden(false);
                setTimeout(showModal, 3000);
            } else {
                setModal({ text: "Failed to add a new photo", isError: true });
                setIsModalHidden(false);
                setTimeout(showModal, 3000);
            }
        } catch (error) {
            throw new Error();
        }
    }

    async function photoDeleteHandler(id: number) {
        try {
            const response = await deletePhoto(id);

            if (response === 200) {
                setPhotos((prevState) => {
                    const temp = prevState.filter((photo) => photo.id !== id);
                    return temp;
                });
                setModal({ text: "Photo removed", isError: false });
                setIsModalHidden(false);
                setTimeout(showModal, 3000);
            }
        } catch (error) {
            setModal({ text: "Failed to remove a photo", isError: true });
            setIsModalHidden(false);
            setTimeout(showModal, 3000);
            throw new Error();
        }
    }

    return (
        <>
            {!isModalHidden &&
                createPortal(
                    <InfoModal isError={modal.isError} text={modal.text} />,
                    document.getElementById("modal") as HTMLElement
                )}
            <div className="p-10 w-11/12">
                <div className="bg-stone-200 mb-10 p-10 rounded-xl w-11/12 ">
                    {albumNotFound && !isFetching && (
                        <p className="text-center">Album not found!</p>
                    )}
                    {!albumNotFound && photos && (
                        <>
                            <p className="text-center text-3xl">{title}</p>
                            <div className="text-center m-10">
                                <p className="text-xl">Add new photo</p>
                                <input
                                    type="text"
                                    ref={inputTitle}
                                    placeholder="Enter title"
                                />
                                <input
                                    type="text"
                                    ref={inputUrl}
                                    placeholder="Enter url"
                                    className="mx-5"
                                />
                                <div className="mt-5">
                                    <button
                                        onClick={addPhotoHandler}
                                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-40"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center">
                                {isFetching && <p>Loading photos...</p>}
                                {!isFetching &&
                                    photos?.map((photo) => (
                                        <Photo
                                            photo={photo}
                                            key={photo.id}
                                            deleteHandler={photoDeleteHandler}
                                        />
                                    ))}
                            </div>
                        </>
                    )}
                    {!albumNotFound && photos.length === 0 && !isFetching && (
                        <p className="text-center">This album is empty!</p>
                    )}
                </div>
            </div>
        </>
    );
}
