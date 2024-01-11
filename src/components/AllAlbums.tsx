import { AlbumType } from "../Types/AlbumType";
import { getAllAlbums } from "../httpRequests/albumRequest";
import { useState, useEffect } from "react";
import Album from "./Album";

export default function AllAlbums() {
    const [allAlbums, setAllAlbums] = useState<AlbumType[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [albumsQty, setAlbumsQty] = useState(20);

    useEffect(() => {
        async function fetchAllPosts() {
            setIsFetching(true);
            try {
                const albums = await getAllAlbums();
                const shuffledAlbums = albums.sort(() => Math.random() - 0.5);
                setAllAlbums(shuffledAlbums);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchAllPosts();
    }, []);

    function loadMoreAlbums() {
        setAlbumsQty((prevState) =>
            prevState < allAlbums.length ? prevState + 20 : prevState
        );
    }

    return (
        <>
            <div className="p-10 w-11/12 flex flex-wrap justify-center h-fit">
                {isFetching && <p>Loading albums...</p>}
                {!isFetching && allAlbums.length === 0 && (
                    <p className="text-center">No albums found</p>
                )}
                {!isFetching &&
                    allAlbums.length > 0 &&
                    allAlbums
                        .slice(0, albumsQty)
                        .map((album) => <Album key={album.id} album={album} />)}
                {!isFetching && albumsQty < allAlbums.length && (
                    <div
                        onClick={loadMoreAlbums}
                        className=" w-11/12 hover:cursor-pointer flex justify-center items-center flex-col"
                    >
                        <p>Load more albums</p>
                        <div className="mt-5 bg-stone-200 rounded-full p-2 hover:bg-stone-300">
                            <img
                                src="/icons/arrow-down.png"
                                alt="load more"
                                className="w-12 "
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
