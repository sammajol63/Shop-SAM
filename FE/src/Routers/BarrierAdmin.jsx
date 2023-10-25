import { Navigate } from "react-router-dom";

const BarrierAdmin = (props) => {
  const token = localStorage.access_token;
  const roleCustomer = localStorage.role !== "admin";
  if (
    (roleCustomer && <Navigate to="/AdminFetchData" />) ||
    (roleCustomer && <Navigate to="/FetchUser" />) ||
    (roleCustomer && <Navigate to="/AdminFetchData" />) ||
    (roleCustomer && <Navigate to="/fetchProduct" />)
  ) {
    return <Navigate to="/katalog" />;
  }

  return props.children;
};

export default BarrierAdmin;
