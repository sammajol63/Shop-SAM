import { useState, useEffect } from "react";
import { resetPassword } from "../store/Slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

const ResetPassword = (props) => {
  const params = useParams();
  // console.log(params.token);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [errorPassword, seterrorPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorConfirmPassword, seterrorConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetPassword());
  }, [dispatch]);

  const changePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!value) {
      seterrorPassword("Password tidak boleh kosong!");
    } else {
      seterrorPassword("");
    }
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setconfirmPassword(value);
    if (!value) {
      seterrorConfirmPassword("Password tidak boleh kosong!");
    } else if (password !== value) {
      seterrorConfirmPassword("Password tidak cocok");
    } else {
      seterrorConfirmPassword("");
    }
  };

  const handleReset = async (e) => {
    const token = params.token;
    e.preventDefault();
    await dispatch(resetPassword({ token, password }));
    navigate("/");
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={changePassword}
          // onChange={(e) => setPassword()}
        />
        {errorPassword && <p className="text-danger">{errorPassword}</p>}
        <br />
        <br />
        <input
          type="password"
          placeholder="Confrim Password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          // onChange={(e) => setconfirmPassword()}
        />
        {errorConfirmPassword && (
          <p className="text-danger">{errorConfirmPassword}</p>
        )}
        <br />
        <button type="submit">set Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
