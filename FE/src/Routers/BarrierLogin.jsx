import { Navigate } from "react-router-dom";

const BarrierLogin = (props) => {
  const token = localStorage.access_token;
  if (token) {
    if ((<Navigate to="/" />)) {
      return <Navigate to="/fetchProduct" />;
    }
  }
  return props.children;
};

export default BarrierLogin;
