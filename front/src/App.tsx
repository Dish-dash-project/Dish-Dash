import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Login, Register } from './FeaturesAuth/auth';

import  HomeCustomer  from './components/customer/customer_homPage';


function App() {


  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/home_customer" element={<HomeCustomer />} />
        <Route path="/dashboard" element={<div>Welcome to Dashboard
          
        </div>} />
      </Routes>
    </Router>
  );
}

export default App;