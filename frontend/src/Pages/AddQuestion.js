import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import "../Style/AddQuestion.css"
import User from "../Components/User";

export default function AddQuestion(){
    const navigate = useNavigate();
    let {id} = useParams()
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [err, setErr] = useState('');
    const [user, setUser] = useState();
    const userId = localStorage.getItem("userId")

    const titleChange = (e) =>{
        setErr('')
        setTitle(e.target.value)
    }
    const descriptionChange = (e) =>{
        setErr('')
        setDescription(e.target.value)
    }
    useEffect(()=>{
        axios.get(`/addQuestion/${id}`)
            .then(result =>{
                setUser(result.data.user)
            })
            .catch(err =>{
                console.log(err)
            })
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault()
        setErr('')
        if (!title && !description){
            setErr("All fields are required")
        } else{
            axios.post(`/add-new/${id}`,{
                title: title,
                description: description,
                user: user
            })
                .then(result =>{
                    navigate(result.data)
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }
    return(
        <div className="add-question container">
            <User/>
            <h1>Add your question</h1>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="user" value={userId}/>
                <input type="text" name="title" id="title" placeholder="Write title here..." onChange={titleChange}/>
                <br/>
                <textarea name="description" id="description" placeholder="Write your description here..." onChange={descriptionChange}></textarea>
                <br/>
                <button className="button-add-question" onClick={handleSubmit}>Add</button>
            </form>
            {
                err ? <h5 className="error">{err}</h5> : null
            }
        </div>
    )
}