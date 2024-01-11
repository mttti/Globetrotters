import { useState } from "react";

export default function PhotoModal({
    url,
    show,
}: {
    url: string;
    show: () => void;
}) {
    const [isHidden, setIsHidden] = useState(false);

    function toggleVisibility() {
        setIsHidden((prevState) => !prevState);
        show();
    }
    const cssClass = isHidden ? "hidden" : "block";

    return (
        <div className={cssClass} onClick={toggleVisibility}>
            <div className="bg-black bg-opacity-50 w-full h-full flex justify-center items-center fixed">
                <img src={url} />
            </div>
        </div>
    );
}
