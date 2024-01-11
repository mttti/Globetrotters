// import "./App.css";
import Header from "./components/Header";
import ActiveUsers from "./components/ActiveUsers";
import Posts from "./components/Posts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import AllAlbums from "./components/AllAlbums";
import AlbumPage from "./components/AlbumPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <section className="flex justify-around bg-stone-100 p-10">
                    <Routes>
                        <Route path="/" element={<Posts />}></Route>
                        <Route
                            path="/user/:id"
                            element={<UserProfile />}
                        ></Route>
                        <Route path="/albums" element={<AllAlbums />}></Route>
                        <Route
                            path="/album/:id"
                            element={<AlbumPage />}
                        ></Route>
                    </Routes>

                    <ActiveUsers />
                </section>
            </BrowserRouter>
        </>
    );
}

export default App;
