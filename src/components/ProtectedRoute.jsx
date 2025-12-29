import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  if (!user) {
    // Hvis ikke logget ind → send til login
    return <Navigate to="/login" replace />;
  }
  return children;
}
