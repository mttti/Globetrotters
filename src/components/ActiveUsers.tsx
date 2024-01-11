import { useEffect, useState } from "react";
import { User } from "../Types/UserType";
import UserThumbnail from "./UserThumbnail";
import { getUsers } from "../httpRequests/userRequest";
import { Link } from "react-router-dom";

export default function ActiveUsers() {
    const [activeUsers, setActiveUsers] = useState<User[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    useEffect(() => {
        async function fetchUsers() {
            setIsFetching(true);
            try {
                const users = await getUsers();
                setActiveUsers(users);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchUsers();
    }, []);

    return (
        <>
            <div className="p-10 bg-stone-200 mt-10 rounded-xl h-fit ">
                <h4 className="text-center font-bold text-xl mb-5">
                    Active users
                </h4>
                {isFetching && <p>Loading users...</p>}
                {!isFetching &&
                    activeUsers.length > 0 &&
                    activeUsers.map((user) => (
                        <Link
                            to={`/user/${user.username}`}
                            key={user.id}
                            state={user.id}
                        >
                            <UserThumbnail
                                userName={user.username}
                                userId={user.id}
                                key={user.id}
                            />
                        </Link>
                    ))}
            </div>
        </>
    );
}
