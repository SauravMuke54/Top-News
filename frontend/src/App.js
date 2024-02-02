
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './component/Home/Home';
import Signin from './component/Signin/Signin';
import Signup from './component/Signup/Signup';
import Navbar from './component/Navbar/Navbar';
import './App.css'
import Dashboard from './component/Dashboard/Dashboard';
import PrivateRoute from './helper/PrivateRoute';
function App() {
  return (
   <div className='bg vh-100 overflow-auto' style={{background: "linear-gradient(to right, #8e44ad, #3498db, #00cec9)"}}>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
    </Routes>


    </BrowserRouter>

   
   </div>
  );
}

export default App;
