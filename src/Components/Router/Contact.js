import { Link, Outlet } from "react-router-dom";

export function Contact() {
    return (
        <div>
            <h3>Contact Page..</h3>


            <Link to='company'>Company</Link> <br />
            <Link to='channel'>Channel</Link> <br />
            <Link to='other'>Other</Link> <br />
            <Outlet />
        </div>
    )

}