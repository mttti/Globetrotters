import { useEffect, useRef, useState } from "react";
import { ToDoType } from "../Types/ToDoType";
import {
    addTodo,
    deleteTodo,
    editTodo,
    getToDoByUserId,
} from "../httpRequests/todoRequest";
import ToDo from "./ToDo";
import { createPortal } from "react-dom";
import InfoModal from "./InfoModal";

export default function UserToDos({ userId }: { userId: number }) {
    const [todos, setTodos] = useState<ToDoType[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const inputTitle = useRef<HTMLInputElement>(null);
    const [isModalHidden, setIsModalHidden] = useState(true);
    const [modal, setModal] = useState<{ text: string; isError: boolean }>({
        text: "",
        isError: false,
    });
    useEffect(() => {
        async function fetchAllTodos() {
            setIsFetching(true);
            try {
                const todos = await getToDoByUserId(userId);
                setTodos(todos);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchAllTodos();
    }, [userId]);

    async function deleteTodoHandler(id: number) {
        try {
            const response = await deleteTodo(id);

            if (response === 200) {
                setTodos((prevState) => {
                    const temp = prevState.filter((todo) => todo.id !== id);
                    return temp;
                });
                setModal({ text: "Place removed", isError: false });
                setIsModalHidden(false);
                setTimeout(showModal, 3000);
            }
        } catch (error) {
            setModal({ text: "Failed to remove a place", isError: true });
            setIsModalHidden(false);
            setTimeout(showModal, 3000);
            throw new Error();
        }
    }

    async function editTodoHandler(todo: ToDoType) {
        try {
            const response = await editTodo(todo);
            setModal({ text: "Place edited", isError: false });
            setIsModalHidden(false);
            setTimeout(showModal, 3000);
            return response;
        } catch (error) {
            setModal({ text: "Failed to edit place", isError: true });
            setIsModalHidden(false);
            setTimeout(showModal, 3000);
            throw new Error();
        }
    }

    async function addTodoHandler() {
        if (!inputTitle.current?.value) {
            return;
        }

        const newTodo: ToDoType = {
            userId: userId,
            id: todos.length + 1,
            title: inputTitle.current.value,
            completed: false,
        };
        const response = await addTodo(newTodo);
        if (response === 201) {
            setTodos((prevState) => [newTodo, ...prevState]);
            setModal({ text: "Added new place", isError: false });
            setIsModalHidden(false);
            setTimeout(showModal, 3000);
        } else {
            setModal({ text: "Failed to add a new place", isError: true });
            setIsModalHidden(false);
            setTimeout(showModal, 3000);
        }
    }
    function showModal() {
        setIsModalHidden((prevState) => !prevState);
    }

    return (
        <>
            {!isModalHidden &&
                createPortal(
                    <InfoModal isError={modal.isError} text={modal.text} />,
                    document.getElementById("modal") as HTMLElement
                )}
            <div className="p-10 w-full bg-stone-300 flex flex-col items-center">
                {isFetching && (
                    <p className="text-center">Places are loading...</p>
                )}
                {!isFetching && (
                    <div className="bg-stone-200 mb-10 p-10 rounded-xl w-11/12">
                        <p className="text-center text-xl">Add a new place</p>
                        <input
                            type="text"
                            placeholder="Add a new place"
                            id="place"
                            ref={inputTitle}
                            className="w-full rounded-md ml-3"
                        />
                        <div className="flex justify-end mt-5">
                            <button
                                onClick={addTodoHandler}
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-40"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                )}
                {!isFetching &&
                    todos.length > 0 &&
                    todos
                        .filter((todo) => todo.completed === false)
                        .map((todo) => (
                            <ToDo
                                key={todo.id}
                                todo={todo}
                                deleteHandler={deleteTodoHandler}
                                editHandler={editTodoHandler}
                            />
                        ))}
                {!isFetching && todos.length === 0 && (
                    <p>There are no places user want to go to</p>
                )}
            </div>
        </>
    );
}
