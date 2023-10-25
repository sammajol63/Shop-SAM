import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../Components/formLogin.jsx";
import FetchProduct from "../Components/fetchProduct.jsx";
import BarrierNotLogin from "./BarrierNotLogin.jsx";
import BarrierLogin from "./BarrierLogin.jsx";
import Katalog from "../Components/katalog.jsx";
import Register from "../Components/Register.jsx";
import LupaPassword from "../Components/formLupaPassword.jsx";
import ResetPassword from "../Components/resetPassword.jsx";
//----------------------ADMIN-----------------------------------
import Admin from "../Routers/BarrierAdmin.jsx";
import AddProducts from "../Components/formAddProduct.jsx";
import AdminFetchProduct from "../Components/adminSide/adminFetchProduct.jsx";
import EditProduct from "../Components/adminSide/adminEditProduct.jsx";
import FetchUser from "../Components/adminSide/fetchUser.jsx";
import EditUser from "../Components/adminSide/adminEditUser.jsx";
const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/AdminFetchData"
          element={
            <BarrierNotLogin>
              <Admin>
                <AdminFetchProduct />
              </Admin>
            </BarrierNotLogin>
          }
        />

        <Route
          path="/FetchUser"
          element={
            <BarrierNotLogin>
              <Admin>
                <FetchUser />
              </Admin>
            </BarrierNotLogin>
          }
        />

        <Route
          path="/addProduct"
          element={
            <BarrierNotLogin>
              <Admin>
                <AddProducts />
              </Admin>
            </BarrierNotLogin>
          }
        />

        <Route
          path="/editProduct/:id"
          element={
            <BarrierNotLogin>
              <Admin>
                <EditProduct />
              </Admin>
            </BarrierNotLogin>
          }
        />

        <Route
          path="/editUser/:id"
          element={
            <BarrierNotLogin>
              <Admin>
                <EditUser />
              </Admin>
            </BarrierNotLogin>
          }
        />

        <Route
          path="/fetchProduct"
          element={
            <BarrierNotLogin>
              <Admin>
                <FetchProduct />
              </Admin>
            </BarrierNotLogin>
          }
        />

        {/*--------------CUSTOMER----------------- */}
        <Route
          path="/"
          element={
            <BarrierLogin>
              <Login />
            </BarrierLogin>
          }
        />
        <Route
          path="/register"
          element={
            <BarrierLogin>
              <Register />
            </BarrierLogin>
          }
        />
        <Route
          path="/katalog"
          element={
            <BarrierNotLogin>
              <Katalog />
            </BarrierNotLogin>
          }
        />

        <Route
          path="/forgetPassword"
          element={
            <BarrierLogin>
              <LupaPassword />
            </BarrierLogin>
          }
        />

        <Route
          path="/resetpassword/:token"
          element={
            <BarrierLogin>
              <ResetPassword />
            </BarrierLogin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default router;
