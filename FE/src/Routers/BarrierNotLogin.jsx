import { Navigate } from "react-router-dom";

const BarrierNotLogin = (props) => {
  const token = localStorage.access_token;
  if (!token) {
    return <Navigate to="/" />;
  }

  return props.children;
};

export default BarrierNotLogin;
