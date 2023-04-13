import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function HomePage(){
    const [questions, setQuestions] = useState([])
    const userId = localStorage.getItem("userId")

    useEffect(() =>{
            axios.get(`/homepage`)
                .then(result =>{
                    setQuestions(result.data.question)
                })
                .catch(err =>{
                    console.log(err)
                })
    }, [])
    return(
        <>
            <div>
                <Link to={`/add-question/${userId}`}>Add new</Link>
            </div>
            Home
            {questions && questions.map(question =>{
                return(
                    <div key={question._id}>
                        <h3>{question.title}</h3>
                        <h5>{question.description.slice(0, 50)} <Link to={`/question/${question._id}`}>See more</Link></h5>
                        <h6><strong>{question.user.userName ? question.user.userName : null}</strong></h6>
                    </div>
                )
            })}
        </>
    )
}