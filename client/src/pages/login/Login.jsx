import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const Login = () => {
  //initialize inputs empty
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  //get all inputs values from client side
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //get login  function from authContext Provider
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  // login function from authContext and send inputs like arguments
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setErr(err.response?.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello Word.</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae,
            placeat illo. Nisi reprehenderit numquam distinctio adipisci tempora
            alias porro sequi?
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="">
            <input
              type="text"
              placeholder="Username"
              name="userName"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />

            {err && (
              <div
                style={{
                  color: "#842029",
                  backgroundColor: "#f5c2c7",
                  padding: "10px",
                  borderRadius: "5px",
                  margin: "0",
                }}
              >
                {err}
              </div>
            )}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
