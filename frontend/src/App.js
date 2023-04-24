import Login from "./Pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Question from "./Pages/Question";
import AddQuestion from "./Pages/AddQuestion";
import Profile from "./Pages/Profile";
import Video from "./Pages/Video";
import Footer from "./Pages/Footer";
import Notfound from "./Pages/Notfound";
import {PublicRoutes,PrivateRoute} from "./Config"


function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Routes>
                  <Route path='/' element={<PublicRoutes> <Login /> </PublicRoutes>}/>
                  <Route path='/homePage' element={<PrivateRoute> <HomePage /> </PrivateRoute>}/>
                  <Route path='/question/:id' element={<PrivateRoute> <Question /> </PrivateRoute>}/>
                  <Route path='/add-question/:id' element={<PrivateRoute> <AddQuestion /> </PrivateRoute>}/>
                  <Route path='/user/:id' element={<PrivateRoute> <Profile/> </PrivateRoute>}/>
                  <Route path='/video' element={<PrivateRoute> <Video /> </PrivateRoute>}/>
                  <Route path="*" element={<Notfound />} />
              </Routes>
              <Footer />
          </div>
      </BrowserRouter>
  );
}

export default App;
