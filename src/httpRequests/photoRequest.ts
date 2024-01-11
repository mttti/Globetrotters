import { PhotoType } from "../Types/PhotoType";

const URL: string = "https://jsonplaceholder.typicode.com/photos";

export async function getPhotosByAlbumId(id: number): Promise<PhotoType[]> {
    const response = await fetch(`${URL}?albumId=${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch photos");
    }

    const resData = await response.json();
    return resData;
}

export async function addPhoto(photo: PhotoType) {
    const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(photo),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to add photo!");
    }
    return response.status;
}

export async function deletePhoto(id: number) {
    const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete photo");
    }

    return response.status;
}
