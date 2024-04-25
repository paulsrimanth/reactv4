import { useEffect, useState } from "react";
import "./loginform.css";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const loginbody = {
    email,
    password,
  };
  useEffect(() => {
    generateCaptcha();
  }, []);
  const generateCaptcha = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaValue(captcha);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    async function userlogin() {
      const loginres = await fetch("http://localhost:8080/roles/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginbody),
      });
      const response = await loginres.json();
      console.log(response.token);

      if (loginres.ok) {
        localStorage.setItem("token", response.token);
        navigate("/library");
      }
    }
    userlogin();

    if (!email) {
      errors.email = "email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    if (captcha !== captchaValue) {
      errors.captcha = "Invalid captcha";
    }

    if (Object.keys(errors).length === 0) {
      // Perform login logic here
      console.log("Login successful!");
    } else {
      setErrors(errors);
    }
  };
  //   useEffect(() => {
  //     userlogin();
  //   }, [handleSubmit]);
  // async function userlogin() {
  //   const loginres = await fetch("http://localhost:8080/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "http://localhost:3000",
  //       "Access-Control-Allow-Methods": "POST",
  //       "Access-Control-Allow-Headers":
  //         "Authorization, Cache-Control,Content-Type",
  //       AllowCredentials: "true",
  //       ExposedHeaders: "Authorization",
  //       //"Content-Type, Authorization",
  //     },
  //     body: JSON.stringify(loginbody),
  //   });
  // }
  return (
    <div className="login-body">
      <div className="login-form">
        <div>
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div>
            <div>{captchaValue}</div>
            <br></br>
            <label htmlFor="captcha">Captcha:</label>
            <input
              type="text"
              id="captcha"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
            />
            <br></br>
            <button type="button" onClick={generateCaptcha}>
              Refresh Captcha
            </button>

            {errors.captcha && <p>{errors.captcha}</p>}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
