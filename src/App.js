import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
//Routing Components
import ForgotPassword from './components/User/ForgotPassword/ForgotPassword';
import Home from './components/User/Home/Home';
import Login from './components/User/Login/Login';
import Register from './components/User/Register/Register';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import AdminHome from './components/Admin/AdminHome/AdminHome';
import AdminEditUser from './components/Admin/AdminEditUser/AdminEditUser';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/forgot/password' element={<ForgotPassword />} />
          <Route path='/home' element={<Home />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashbord' element={< AdminHome />} />
          <Route path='/admin/edit-user/:id' element={< AdminEditUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
