import Login from "./Pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Question from "./Pages/Question";
import AddQuestion from "./Pages/AddQuestion";
import Profile from "./Pages/Profile";
import Video from "./Pages/Video";
import Footer from "./Pages/Footer";
import Notfound from "./Pages/Notfound";


function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Routes>
                  <Route path='/' element={<Login />}/>
                  <Route path='/homePage' element={<HomePage />}/>
                  <Route path='/question/:id' element={<Question />}/>
                  <Route path='/add-question/:id' element={<AddQuestion />}/>
                  <Route path='/user/:id' element={<Profile />}/>
                  <Route path='/video' element={<Video />}/>
                  <Route path="*" element={<Notfound />} />
              </Routes>
              <Footer />
          </div>
      </BrowserRouter>
  );
}

export default App;
