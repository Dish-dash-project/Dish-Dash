import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register } from './FeaturesAuth/auth';
import { useSelector } from 'react-redux';
import  HomeCustomer  from './components/customer/customer_homPage';
import { RootState } from './store/store';

function App() {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/home_customer" element={<HomeCustomer />} />
        <Route path="/dashboard" element={<div>Welcome to Dashboard
          
        </div>} />
      </Routes>
    </Router>
  );
}

export default App;