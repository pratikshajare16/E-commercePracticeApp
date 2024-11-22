import { Link, useNavigate } from "react-router-dom";

export function Home() {

    const navigate = useNavigate();

    const navTogoPage = (url) => {
        navigate(url);
    }

    return (
        <div>
            <h3>Home Page..</h3>
            <Link to="/about">About</Link>
            <br /> <br />

            <h3>Learn React Navigation</h3>
            <br /> <br />
            <button onClick={() => navTogoPage('/about')}>Go to page About</button>
            <br /> <br />
            <button onClick={() => navTogoPage('/filter')}>Go to page Filter</button>

        </div>
    )

}