import { PostType } from "../Types/PostType";

const URL: string = "https://jsonplaceholder.typicode.com/posts";

export async function getAllPosts(): Promise<PostType[]> {
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    const resData = await response.json();
    return resData;
}

export async function getPostsByUserId(id: number): Promise<PostType[]> {
    const response = await fetch(`${URL}?userId=${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    const resData = await response.json();
    return resData;
}
