import { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { CommentType } from "../Types/CommentType";
import {
    getCommentsByPostId,
    addComment,
    deleteComment,
    editComment,
} from "../httpRequests/commentRequest";
import InfoModal from "./InfoModal";
import { createPortal } from "react-dom";

export default function Comments({
    postId,
    areCommentsHidden,
    setCommentsQty,
}: {
    postId: number;
    areCommentsHidden: boolean;
    setCommentsQty: React.Dispatch<React.SetStateAction<number>>;
}) {
    const inputEmail = useRef<HTMLInputElement>(null);
    const inputTitle = useRef<HTMLInputElement>(null);
    const inputText = useRef<HTMLTextAreaElement>(null);
    const [isModalHidden, setIsModalHidden] = useState(true);

    const [comments, setComments] = useState<CommentType[]>([]);

    const [isFetching, setIsFetching] = useState(false);
    const [modal, setModal] = useState<{ text: string; isError: boolean }>({
        text: "",
        isError: false,
    });

    useEffect(() => {
        async function fetchComments() {
            setIsFetching(true);
            try {
                const commentsData = await getCommentsByPostId(postId);
                setComments(commentsData);
            } catch (error) {}
            setIsFetching(false);
        }
        fetchComments();
    }, []);
    useEffect(() => {
        setCommentsQty(comments.length);
    }, [comments]);
    async function addCommentHandler(event: React.FormEvent) {
        event.preventDefault();
        const emailInput = inputEmail.current?.value;
        const titleInput = inputTitle.current?.value;
        const textInput = inputText.current?.value;
        if (!emailInput || !titleInput || !textInput) {
            setModal({ text: "Failed to add a new comment", isError: true });
            setIsModalHidden(false);
            setTimeout(showModal, 3000);
            return;
        }

        const input: CommentType = {
            postId: postId,
            id: comments.length + 1,
            name: titleInput,
            email: emailInput,
            body: textInput,
        };
        const response = await addComment(input);
        if (response === 201) {
            setComments((prevState) => [input, ...prevState]);
            setModal({ text: "Added a new comment", isError: false });
            setIsModalHidden(false);
            setTimeout(showModal, 3000);
        } else {
            setModal({ text: "Failed to add a new comment", isError: true });
            setIsModalHidden(false);
            setTimeout(showModal, 3000);
        }
    }
    function showModal() {
        setIsModalHidden((prevState) => !prevState);
    }

    async function deleteCommentHandler(id: number) {
        try {
            const response = await deleteComment(id);

            if (response === 200) {
                setComments((prevState) => {
                    const temp = prevState.filter(
                        (comment) => comment.id !== id
                    );
                    return temp;
                });
                setModal({ text: "Comment removed", isError: false });
                setIsModalHidden(false);
                setTimeout(showModal, 3000);
            }
        } catch (error) {
            setModal({ text: "Failed to remove a comment", isError: true });
            setIsModalHidden(false);
            setTimeout(showModal, 3000);
            throw new Error();
        }
    }

    async function editCommentHandler(comment: CommentType) {
        try {
            const response = await editComment(comment);
            setModal({ text: "Comment edited", isError: false });
            setIsModalHidden(false);
            setTimeout(showModal, 3000);
            return response;
        } catch (error) {
            setModal({ text: "Failed to edit comment", isError: true });
            setIsModalHidden(false);
            setTimeout(showModal, 3000);
            throw new Error();
        }
    }
    const commentsCssClass = areCommentsHidden ? "hidden" : "block";

    return (
        <>
            {!isModalHidden &&
                createPortal(
                    <InfoModal isError={modal.isError} text={modal.text} />,
                    document.getElementById("modal") as HTMLElement
                )}
            <div className={commentsCssClass}>
                {isFetching && <p>Loading comments...</p>}
                {!isFetching &&
                    comments?.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            deleteHandler={deleteCommentHandler}
                            editHandler={editCommentHandler}
                        />
                    ))}
                {!isFetching && comments.length === 0 && (
                    <p className="text-center">No comments found!</p>
                )}
                <div className="bg-stone-100 p-5 m-1 rounded-md">
                    <form className="flex flex-col items-center">
                        <div className="flex items-center flex-col ">
                            <label htmlFor="email">Enter e-mail</label>
                            <input
                                ref={inputEmail}
                                type="email"
                                name="email"
                                id="email"
                                className="rounded-md"
                                required
                            />
                        </div>
                        <div className="flex items-center flex-col ">
                            <label htmlFor="title">Enter title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                ref={inputTitle}
                            />
                        </div>

                        <textarea
                            name="content"
                            id="content"
                            cols={60}
                            rows={5}
                            className="mt-5 mb-5 rounded-md"
                            ref={inputText}
                        ></textarea>
                        <button
                            type="submit"
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-40"
                            onClick={addCommentHandler}
                        >
                            Add a new comment
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
