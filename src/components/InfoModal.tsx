export default function InfoModal({
    isError,
    text,
}: {
    isError: boolean;
    text: string;
}) {
    const bgColor = isError
        ? "bg-red-700 rounded-md text-white text-2xl border-white border-2"
        : " bg-lime-600 rounded-md text-white text-2xl border-white border-2";
    return (
        <div className="w-full flex justify-center p-5  fixed">
            <div className={bgColor}>
                <p className="p-10 rounded-md">{text}</p>
            </div>
        </div>
    );
}
