import { AlbumType } from "../Types/AlbumType";

const URL: string = "https://jsonplaceholder.typicode.com/albums";

export async function getAllAlbums(): Promise<AlbumType[]> {
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error("Failed to fetch albums");
    }

    const resData = await response.json();
    return resData;
}

export async function getAlbumsByUserId(id: number): Promise<AlbumType[]> {
    const response = await fetch(`${URL}?userId=${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch albums");
    }

    const resData = await response.json();
    return resData;
}
