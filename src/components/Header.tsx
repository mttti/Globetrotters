import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Header(): ReactElement {
    return (
        <>
            <header className="bg-gray-800 w-full  p-5">
                <div className="flex items-center text-white text-xl justify-end hover:cursor-pointer">
                    <p>Sign up!</p>
                </div>
                <div className="text-center flex justify-center items-center">
                    <h1 className="text-5xl font-bold text-slate-100">
                        Welcome to Globetrotters
                    </h1>
                    <img src="/icons/logo.svg" alt="Logo" className=" w-40" />
                </div>
                <div className="flex items-center text-white text-xl justify-start hover:cursor-pointer h-fit">
                    <p className="text-white text-2xl ">
                        <Link to="/">Posts</Link>
                    </p>
                    <p className="text-white text-2xl ml-10">
                        <Link to="/albums">Albums</Link>
                    </p>
                </div>
            </header>
        </>
    );
}
