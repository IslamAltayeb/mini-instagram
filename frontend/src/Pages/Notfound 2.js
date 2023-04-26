import { Link } from "react-router-dom"
import "../Style/notfound.css"
const Notfound = () => {
  return (
    <div className="not-found">
        <img src="https://bizflyportal.mediacdn.vn/bizflyportal/459/347/2020/06/02/17/37/70515910726734841.jpg" alt="404 page" />
        <button><Link to={`/HomePage`}>Go To Home</Link></button>
    </div>
  )
}

export default Notfound