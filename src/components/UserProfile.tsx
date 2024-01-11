import { useEffect, useState } from "react";
import { getUserByUsername } from "../httpRequests/userRequest";
import { useParams } from "react-router-dom";
import { User } from "../Types/UserType";
import UserPosts from "./UserPosts";
import UserAlbums from "./UserAlbums";
import UserToDo from "./UserToDos";
export default function UserProfile() {
    const { id } = useParams();

    const [user, setUser] = useState<User>();
    const userId: number = user?.id ?? 0;
    const [hidePosts, setHidePosts] = useState(false);
    const [hideAlbums, setHideAlbums] = useState(true);
    const [hideToDo, setHideToDo] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);

    useEffect(() => {
        setUserNotFound(false);
        async function fetchUser() {
            setIsFetching(true);
            try {
                if (!id) {
                    setUserNotFound(true);
                    return;
                }
                const userData = await getUserByUsername(id);
                if (userData.length === 0) {
                    setUserNotFound(true);
                }
                setUser(userData[0]);
            } catch (error) {}
            setIsFetching(false);
        }

        fetchUser();
    }, [id, userId]);

    function userPostsHandler() {
        setHideToDo(true);
        setHideAlbums(true);
        setHidePosts((prevState) => !prevState);
    }
    function userAlbumsHandler() {
        setHidePosts(true);
        setHideToDo(true);
        setHideAlbums((prevState) => !prevState);
    }
    function userToDoHandler() {
        setHideAlbums(true);
        setHidePosts(true);
        setHideToDo((prevState) => !prevState);
    }
    const cssClass =
        "hover:bg-stone-300 w-1/3 py-3 text-center hover:cursor-pointer";
    const cssClassClicked =
        "hover:bg-stone-300 bg-stone-300 w-1/3 py-3 text-center hover:cursor-pointer";

    return (
        <div className="p-10 w-11/12">
            <div className="bg-stone-200 mb-10 p-10 rounded-xl w-11/12">
                {userNotFound && !isFetching && (
                    <p className="text-center">User not found!</p>
                )}
                {isFetching && <p className="text-center">Loading user...</p>}
                {!userNotFound && !isFetching && (
                    <>
                        <div className="flex justify-between">
                            <img
                                src={`/avatars/${userId}.jpg`}
                                alt={`${user?.name}'s avatar`}
                                className="rounded-full"
                            />
                            <div className="mt-10">
                                <p className="text-6xl">{user?.username}</p>
                            </div>
                            <div className="w-5/12  ">
                                <p className="text-center text-2xl">Details:</p>
                                <p>Name: {user?.name}</p>
                                <p>E-mail: {user?.email}</p>
                                <p>Phone number: {user?.phone}</p>
                                <p>City: {user?.address.city}</p>
                                <p>
                                    My website:{" "}
                                    <a href={`https://www.${user?.website}`}>
                                        {user?.website}
                                    </a>
                                </p>
                                <p>Company name: {user?.company.name} </p>
                                <p>
                                    Company's catchphrase:{" "}
                                    {user?.company.catchPhrase}
                                </p>
                            </div>
                        </div>
                        <div className="mt-10 flex justify-around text-xl ">
                            <p
                                className={
                                    hidePosts ? cssClass : cssClassClicked
                                }
                                onClick={userPostsHandler}
                            >
                                My posts
                            </p>
                            <p
                                className={
                                    hideAlbums ? cssClass : cssClassClicked
                                }
                                onClick={userAlbumsHandler}
                            >
                                My albums
                            </p>
                            <p
                                className={
                                    hideToDo ? cssClass : cssClassClicked
                                }
                                onClick={userToDoHandler}
                            >
                                Places I want to visit
                            </p>
                        </div>

                        <div className={hidePosts ? "hidden" : "block"}>
                            <UserPosts userId={userId} />
                        </div>
                        <div className={hideAlbums ? "hidden" : "block"}>
                            <UserAlbums userId={userId} />
                        </div>
                        <div className={hideToDo ? "hidden" : "block"}>
                            <UserToDo userId={userId} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
