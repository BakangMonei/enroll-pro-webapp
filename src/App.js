import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./layouts/LoginPage";
import "./App.css";

// Import the auth object from firebase.js
import { auth } from "./database/firebase";
import ScheduleForm from "./components/forms/ScheduleForm";

// Function to check if user is authenticated
const isAuthenticated = () => {
  return auth.currentUser !== null;
};

// Private Route component to handle authentication
const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

function App() {
  return (
    // Provide the Redux store to your React app
    <Router>
      <Routes>
        {/* For testing only */}
        <Route path="/" element={<LoginPage />} />


        {/* Dashboards */}
        <Route
          path="/ScheduleForm"
          element={<PrivateRoute element={<ScheduleForm />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
