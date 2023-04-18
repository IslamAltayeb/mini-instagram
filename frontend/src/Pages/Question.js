import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import React from "react";
import DeleteComment from "../Components/DeleteComment";
import NavBar from "../Components/NavBar";
import "../Style/Question.css"


export default function Question(){
    let {id} = useParams();
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [err, setErr] = useState('');
    const [questionUserId, setQuestionUserId] = useState('');
    const userId = localStorage.getItem("userId")

    useEffect(() =>{
        axios.get(`/question/${id}`)
            .then(result =>{
                setQuestionUserId(result.data.question.user._id)
                setComments(result.data.comments)
                setDescription(result.data.question.description)
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
                    editClose()
                    navigate(result.data)
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
                    navigate(result.data)
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }
    const deleteQuestion = () =>{
        axios.post(`/delete-question/${id}`)
            .then(result =>{
                navigate(result.data)
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
    const editClose = () =>{
        let element = document.getElementById("popUp");
        let currentClass = element.className;
        if (currentClass) {
            element.classList.remove(currentClass);
        }
        element.classList.add("hidden");
    }

    return(
        <div className="container flex-row">
            <NavBar />
            <div className="question-area flex-column">
                <div className="question flex-column">
                <span className="title flex-row">
                    <h2>Title:</h2>
                    <h1 className="question-text">{title}</h1>
                </span>
                    <span className="description flex-row">
                    <h2>Description:</h2>
                    <h3 className="description-text">{description}</h3>
                </span>
                    <div className="buttons flex-row">
                    <span>
                    {
                        userId === questionUserId ? <form onSubmit={deleteQuestion}>
                            <div onClick={deleteQuestion} className="button">Delete</div>
                        </form>: null
                    }
                </span>
                        <span>
                    {
                        userId === questionUserId ? <div onClick={edit} className="button">Edit
                        </div>: null
                    }
                </span>
                    </div>
                    <div id="popUp" className="hidden">
                        <form onSubmit={handleSubmit} className="flex-column">
                            <span className="gg-close icon close-icon" onClick={editClose}></span>
                            <input type="text" name="title" value={title} onChange={titleChange}/>
                            <textarea name="description" value={description} onChange={descriptionChange}></textarea>
                            <button className="submit" onClick={handleSubmit}>Submit</button>
                        </form></div>
                </div>
                <div className="comment-area">
                    <form className="flex-row" onSubmit={commentSubmit}>
                        <textarea name="txt" onChange={commentChange}></textarea>
                        <button className="submit" onClick={commentSubmit}>Comment</button>
                    </form>
                    {
                        err ? <h5>{err}</h5> : null
                    }
                    {comments && comments.map(comment =>{
                        return(
                            <div key={comment._id} className="oneComment flex-column">
                                <div className="flex-row comment">
                                    <h4>- {comment.txt}</h4>
                                    {
                                        userId === comment.user._id ? <DeleteComment id={comment._id} questionId={comment.question}/> : null
                                    }
                                </div>
                                <h5>- <Link to={`/user/${comment.user._id}`}>{comment.user.userName}</Link></h5>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}