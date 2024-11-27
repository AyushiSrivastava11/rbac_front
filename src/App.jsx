import "./App.css";

import { AuthGuard } from "./guards/AuthGuard";
import { GuestGuard } from "./guards/GuestGuard";
import Categories from "./Pages/dashboard/Categories";
import Dash from "./Pages/dashboard/Dash";
import Members from "./Pages/dashboard/Members";
import Dashboard from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        >
          <Route path="/" element={<Dash />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/members" element={<Members />} />
        </Route>
        <Route
          path="/login"
          element={
            <GuestGuard>
              <Signup />
            </GuestGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
