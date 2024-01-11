import { useState } from "react";
import { PhotoType } from "../Types/PhotoType";
import PhotoModal from "./PhotoModal";
import { createPortal } from "react-dom";

export default function Photo({
    photo,
    deleteHandler,
}: {
    photo: PhotoType;
    deleteHandler: (id: number) => void;
}) {
    const [showPhoto, setShowPhoto] = useState(false);
    function show() {
        setShowPhoto((prevState) => !prevState);
    }

    const modal = document.getElementById("modal") as HTMLElement;

    return (
        <>
            {showPhoto &&
                createPortal(<PhotoModal show={show} url={photo.url} />, modal)}

            <div className="flex flex-col w-1/4 text-center mt-10 mx-4">
                <div onClick={show}>
                    <img
                        src={photo.url}
                        alt={photo.title}
                        className="hover:cursor-pointer"
                    />
                </div>
                <p>{photo.title}</p>
                <div className="flex justify-end">
                    <img
                        src="/icons/recycle-bin.png"
                        alt="delete"
                        className="w-5 hover:cursor-pointer"
                        onClick={() => {
                            deleteHandler(photo.id);
                        }}
                    />
                </div>
            </div>
        </>
    );
}
