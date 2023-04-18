import NavBar from "../Components/NavBar";
import {useState} from "react";
import "../Style/Video.css"
import axios from "axios";
import { Card } from "react-bootstrap";

export default function Video () {
    const [images, setImages] = useState([])
    const [searchWord, setSearchWord] = useState('')
    const [err, setErr] = useState('')

    const handleChange = (e) =>{
        setErr('')
        setSearchWord(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        setImages([])
        setErr('')
        if (searchWord === ''){
            setErr("Field is required")
        } else{
            axios.get(`https://g.tenor.com/v1/search?key=YXY14YGLASBG&q=${searchWord}`)
                .then(result =>{
                    setImages(result.data.results)
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }


    return(
        <div className="flex-row container">
            <NavBar/>
            <div className="video-area flex-column">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Search..." onChange={handleChange}/>
                    <button className="submit" onClick={handleSubmit}>Search</button>
                </form>
                {
                    err ? <h5 className="error">{err}</h5> : null
                }
                <div className='video-card'>
                    {images && images.map( img =>{
                        return(
                            <Card key={img.id} style={{ width: '14rem' }}>
                                <Card.Img variant="top" src={img.media[0].gif.url} />
                                <Card.Body>
                                    <Card.Title className="video-title">{img.content_description}</Card.Title>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}