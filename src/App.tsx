import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Dashboard from './Routes/Dashboard';
import Login from './Routes/Login';
import Navbar from './Routes/Navbar';
import PrivateRoute from './Routes/PrivateRoute';
import useAuth from './hooks/useAuth';

const App = () => {
  // get auth value
  const auth = useAuth();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            auth ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
