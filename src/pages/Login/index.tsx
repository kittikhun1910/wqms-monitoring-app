import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./index.module.scss";

import LogoPNG from "/public/webIcon.png";
import VerifyPNG from "/src/images/verifying-identity.png";
import LogoLogin from "/src/images/logo-big.png";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("/api/dev/verify", {
            method: "POST",
            body: JSON.stringify({
              token: token,
            }),
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 200) {
            navigation("/Dashboard");
          }
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "/api/dev/login",
        // "https://rw8y2lq7ja.execute-api.ap-southeast-1.amazonaws.com/dev/login",
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }
      localStorage.setItem("token", data.token);
      setError(undefined);
      // Redirect to another page upon successful login
      window.location.href = "/dashboard";
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.contentBox}>
        <div className={style.contentLeftBox}>
          <img src={LogoLogin} alt="LogoLogin" className={style.logoLogin} />
          <img src={VerifyPNG} alt="VerifyPNG" className={style.verifying} />
        </div>
        <div className={style.contentRightBox}>
          <img src={LogoPNG} alt="LogoPNG" />
          Sign in to WQMS
          <form onSubmit={handleSubmit} className={style.From}>
            <label className={style.buttonInput}>
              Username
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className={style.buttonInput}>
              Password
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit" className={style.button}>
              Login
            </button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
