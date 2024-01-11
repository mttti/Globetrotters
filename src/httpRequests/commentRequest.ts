import { CommentType } from "../Types/CommentType";

const URL: string = "https://jsonplaceholder.typicode.com/comments";

export async function getCommentsByPostId(id: number): Promise<CommentType[]> {
    const response = await fetch(`${URL}?postId=${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch comments");
    }

    const resData = await response.json();
    return resData;
}

export async function addComment(comment: CommentType) {
    const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to add comment");
    }

    return response.status;
}

export async function deleteComment(id: number) {
    const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete comment");
    }

    return response.status;
}

export async function editComment(comment: CommentType) {
    const response = await fetch(`${URL}/${comment.id}`, {
        method: "PUT",
        body: JSON.stringify(comment),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to edit comment");
    }

    return response.status;
}
