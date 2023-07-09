import { Route } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const token = Cookies.get("user_id");

  const location = useLocation();
  // if (!isSignedIn) {
  // return <Navigate to="/" replace />
  // }
  if (token === undefined) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default ProtectedRoute;
