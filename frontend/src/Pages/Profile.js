import {useEffect, useState} from "react";
import axios from "axios";
import NavBar from "../Components/NavBar";
import {useNavigate, useParams} from "react-router-dom";
import "../Style/Profile.css"
import ProfileQuestion from "../Components/ProfileQuestion";

export default function Profile(){
    let {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [image, setImage] = useState({})
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [about, setAbout] = useState('')
    const userId = localStorage.getItem("userId")

    function getUser() {
        axios.get(`/user/${id}`)
            .then(result =>{
                setUser(result.data.user)
            })
            .catch(err =>{
                console.log(err)
            })
    }
    useEffect(() =>{       
        getUser(id)
    }, [id])
    const firstNameChange = (e) =>{
        console.log(e.target.value)
        setFirstName(e.target.value)
    }
    const lastNameChange = (e) =>{
        console.log(e.target.value)
        setLastName(e.target.value)
    }
    const aboutChange = (e) =>{
        console.log(e.target.value)
        setAbout(e.target.value)
    }
    const firstNameSubmit = (e) =>{
        e.preventDefault()
        axios.post(`/user/${userId}`,{
            firstName: firstName,
        })
            .then(() =>{
                getUser()
                window.location.reload()
            })
            .catch(err =>{
                console.log(err)
            })

    }
    const lastNameSubmit = (e) =>{
        e.preventDefault()
        axios.post(`/user/${userId}`,{
            lastName: lastName,
        })
            .then(() =>{
                getUser()
                window.location.reload()
            })
            .catch(err =>{
                console.log(err)
            })

    }
    const aboutSubmit = (e) =>{
        e.preventDefault()
        axios.post(`/user/${userId}`,{
            about: about,
        })
            .then(() =>{
                getUser()
                window.location.reload()
            })
            .catch(err =>{
                console.log(err)
            })

    }
    const firstNameUpdate = (e) =>{
        setAbout('')
        e.preventDefault()
        axios.post(`/user/${userId}`,{
            firstName: firstName,
        })
            .then(() =>{
                getUser()
            })
            .catch(err =>{
                console.log(err)
            })

    }
    const lastNameUpdate = (e) =>{
        setAbout('')
        navigate(`/user/${userId}`)
        e.preventDefault()
        axios.post(`/user/${userId}`,{
            lastName: lastName,
        })
            .then(() =>{
                getUser()
            })
            .catch(err =>{
                console.log(err)
            })

    }
    const aboutUpdate = (e) =>{
        setAbout('')
        e.preventDefault()
        axios.post(`/user/${userId}`,{
            about: about,
        })
            .then(() =>{
                getUser()
            })
            .catch(err =>{
                console.log(err)
            })

    }
    const imageChange = (e) =>{
        setImage(e.target.files[0])
    }
    const sendImage = () =>{
        let formData = new FormData();

        formData.append("avatar", image)

        fetch(`/uploadFile/${userId}`, {
            method: "post",
            body: formData,
        })
        setImagePath(`http://localhost:2100${user.image}`)
    }

    return(
        <>
            {
                id === userId ? <div className="container flex-row">
                    <NavBar/>
                    <form className="profile-area flex-column">
                        <h2>Profile info</h2>
                        <span>
                            {user.image ? <span className="profile-img"><img src={"http://localhost:2100"+user.image} alt="avatar"/></span> :
                                <div>
                                    <input type="file" onChange={imageChange}/>
                                    <button onClick={sendImage}>Upload</button>
                                </div>
                            }
                        </span>
                        <span className="flex-row profile-item">
                            <h5>Username : </h5>
                            <h4>{user.userName}</h4>
                        </span>
                        <span className="flex-row profile-item">
                            <h5>Email : </h5>
                            <h4>{user.email}</h4>
                        </span>
                        <span className="flex-row profile-item">
                            <h5>First Name : </h5>
                            {user.firstName ?
                                <div className="flex-row">
                                    <h4>{user.firstName}</h4>
                                    <span className="gg-arrow-right-o icon" onClick={firstNameUpdate}></span>
                                </div>
                                : <div className="flex-row">
                                    <input type="text" name="firstName" onChange={firstNameChange}/>
                                    <span className="gg-add icon" onClick={firstNameSubmit}></span>
                                </div>
                            }
                        </span>
                        <span className="flex-row profile-item">
                            <h5>Last Name : </h5>
                            {user.lastName ? <div className="flex-row">
                                    <h4>{user.lastName}</h4>
                                    <span className="gg-arrow-right-o icon" onClick={lastNameUpdate}></span>
                            </div>
                                : <div className="flex-row">
                                    <input type="text" name="lastName" onChange={lastNameChange}/>
                                    <span className="gg-add icon" onClick={lastNameSubmit}></span>
                                </div>}
                        </span>
                        <span className="flex-row profile-item">
                            <h5 className="about-me-title">About me : </h5>
                            {user.about ? <div className="flex-row">
                                    <h4 className="about-me">{user.about}</h4>
                                    <span className="gg-arrow-right-o icon" onClick={aboutUpdate}></span>
                            </div>
                                : <div className="flex-row">
                                    <textarea name="about" onChange={aboutChange}/>
                                    <span className="gg-add-r icon" onClick={aboutSubmit}></span>
                                </div>
                            }
                        </span>
                        <ProfileQuestion id={id}/>
                    </form>
                </div> :
                    <div className="container flex-row">
                        <NavBar/>
                        <form className="profile-area flex-column">
                            <h2>Profile info</h2>
                            {user.image ?
                                <span className="profile-img">
                                    <img src={"http://localhost:2100"+user.image} alt="avatar"/>
                                </span> : null}
                            <span className="flex-row profile-item">
                                <h5>Username : </h5>
                                <h4>{user.userName}</h4>
                            </span>
                            <span className="flex-row profile-item">
                                <h5>Email : </h5>
                                <h4>{user.email}</h4>
                            </span>
                            <span className="flex-row profile-item">
                                <h5>First Name : </h5>
                                <h4>{user.firstName}</h4>
                            </span>
                            <span className="flex-row profile-item">
                                <h5>Last Name : </h5>
                                <h4>{user.lastName}</h4>
                            </span>
                            <span className="flex-row profile-item">
                                <h5 className="about-me-title">About me : </h5>
                                <h4 className="about-me">{user.about}</h4>
                            </span>
                            <ProfileQuestion id={id}/>
                        </form>
                    </div>
            }
        </>
    )
}