import { Navigate } from "react-router-dom";

export default function SecureRoute({ children, isAuth }) {
  return isAuth ? children : <Navigate to="/login" />;
}
