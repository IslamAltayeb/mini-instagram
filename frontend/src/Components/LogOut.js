import {useNavigate} from "react-router-dom";
import axios from "axios";


export default function LogOut(){
    const navigate = useNavigate();


    const logOut = () =>{
        axios.get(`/logOut`)
            .then(result =>{
                navigate(result.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }
    return(
        <div>
            <div onClick={logOut}>Log Out</div>
        </div>
    )
}