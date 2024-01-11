import { ReactElement } from "react";

export default function UserThumbnail({
    userName,
    userId,
}: {
    userName: string;
    userId: number;
}): ReactElement {
    return (
        <div className=" p-3 pr-10 rounded-md flex items-center mb-5 hover:bg-stone-300 hover:cursor-pointer">
            <img
                src={`/avatars/${userId}.jpg`}
                alt={`${userName}'s avatar`}
                className="w-20 mr-5 rounded-full border-4 border-lime-600 "
            />
            <h4>{userName}</h4>
        </div>
    );
}
