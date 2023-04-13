import {useEffect, useState} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";


export default function Question(props){
    let {id} = useParams();
    const [question, setQuestion] = useState([]);
    const [comments, setComments] = useState([]);
    const [path, setPath] = useState('');

    useEffect(() =>{
        axios.get(`/question/${id}`)
            .then(result =>{
                console.log(props.id)
                setComments(result.data.comments)
                setQuestion(result.data.question)
            })
            .catch(err =>{
                console.log(err)
            })
    },[])

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
            <form onSubmit={deleteQuestion}>
                <Link to={path}><button onClick={deleteQuestion}>Delete</button></Link>
            </form>
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