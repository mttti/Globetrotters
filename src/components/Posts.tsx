import { useEffect, useState } from "react";
import { PostType } from "../Types/PostType";
import { getAllPosts } from "../httpRequests/postRequest";
import Post from "./Post";

export default function Posts() {
    const [allPosts, setAllPosts] = useState<PostType[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [postsQty, setPostsQty] = useState(10);

    useEffect(() => {
        async function fetchAllPosts() {
            setIsFetching(true);
            try {
                const posts = await getAllPosts();
                const shuffledPosts = posts.sort(() => Math.random() - 0.5);
                setAllPosts(shuffledPosts);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchAllPosts();
    }, []);

    function loadMorePosts() {
        setPostsQty((prevState) => prevState + 10);
    }

    return (
        <>
            <div className="p-10 w-11/12">
                {isFetching && <p className="text-center">Loading posts...</p>}
                {!isFetching &&
                    allPosts.length > 0 &&
                    allPosts
                        .slice(0, postsQty)
                        .map((post) => <Post key={post.id} post={post} />)}
                {!isFetching && postsQty < allPosts.length && (
                    <div
                        onClick={loadMorePosts}
                        className=" w-11/12 hover:cursor-pointer flex justify-center items-center flex-col"
                    >
                        <p>Load more posts</p>
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
