import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import LogOut from "../Components/LogOut";


export default function User(){
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
}, [])
    return(
        <div className="user">
            <p>Hello, {user.userName}</p>
            <LogOut/>
            <Link to={`/homePage`}>Home</Link>
        </div>
    )
}