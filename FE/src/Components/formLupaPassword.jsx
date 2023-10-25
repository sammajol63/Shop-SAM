import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { lupaPassword } from "../store/Slices/userSlice";

const LupaPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(lupaPassword());
  }, [dispatch]);
  const handleFunction = async (e) => {
    e.preventDefault();
    await dispatch(lupaPassword({ email }));
    navigate("/");
  };

  return (
    <div>
      <h1>Lupa Password</h1>
      <form onSubmit={handleFunction}>
        <input
          type="text"
          placeholder="Input your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /> <br />
        <button type="submit"> Kirim </button>
      </form>
    </div>
  );
};

export default LupaPassword;
