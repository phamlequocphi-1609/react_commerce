
import React, { useState } from "react";
import Api from "../../Api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  function handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInput((prev) => ({ ...prev, [nameInput]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let isCheck = true;

    if (input.email === "") {
      errorSubmit.email = "Vui lòng nhập email";
      isCheck = false;
    } else if (!validateEmail(input.email)) {
      errorSubmit.email = "Vui lòng nhập định dạng email hợp lệ";
      isCheck = false;
    }
    if (input.password === "") {
      errorSubmit.password = "Vui lòng nhập mật khẩu";
      isCheck = false;
    }

    if (!isCheck) {
      setFormErrors(errorSubmit);
    } else {
      setFormErrors({}); 
      const data = {
        email: input.email,
        password: input.password,
        level: 0,
      };
      Api.post("login", data)
        .then((response) => {
          if (response.data.errors) {
            setFormErrors(response.data.errors);
          } else {
            console.log(response);
            localStorage.setItem("LoggedIn", "true");
            localStorage.setItem("appState", JSON.stringify(response.data.Auth))
            localStorage.setItem("accessToken", JSON.stringify(response.data.token))
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
         
        });
    }
  }

  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  function renderError() {
    if (Object.keys(formErrors).length > 0) {
      return Object.keys(formErrors).map((value, key) => (
          <div className="ProductError" key={key}>
              <li style={{ listStyle: "none"}}>
                {formErrors[value]}
              </li>
          </div>
       
      ));
    }
  }

  return (
    <div className="login-form">
      <h2>Login to your account</h2>
     
          {renderError()}
     
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInput}
        />
        <span>
          <input type="checkbox" className="checkbox" />
          Keep me signed in
        </span>
        <button type="submit" className="btn btn-default">Login</button>
      </form>
    </div>
  );
}

export default Login;
