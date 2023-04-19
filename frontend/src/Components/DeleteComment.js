import axios from "axios";
import React from "react";


export default function DeleteComment(props){

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