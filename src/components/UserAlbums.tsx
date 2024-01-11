import { useEffect, useState } from "react";
import { getAlbumsByUserId } from "../httpRequests/albumRequest";
import { AlbumType } from "../Types/AlbumType";
import Album from "./Album";

export default function UserAlbums({ userId }: { userId: number }) {
    const [albums, setAlbums] = useState<AlbumType[]>([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function fetchAllPosts() {
            setIsFetching(true);
            try {
                const albums = await getAlbumsByUserId(userId);
                setAlbums(albums);
            } catch (error) {
                throw new Error();
            }
            setIsFetching(false);
        }
        fetchAllPosts();
    }, [userId]);

    return (
        <>
            <div className="p-10 w-full bg-stone-300 flex flex-wrap justify-center h-fit">
                {isFetching && <p>Loading albums...</p>}
                {!isFetching &&
                    albums.length > 0 &&
                    albums.map((album) => (
                        <Album key={album.id} album={album} />
                    ))}
                {!isFetching && albums.length === 0 && (
                    <p className="text-center">No albums found!</p>
                )}
            </div>
        </>
    );
}
