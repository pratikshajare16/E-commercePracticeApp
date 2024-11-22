import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export function About() {

    const [data, setData] = useState({ users: [] });
    const navigate = useNavigate()
    useEffect(() => {
        userList()
    }, []);

    function userList() {
        fetch("http://localhost:4000/users")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("API Response:", data)
                setData(data)

            })
            .catch((error) => console.error("Fetch error:", error));
    }

    function deleteUser(id, name) {
        const isConfirmed = window.confirm('Are you sure you want to delete?');
        console.log("UserID", id)
        if (isConfirmed) {
            fetch(`http://localhost:4000/users/${id}`, {
                method: 'DELETE',
            }).then((result) => {
                result.json().then((resp) => {
                    console.log(result)
                    alert(`User ${name} Deleted`);
                    userList()
                })
            }).catch((error) => console.error("Fetch error:", error));
        } else {

            console.log('Deletion canceled!');
        }
    }


    return (
        <div >
            <h5>User List</h5>
            <p></p>
            <button onClick={() => navigate('/add_user')}>Create New User</button>
            <br /> <br />
            <table border="1" style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '8px', textAlign: 'center' }}>ID</th>
                        <th style={{ padding: '8px', textAlign: 'center' }}>Name</th>
                        <th style={{ padding: '8px', textAlign: 'center' }}>Email ID</th>
                        <th style={{ padding: '8px', textAlign: 'center' }}>Mobile Number</th>
                        <th style={{ padding: '8px', textAlign: 'center', }} colspan="2">Operations</th>

                    </tr>
                </thead>
                <tbody >
                    {data.users.map((item) => (
                        <tr key={item.userId}>
                            <td style={{ padding: '8px', textAlign: 'center' }}>{item.userId}</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}><Link to={`/user/${item.name}`}>{item.name}</Link></td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>{item.email}</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>{item.phoneNumber}</td>
                            <td>
                                <Image
                                    style={{
                                        height: 18, width: 18, cursor: "pointer",
                                    }}
                                    onClick={() => deleteUser(item.userId, item.name)}
                                    src={require("../../../src/Images/delete.png")}
                                    alt="Remove user" />
                            </td>
                            <td>
                                <Image
                                    style={{
                                        height: 20, width: 20, cursor: "pointer",
                                    }}
                                    onClick={() => navigate('/update_user', { state: { userId: item.userId, userName: item.name, userEmail: item.email, userPhNo: item.phoneNumber } })}
                                    src={require("../../../src/Images/edit.png")}
                                    alt="Remove user" />
                            </td>
                            {/* <td> <button onClick={() => navigate('/update_user', { state: { userId: item.userId, userName: item.name, userEmail: item.email, userPhNo: item.phoneNumber } })}>Update User</button></td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />

            {/* <li><Link to="/user/Abc">ABC</Link></li>
            <li><Link to="/user/Pratiksha">Pratiksha</Link></li> */}
        </div >
    )

}