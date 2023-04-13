import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

export default function HomePage(){
    let {id} = useParams();
    const [questions, setQuestions] = useState([])
    useEffect(() =>{
            axios.get(`/homepage`)
                .then(result =>{
                    console.log(result)
                    setQuestions(result.data.question)
                })
                .catch(err =>{
                    console.log(err)
                })
    }, [])
    return(
        <>
            <div>
                <Link to={`/add-question/${id}`}>Add new</Link>
            </div>
            Home
            {questions && questions.map(question =>{
                return(
                    <div key={question._id}>
                        <h3>{question.title}</h3>
                        <h5>{question.description.slice(0, 50)} <Link to={`/question/${question._id}`} id={id}>See more</Link></h5>
                        <h6><strong>{question.user.userName ? question.user.userName : null}</strong></h6>
                    </div>
                )
            })}
        </>
    )
}