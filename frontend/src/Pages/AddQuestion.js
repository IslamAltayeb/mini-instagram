import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function AddQuestion(){
    let {id} = useParams()
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [path, setPath] = useState('');
    const [err, setErr] = useState('');
    const [user, setUser] = useState();

    const titleChange = (e) =>{
        setTitle(e.target.value)
    }
    const descriptionChange = (e) =>{
        setDescription(e.target.value)
    }
    useEffect(()=>{
        axios.get(`/addQuestion/${id}`)
            .then(result =>{
                console.log(id)
                setUser(result.data)
            })
            .catch(err =>{
                console.log(err)
            })
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault()
        setErr('')
        if (title === '' && description === ''){
            setErr("Field is required")
        } else{
            axios.post(`/add-new/${id}`,{
                title: title,
                description: description
            })
                .then(result =>{
                    setPath(result.data)
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }
    return(
        <>
            <form action="/add-new/<%=user%>" method="post" onSubmit={handleSubmit}>
                <input type="hidden" name="user" value="<%=user%>"/>
                <input type="text" name="title" id="title" placeholder="Write question here..." onChange={titleChange}/>
                <br/>
                <textarea name="description" id="description" placeholder="Write your description here..." onChange={descriptionChange}></textarea>
                <br/>
                <button onClick={handleSubmit}>Add</button>
            </form>
            {
                err ? <h5>{err}</h5> : null
            }
        </>
    )
}