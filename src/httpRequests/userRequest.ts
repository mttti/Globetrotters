import { User } from "../Types/UserType";

const URL: string = "https://jsonplaceholder.typicode.com/users";

export async function getUsers(): Promise<User[]> {
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    const resData = await response.json();
    return resData;
}

export async function getUserById(id: number): Promise<User> {
    const response = await fetch(`${URL}/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    const resData = await response.json();
    return resData;
}

export async function getUserByUsername(name: string): Promise<User[]> {
    const response = await fetch(`${URL}?username=${name}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    const resData = await response.json();
    return resData;
}
