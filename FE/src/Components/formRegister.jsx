import { useState } from "react";
import { useDispatch } from "react-redux";
import { regsiter } from "../Features/userSlice";
import { useNavigate } from "react-router-dom";

const postUser = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postRegister = async (e) => {
    e.preventDefault();
    await dispatch(regsiter({ email, name, password, role }));
    navigate("/");
  };

  return (
    <form onSubmit={postRegister}>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />{" "}
      <br /> <br />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br /> <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br /> <br />
      <button type="input"> Register </button>
    </form>
  );
};

export default postUser;
