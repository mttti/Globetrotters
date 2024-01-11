import { useState, useRef } from "react";
import { CommentType } from "../Types/CommentType";

export default function Comment({
    comment,
    deleteHandler,
    editHandler,
}: {
    comment: CommentType;
    deleteHandler: (id: number) => void;
    editHandler: (comment: CommentType) => Promise<number>;
}) {
    const [isEditing, setIsEditing] = useState(false);

    const emailInput = useRef<HTMLInputElement>(null);
    const titleInput = useRef<HTMLInputElement>(null);
    const bodyInput = useRef<HTMLTextAreaElement>(null);

    function editStateHandler() {
        setIsEditing((prevState) => !prevState);
    }

    async function editCommentHandler() {
        if (
            !emailInput.current?.value ||
            !titleInput.current?.value ||
            !bodyInput.current?.value
        ) {
            return;
        }

        const newComment: CommentType = {
            postId: comment.postId,
            id: comment.id,
            email: emailInput.current.value,
            body: bodyInput.current.value,
            name: titleInput.current.value,
        };

        const response = await editHandler(newComment);
        if (response !== 200) {
            return;
        }
        comment.email = emailInput.current.value;
        comment.body = bodyInput.current.value;
        comment.name = titleInput.current.value;

        setIsEditing(false);
    }

    return (
        <div className="bg-stone-100 p-5 m-1 rounded-md">
            {!isEditing && (
                <>
                    <p>{comment.email}:</p>
                    <p className="text-lg">
                        <b>{comment.name}</b>
                    </p>
                    <p>
                        {" "}
                        <i>{comment.body}</i>
                    </p>
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
                            onClick={() => deleteHandler(comment.id)}
                        />
                    </div>
                </>
            )}
            {isEditing && (
                <div className="flex flex-col">
                    <div>
                        Author:
                        <input
                            type="email"
                            defaultValue={comment.email}
                            ref={emailInput}
                            id="email"
                            className="w-fit rounded-md ml-3"
                        />
                    </div>
                    <div>
                        Title:
                        <input
                            type="text"
                            defaultValue={comment.name}
                            ref={titleInput}
                            id="title"
                            className="w-fit my-5 rounded-md ml-3"
                        />
                    </div>
                    <div>
                        Content:
                        <textarea
                            defaultValue={comment.body}
                            ref={bodyInput}
                            id="body"
                            className="w-full h-40 rounded-md"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={editCommentHandler}
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
            )}
        </div>
    );
}
