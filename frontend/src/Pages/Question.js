import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import React from "react";
import DeleteComment from "../Components/DeleteComment";


export default function Question(){
    let {id} = useParams();
    const [question, setQuestion] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
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
            })
            .catch(err =>{
                console.log(err)
            })
    },[])

    const commentChange = (e) =>{
        setNewComment(e.target.value)
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

    return(
        <div>
            <h1>{question.title}</h1>
            <h3>{question.description}</h3>
            {
                userId === questionUserId ? <form onSubmit={deleteQuestion}>
                    <Link to={path}><button onClick={deleteQuestion}>Delete</button></Link>
                </form> : null
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