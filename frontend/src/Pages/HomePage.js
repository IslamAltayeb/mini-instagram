import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "../Style/Homepage.css"

import NavBar from "../Components/NavBar";

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
        <div className="flex-row container">

            <NavBar/>
            <div className="homepage-area">
                <h1>Do you have any questions? - Easy add a <Link to={`/add-question/${userId}`}>new</Link></h1>
                <div className="question-area flex-column">
                    {questions && questions.map(question =>{
                        return(
                            <div key={question._id} className="question-card">
                                <h3>{question.title}</h3>
                                <p>{question.description.slice(0, 100)}</p>
                                <h5>
                                    <Link to={`/user/${question.user._id}`}>
                                        <strong>
                                            {question.user ? <div className="flex-row user-question-info">
                                                {question.user.image ? <span className="profile-img-homePage">
                                                    <img src={"http://localhost:2100"+question.user.image} alt="avatar"/>
                                                </span> : null}
                                                <p>{question.user.userName}</p>
                                            </div> : null}
                                        </strong>
                                    </Link>
                                    <Link to={`/question/${question._id}`}>See more</Link>
                                </h5>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}