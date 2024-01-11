import { Link } from "react-router-dom";
import { AlbumType } from "../Types/AlbumType";

export default function Album({ album }: { album: AlbumType }) {
    return (
        <Link to={`/album/${album.id}`} key={album.id} state={album}>
            <div className="flex bg-stone-200 mb-10 p-10 rounded-xl w-96 h-96 mx-10 hover:cursor-pointer text-center flex-col justify-center items-center">
                <img
                    src={`/avatars/${album.userId}.jpg`}
                    alt="users's avatar"
                    className="rounded-full w-60"
                />
                <p className="text-xl">{album.title}</p>
            </div>
        </Link>
    );
}
