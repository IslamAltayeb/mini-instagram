import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "../Style/Homepage.css"

import User from "../Components/User";

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
        <div className="homepage container">

            <User/>
            
            <div>
                <h1>Do you have any questions? - Easy add a <Link to={`/add-question/${userId}`}>new</Link></h1>
            </div>
            <div className="question-area">
                {questions && questions.map(question =>{
                    return(
                        <div key={question._id} className="question-card">
                            <h3>{question.title}</h3>
                            <p>{question.description.slice(0, 50)}</p>
                            <h5><strong>{question.user.userName ? question.user.userName : null}</strong><Link to={`/question/${question._id}`}>See more</Link></h5>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}