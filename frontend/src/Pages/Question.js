import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Question(){
    let {id} = useParams();
    const [question, setQuestion] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() =>{
        axios.get(`/question/${id}`)
            .then(result =>{
                setComments(result.data.comments)
                setQuestion(result.data.question)
            })
            .catch(err =>{
                console.log(err)
            })
    },[])

    return(
        <div>
            <h1>{question.title}</h1>
            <h3>{question.description}</h3>
            {comments && comments.map(comment =>{
                return(
                    <div key={comment._id}>
                        <h5>{comment.txt}</h5>
                    </div>
                )
            })}
        </div>
    )
}