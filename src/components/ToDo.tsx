import { useRef, useState } from "react";
import { ToDoType } from "../Types/ToDoType";

export default function ToDo({
    todo,
    deleteHandler,
    editHandler,
}: {
    todo: ToDoType;
    deleteHandler: (id: number) => void;
    editHandler: (comment: ToDoType) => Promise<number>;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const todoInput = useRef<HTMLInputElement>(null);
    function editStateHandler() {
        setIsEditing((prevState) => !prevState);
    }
    async function editTodoHandler() {
        if (!todoInput.current?.value) {
            return;
        }
        const newToDo: ToDoType = {
            userId: todo.userId,
            id: todo.id,
            title: todoInput.current.value,
            completed: todo.completed,
        };

        const response = await editHandler(newToDo);
        if (response !== 200) {
            // Dodanie modalu z błędem
            return;
        }
        todo.title = todoInput.current.value;

        setIsEditing(false);
    }
    return (
        <div className="bg-stone-200 mb-10 p-10 rounded-xl w-11/12">
            {!isEditing && (
                <>
                    <p>{todo.title}</p>
                    <div className="flex justify-end">
                        <img
                            src="/icons/edit.png"
                            alt="edit"
                            className="w-5 hover:cursor-pointer mr-1"
                            onClick={editStateHandler}
                        />
                        <img
                            src="/icons/recycle-bin.png"
                            alt="delete"
                            className="w-5 hover:cursor-pointer"
                            onClick={() => deleteHandler(todo.id)}
                        />
                    </div>
                </>
            )}
            {isEditing && (
                <>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            defaultValue={todo.title}
                            ref={todoInput}
                            id="place"
                            className="w-full rounded-md ml-3"
                        />
                        <div className="flex justify-end mt-5">
                            <button
                                onClick={editTodoHandler}
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-40"
                            >
                                Save
                            </button>
                            <button
                                onClick={editStateHandler}
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 w-40"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
