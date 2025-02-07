import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import HomeCustomer from './Components/customer/customer_homPage';
import { RootState } from './store/store';
import HomePage from './Components/DRIVER/HomePage';
import Profile from './Components/DRIVER/Profile';
import AuthPersist from './FeaturesAuth/AuthPersist';
import { AuthPage } from './FeaturesAuth/auth';
import ErrorBoundary from './Components/common/ErrorBoundary';
import Map from './Components/googlemaps/HomePage';

// Create a ProtectedRoute component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, user, isLoading } = useSelector((state: RootState) => state.auth);
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthPersist>
          <Routes>
            <Route path="/map" element={<Map />} />
            <Route path="/" element={<Navigate to="/home_driver" />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route 
              path="/home_customer" 
              element={
                <ProtectedRoute>
                  <HomeCustomer />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/home_driver" 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AuthPersist>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
