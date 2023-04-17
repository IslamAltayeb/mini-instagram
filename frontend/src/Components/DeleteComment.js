import axios from "axios";
import React, {useState} from "react";
import {Link} from "react-router-dom";


export default function DeleteComment(props){
    const [path, setPath] = useState('');

    const deleteComment = () =>{
        axios.post(`/delete-comment/${props.id}`)
            .then(result =>{
                setPath(result.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    return(
        <div>
            <button onClick={deleteComment}><Link to={path}>Delete</Link></button>
        </div>
    )
}