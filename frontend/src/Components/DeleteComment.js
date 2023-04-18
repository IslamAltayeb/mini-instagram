import axios from "axios";
import React from "react";
import {useNavigate} from "react-router-dom";


export default function DeleteComment(props){
    const navigate = useNavigate();

    const deleteComment = () =>{
        axios.post(`/delete-comment/${props.id}`)
            .then(() =>{
                window.location.reload()
            })
            .catch(err =>{
                console.log(err)
            })
    }

    return(
        <div className="gg-trash icon" onClick={deleteComment}>
        </div>
    )
}