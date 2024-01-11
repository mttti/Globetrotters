import { useEffect, useState } from "react";
import { getPostsByUserId } from "../httpRequests/postRequest";
import { PostType } from "../Types/PostType";
import Post from "./Post";

export default function UserPosts({ userId }: { userId: number }) {
    const [posts, setAllPosts] = useState<PostType[]>([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function fetchAllPosts() {
            setIsFetching(true);
            try {
                const posts = await getPostsByUserId(userId);
                setAllPosts(posts);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchAllPosts();
    }, [userId]);

    return (
        <>
            <div className="p-10 w-full bg-stone-300 flex flex-col items-center">
                {isFetching && <p className="text-center">Loading posts...</p>}
                {!isFetching &&
                    posts.length > 0 &&
                    posts.map((post) => <Post key={post.id} post={post} />)}
                {!isFetching && posts.length === 0 && (
                    <p className="text-center">No posts found!</p>
                )}
            </div>
        </>
    );
}
