import { ToDoType } from "../Types/ToDoType";

const URL: string = "https://jsonplaceholder.typicode.com/todos";

export async function getToDoByUserId(id: number): Promise<ToDoType[]> {
    const response = await fetch(`${URL}?userId=${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch places");
    }

    const resData = await response.json();
    return resData;
}

export async function deleteTodo(id: number) {
    const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete place");
    }

    return response.status;
}

export async function editTodo(todo: ToDoType) {
    const response = await fetch(`${URL}/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to edit place");
    }
    return response.status;
}

export async function addTodo(todo: ToDoType) {
    const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to add new place");
    }
    return response.status;
}
