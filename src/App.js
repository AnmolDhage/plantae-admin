import './App.css';
import Navbar from './component/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Plants from './pages/Plants/Plants';
import Login from './pages/Login/Login';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/sign-in" />
    }
    return children;
  }

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<Login />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Navbar>
                <Plants />
              </Navbar>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
