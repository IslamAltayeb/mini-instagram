import React, {useState} from "react";
import  {Link} from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

export default function Login(){
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const [path, setPath] = useState('');
    const [err, setErr] = useState('')

    const userEmailChange = (e) =>{
        setUserEmail(e.target.value)
    }
    const userPasswordChange = (e) =>{
        setUserPassword(e.target.value)
    }
    const userNameChange = (e) =>{
        setUserName(e.target.value)
    }
    const loginSubmit = (e) =>{
        e.preventDefault()
        setErr('')
        if (userEmail === '' || userPassword === ''){
            setErr("Field is required")
        } else{
            axios.post(`/log-in`,{
                email: userEmail,
                password: userPassword
            })
                .then(result =>{
                    localStorage.setItem("userId", `${result.data.user}`)
                    setPath(result.data.path)
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }
    const signUpSubmit = (e) =>{
        e.preventDefault()
        setErr('')
        if (userName === '' || userEmail === '' || userPassword === ''){
            setErr("Field is required")
        } else{
            axios.post(`/signUp`,{
                userName: userName,
                email: userEmail,
                password: userPassword
            })
                .then(result =>{
                    localStorage.setItem("userId", `${result.data.user}`)
                    setPath(result.data)
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }
    return(
        <>
            <Header />
            <form onSubmit={loginSubmit}>
                <input type="email" name="email" onChange={userEmailChange}/>
                <input type="password" name="password" onChange={userPasswordChange}/>
                {userEmail && userPassword ? < button onClick={loginSubmit}><Link to={path}>Login</Link></button> : null
                }
            </form>
            <form onSubmit={signUpSubmit}>
                <input type="text" name="userName" onChange={userNameChange}/>
                <input type="email" name="email" onChange={userEmailChange}/>
                <input type="password" name="password" onChange={userPasswordChange}/>
                {userEmail && userPassword && userName ? < button onClick={signUpSubmit}><Link to={path}>Sign Up</Link></button> : null
                }
            </form>
            {
                err ? <h5>{err}</h5> : null
            }
            <Footer />
        </>
    )
}

// kyrylo@gmail.com
// 1234