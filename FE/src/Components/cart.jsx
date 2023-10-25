import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const cart = ({ cart, handleOpen }) => {
  const navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div class="w-full  h-20 bg-slate-300 py-2 px-10 fixed top-0 left-0 justify-end items-center flex">
      <div
        className="w-12 h-12 mr-6 relative rounded-full bg-white flex items-center justify-center cursor-pointer"
        onClick={handleOpen}
      >
        <FiShoppingCart className="w-6 h-6" />
        {cart?.length ? (
          <div className="absoluste top-1 right-1 text-xs rounded-full bg-red-500 text-white px-1">
            {cart.length}
          </div>
        ) : (
          <></>
        )}
      </div>
      <button
        onClick={() => {
          logout();
        }}
      >
        <HiOutlineLogout className="w-6 h-6" />
      </button>
    </div>
  );
};

export default cart;
