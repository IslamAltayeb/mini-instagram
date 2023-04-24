import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const PublicRoutes = ({ children }) => {
    const loggedToSystem = Cookie.get('user');
    console.log(loggedToSystem);
    return(
        loggedToSystem ? <Navigate to='/HomePage' /> : children
    )
}

const PrivateRoute = ({ children }) => {
    const loggedToSystem = Cookie.get('user');
    console.log(loggedToSystem);
    return(
        loggedToSystem ? children : <Navigate to="/" />
    )
}

export {
    PublicRoutes, 
    PrivateRoute
}