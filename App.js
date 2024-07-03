import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Workouts from './pages/Workouts';
import Error from "./pages/Error";
import { UserProvider } from './UserContext';import './App.css';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

    useEffect(() => {

      fetch('http://localhost:4000/users/details', {
        headers: {
          Authorization: `Bearer ${ localStorage.getItem('token') }`
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        if (typeof data.user !== "undefined") {
  
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin
          });
  
        } else {
  
          setUser({
            id: null,
            isAdmin: null
          });
  
        }
  
      })
  
      }, []);

  // Function for clearing localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  };

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavBar />
        <Container fluid>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  )
}

export default App;
