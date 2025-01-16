import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login.jsx';
import TaskList from './components/TaskList';

const App = () => {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Asegurarnos de que la redirección se hace después de que el estado del token esté actualizado.
    if (token) {
      console.log('Token en Redux:', token);
      console.log('Token en localStorage:', localStorage.getItem('token'));
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/tasks"
          element={token ? <TaskList /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
