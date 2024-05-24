import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Dashboard from './Routes/Dashboard';
import Login from './Routes/Login';
import Navbar from './Routes/Navbar';
import Profile from './Routes/Profile';
import PrivateRoute from './Routes/PrivateRoute';
import useAuth from './hooks/useAuth';

const App = () => {
  const { user, profileComplete, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            user ? (
              profileComplete ? (
                <Navigate to='/dashboard' />
              ) : (
                <Navigate to='/profile' />
              )
            ) : (
              <Navigate to='/login' />
            )
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
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
