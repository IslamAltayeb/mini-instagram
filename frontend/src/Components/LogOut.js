import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookie from 'js-cookie';

export default function LogOut(){
    const navigate = useNavigate();


    const logOut = () =>{
        axios.get(`/logOut`)
            .then(result =>{
                Cookie.remove('user')
                navigate(result.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }
    return(
        <>
            <div onClick={logOut} className="logout nav-list">Log Out</div>
        </>
    )
}