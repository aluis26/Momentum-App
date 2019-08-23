import React, { useState } from "react";
import { Form, Button, Alert, Col } from "react-bootstrap";
import { signup } from "../api";
import "./../App.css";
import img from "./../assets/todo.svg";

export default function Signup(props) {
  let [userName, setUserName] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userPassword, setUserPassword] = useState("");
  let [userConfirmPassword, setUserConfirmPassword] = useState("");
  let [isInputFilled, setIsInputFilled] = useState(true);
  let [isValidEmail, setIsValidEmail] = useState(true);
  let [isPassValid, setisPassValid] = useState(true);
  let [isSamePass, setIsSamePass] = useState(true);
  const Swal = require("sweetalert2");
  function handleUserName(event) {
    setUserName(event.target.value);
  }

  function handleUserEmail(event) {
    setUserEmail(event.target.value);
  }
  function validateUserEmail(userEmail) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(userEmail).toLowerCase());
  }

  function handleUserPassword(event) {
    setUserPassword(event.target.value);
  }

  function handleUserConfirmPassword(event) {
    setUserConfirmPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let data = { userEmail, userName, userPassword };
    if (
      userPassword === userConfirmPassword &&
      userPassword.length >= 6 &&
      validateUserEmail(userEmail) &&
      userName
    ) {
      signup(data).then(() => {
        Swal.fire({
          // title: "Error!",
          text:
            "Your account has been created. Please log in to start using the websites",
          type: "success",
          confirmButtonText: "Cool"
        });
        props.history.push("/login");
      });
      //to do - multiple error msgs
    } else if (
      userEmail === "" ||
      userName === "" ||
      userPassword === "" ||
      userConfirmPassword === ""
    ) {
      setIsInputFilled(false);
    } else if (validateUserEmail()) {
      setIsValidEmail(false);
    } else if (userPassword.length < 6) {
      setisPassValid(false);
    } else if (userPassword !== userConfirmPassword) {
      setIsSamePass(false);
    }
  }

  return (
    <div>
      <div className="d-inline-block forms-container">
        <img className="imgSignUp" src={img} alt="" />
      </div>

      <Form className="d-inline-block signup-form float-right">
        <h1>Sign Up Here!</h1>
        <br />
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              value={userName}
              type="username"
              placeholder="Select a username"
              onChange={event => handleUserName(event)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={userEmail}
              type="email"
              placeholder="Enter email"
              onChange={event => handleUserEmail(event)}
            />
            {!isValidEmail ? <div>That's not a valid email</div> : null}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={userPassword}
              type="password"
              placeholder="Password"
              onChange={event => handleUserPassword(event)}
            />
            {!isPassValid ? (
              <Alert variant="danger">That's not a valid password</Alert>
            ) : null}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              value={userConfirmPassword}
              type="password"
              placeholder="Confirm password"
              onChange={event => handleUserConfirmPassword(event)}
            />
            {!isSamePass ? (
              <Alert variant="danger">Password should be the same</Alert>
            ) : null}
          </Form.Group>
        </Form.Row>
        {!isInputFilled ? (
          <Alert className="alert" variant="danger">
            All input are required
          </Alert>
        ) : null}
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Sign Up!
        </Button>
        <div>
          Do you have already an account? <br />
          <a href="/login">Log in here</a>
        </div>
      </Form>
    </div>
  );
}
