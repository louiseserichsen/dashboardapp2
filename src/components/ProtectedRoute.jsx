import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  // Hvis ikke logget ind → send til login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logget ind → vis indhold
  return <>{children}</>;
}

export default ProtectedRoute;
