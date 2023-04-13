import Login from "./Pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Question from "./Pages/Question";
import AddQuestion from "./Pages/AddQuestion";


function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Routes>
                  <Route path='/' element={<Login />}/>
                  <Route path='/homePage/:id' element={<HomePage />}/>
                  <Route path='/question/:id' element={<Question />}/>
                  <Route path='/add-question/:id' element={<AddQuestion />}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
