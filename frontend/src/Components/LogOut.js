import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


export default function LogOut(){
    const [path, setPath] = useState('');


    const logOut = () =>{
        axios.get(`/logOut`)
            .then(result =>{
                console.log(result.data)
                setPath(result.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }
    return(
        <div>
            <div onClick={logOut}><Link to={path}>Log Out</Link></div>
        </div>
    )
}