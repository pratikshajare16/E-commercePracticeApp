import { useParams, useLocation } from "react-router-dom"


// Example of useParam()
export function User() {
    const params = useParams();
    const { name } = params;
    const location = useLocation();
    console.log(location);
    console.log(params)
    return (
        <div>
            <h6> This is {name} Page</h6>
        </div>
    )
}