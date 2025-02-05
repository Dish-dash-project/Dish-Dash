import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register } from './FeaturesAuth/auth';
import { useSelector } from 'react-redux';
import HomeCustomer from './components/customer/customer_homPage';
import { RootState } from './store/store';
import HomePage from './Components/DRIVER/HomePage';



function App() {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
  
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home_driver" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home_customer" element={<HomeCustomer />} />
        <Route path="/home_driver" element={<HomePage />} />
     
      </Routes>
    </Router>
  );
}

export default App;