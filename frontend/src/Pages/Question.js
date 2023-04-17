import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import React from "react";
import DeleteComment from "../Components/DeleteComment";
import User from "../Components/User";


export default function Question(){
    let {id} = useParams();
    const [question, setQuestion] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [err, setErr] = useState('');
    const [path, setPath] = useState('');
    const [questionUserId, setQuestionUserId] = useState('');
    const userId = localStorage.getItem("userId")

    useEffect(() =>{
        axios.get(`/question/${id}`)
            .then(result =>{
                setQuestionUserId(result.data.question.user._id)
                setComments(result.data.comments)
                setQuestion(result.data.question)
                setTitle(result.data.question.title)
            })
            .catch(err =>{
                console.log(err)
            })
    },[])

    const titleChange = (e) =>{
        setTitle(e.target.value)
    }
    const descriptionChange = (e) =>{
        setDescription(e.target.value)
    }
    const commentChange = (e) =>{
        setNewComment(e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        setErr('')
        if (title === '' && description === ''){
            setErr("Field is required")
        } else{
            axios.post(`/update-question/${id}`,{
                title: title,
                description: description,
            })
                .then(result =>{
                    setPath(result.data)
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }
    const commentSubmit = () =>{
        setErr('')
        if (newComment === ''){
            setErr("Field is required")
        } else{
            axios.post(`/add-comment/${id}`,{
                txt: newComment,
                user: userId,
                question: id
            })
                .then(result =>{
                    setPath(result.data)
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }
    const deleteQuestion = () =>{
        axios.post(`/delete-question/${id}`)
            .then(result =>{
                setPath(result.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }
    const edit = () =>{
        let element = document.getElementById("popUp");
        let currentClass = element.className;
        if (currentClass) {
            element.classList.remove(currentClass);
        }
        element.classList.add("visible");
    }

    return(
        <div>
            <User />
            <Link to={`/homePage`}>Home</Link>
            <h1>{question.title}</h1>
            <h3>{question.description}</h3>
            {
                userId === questionUserId ? <form onSubmit={deleteQuestion}>
                    <Link to={path}><button onClick={deleteQuestion}>Delete</button></Link>
                </form>: null
            }
            {
                userId === questionUserId ? <div onClick={edit}>Edit
                    <div id="popUp" className="hidden">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input type="text" name="title" value={title} onChange={titleChange}/>
                                <br/>
                                    <textarea name="description" onChange={descriptionChange}></textarea>
                            </div>

                            <button onClick={handleSubmit}>Submit</button>
                        </form></div>
                </div>: null
            }


            <form onSubmit={commentSubmit}>
                <label htmlFor="comment">Add A Comment</label>
                <textarea name="txt" id="comment-text" onChange={commentChange}></textarea>
                <button onClick={commentSubmit}><Link to={path}>Comment</Link></button>
            </form>
            {
                err ? <h5>{err}</h5> : null
            }
            {comments && comments.map(comment =>{
                return(
                    <div key={comment._id}>
                        <h5>{comment.txt}</h5>
                        {
                            userId === comment.user ? <DeleteComment id={comment._id}/> : null
                        }
                    </div>
                )
            })}
        </div>
    )
}