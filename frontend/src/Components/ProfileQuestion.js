import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "../Style/Profile.css"

export default function ProfileQuestion(props){
    const [questions, setQuestions] = useState([])

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
        <div>
            <div className="flex-row profile-question-area">
                <h5>Questions: </h5>
                <div className="profile-question-list flex-column">
                    {
                        questions && questions.map(question =>{
                            return(<div key={question._id}>
                                {props.id === question.user._id ? <div className="flex-row profile-question-item">
                                    <h3>{question.title}</h3>
                                    <Link to={`/question/${question._id}`} className="profile-question-link">See more</Link>
                                </div> : null}
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}