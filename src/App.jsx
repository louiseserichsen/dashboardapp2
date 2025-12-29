import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";

import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import TimeTracking from "./components/TimeTracking";
import Finance from "./components/Finance";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import BottomNav from "./components/BottomNav";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center", color: "#C8A800" }}>
        Indlæser...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Beskyttede sider */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
              <BottomNav />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute user={user}>
              <Tasks />
              <BottomNav />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timetracking"
          element={
            <ProtectedRoute user={user}>
              <TimeTracking />
              <BottomNav />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance"
          element={
            <ProtectedRoute user={user}>
              <Finance />
              <BottomNav />
            </ProtectedRoute>
          }
        />

        {/* Alt andet → login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
