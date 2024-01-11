import { useEffect, useState } from "react";
import { PostType } from "../Types/PostType";
import { getUserById } from "../httpRequests/userRequest";

import { User } from "../Types/UserType";
import Comments from "./Comments";

export default function Post({ post }: { post: PostType }) {
    const [user, setUser] = useState<User>();
    const [areCommentsHidden, setAreCommentsHidden] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    const [commmentsQty, setCommentsQty] = useState<number>(0);

    useEffect(() => {
        async function fetchUser() {
            setIsFetching(true);
            try {
                const userData = await getUserById(post.userId);
                setUser(userData);
            } catch (error) {}
            setIsFetching(false);
        }

        fetchUser();
    }, []);

    function commentsVisibilityHandler() {
        setAreCommentsHidden((prevState) => !prevState);
    }

    const arrowUrl = areCommentsHidden
        ? "/icons/arrow-down.png"
        : "/icons/arrow-up.png";

    return (
        <div className="bg-stone-200 mb-10 p-10 rounded-xl w-11/12">
            {isFetching && <p className="text-center">Loading user</p>}
            {!isFetching && (
                <div className="flex items-center">
                    <img
                        src={`/avatars/${user?.id}.jpg`}
                        alt={`${user?.username}'s avatar`}
                        className="w-40 rounded-full mr-10"
                    />
                    <h4>
                        <b className="text-xl">{user?.username}</b>
                    </h4>
                </div>
            )}

            <h1 className="text-2xl text-center mb-10">{post.title}</h1>
            <p>{post.body}</p>
            <div className="flex items-center mt-10 justify-end">
                <img
                    src="/icons/chat.png"
                    alt="comment icon"
                    className="w-8 mr-3 ml-3"
                />
                <p className="text-xl">{commmentsQty}</p>
            </div>
            <div className="flex justify-center">
                <img
                    onClick={commentsVisibilityHandler}
                    src={arrowUrl}
                    alt="Arrow down"
                    className="w-8 hover:cursor-pointer"
                />
            </div>
            <Comments
                postId={post.id}
                areCommentsHidden={areCommentsHidden}
                setCommentsQty={setCommentsQty}
            />
        </div>
    );
}
