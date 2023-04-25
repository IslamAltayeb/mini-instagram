import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import LogOut from "../Components/LogOut";
import "../Style/User.css"


export default function NavBar(){
    const [user, setUser] = useState({})
    const userId = localStorage.getItem("userId")

useEffect(() =>{
    axios.get(`/user/${userId}`)
        .then(result =>{
            setUser(result.data.user)
        })
        .catch(err =>{
            console.log(err)
        })
}, [userId])
    return(
        <div className="user flex-column">
            <span className="logo flex-column">
                <h2>Matrix</h2>
                <h2>Master</h2>
                <h2>Community</h2>
            </span>
            <div>
                {user.image ?
                <span className="profile-img-navbar">
                    <img src={"http://localhost:2100"+user.image} alt="avatar"/>
                </span> : <p>Hello,</p>}
                {user.firstName ? <h2>{user.firstName}</h2>  : <h2>User</h2>}
            </div>
            <ul>
                <ol className="logout nav-list"><Link to={`/user/${user._id}`}>Profile</Link></ol>
                <ol className="logout nav-list"><Link to={`/homePage`}>Home</Link></ol>
                <ol className="logout nav-list"><Link to={`/video`}>Video</Link></ol>
            </ul>
            <LogOut/>
        </div>
    )
}