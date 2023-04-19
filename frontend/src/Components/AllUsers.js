import {useEffect, useState} from "react";
import axios from "axios";
import React from "react";
import "../Style/UserArea.css"
import {Link} from "react-router-dom";

export default function AllUsers(){
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        axios.get(`/allUsers`)
            .then(result =>{
                console.log(result.data.user)
                setUsers(result.data.user)
            })
            .catch(err =>{
                console.log(err)
            })
    }, [])


    return(
        <div className="flex-row users-area">
            {
                users && users.map(user=>{
                    return(
                        <div key={user._id}>
                            <Link to={`/user/${user._id}`}>
                                {
                                    user.image ?
                                        <span className="profile-img-users">
                                    <img src={"http://localhost:2100"+user.image} alt="avatar"/>
                                </span> : null
                                }
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}