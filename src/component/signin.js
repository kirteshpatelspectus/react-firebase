import "./signin.css";

import { Box } from "@mui/material";
import { useState } from "react";
import { Card, Form, Button, Input } from "antd";
import Todo from "./Todo";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const SignIn = () => {
    const [flag, setFlag] = useState(false);
    const [userFields, setUserFields] = useState({
      email: "",
      password: "",
    });
    const [uid, setUid] = useState();
    const auth = getAuth();

  const handleClick = () => {
    //  setFlag(true)
    signInWithEmailAndPassword(auth, userFields.email,userFields.password)
    .then((userCredential) => {
       setFlag(true);
       console.log(userCredential.user.uid);
       setUid(userCredential.user.uid);
 })
    .catch((error) => {
      console.log(error.message);
    });
  };
  if(flag === false){
    return (
      <Box
        style={{
          width: "100%",
          backgroundImage: `url(${"http://akashpatel.co.in/HRMS-Spectus-latest/static/media/bgImage.c0cbd0a73b7fce324fb5.png"})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          height: "100vh",
          alignItems: "center",
        }}
        id="main"
      >
        <Box id="image_container">
          <Box style={{ width: "80%" }}>
            <img
              alt="Spectus Image"
              style={{ width: "-webkit-fill-available" }}
              src="http://akashpatel.co.in/HRMS-Spectus-latest/static/media/Spectus_new_logo_high_resolution.d03b9152490885d2f9a4.png"
            />
          </Box>
        </Box>

        <Box id="login_page_container">
          <Card id="login_card">
            <Form layout="vertical" name="basic" onFinish={(e) => console.log(e)}>
              <h2 id="heading_login">Sign In</h2>
              <Box mt={3} mb={3}>
                <Form.Item
                  className="textfield_heading"
                  label="Email Address"
                  name="email_address"
                  rules={[{ required: true, message: "Please input your Email address!" }]}
                  style={{
                    fontFamily: "Milliard",
                  }}
                >
                  <Input
                    id="outlined-basic"
                    type="email"
                    label="Email Address"
                    placeholder=" Email address"
                    size="large"
                    onChange={(e) => setUserFields({ ...userFields, email: e.target.value })}
                    value={userFields.email}
                    style={{ borderRadius: "2px" }}
                  />
                </Form.Item>
              </Box>
              <Box mb={8} mt={3}>
                <Form.Item
                  className="textfield_heading"
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password
                    id="password"
                    type="password"
                    label="Password"
                    placeholder=" Password"
                    onChange={(e) => setUserFields({ ...userFields, password: e.target.value })}
                    value={userFields.password}
                    size="large"
                    style={{ borderRadius: "2px" }}
                  />
                </Form.Item>
              </Box>
              <Box mb={3}>
                <Button
                  onClick={handleClick}
                  size="large"
                  type="primary"
                  style={{
                    marginTop: "16px",
                    backgroundColor: "#244DA0",
                    color: "white",
                    fontWeight: "600",
                    width: "100%",
                  }}
                  block
                >
                  Sign In
                </Button>
              </Box>
            </Form>
          </Card>
        </Box>
      </Box>
    );
}
else {
    return <Todo uid={uid}/>
}
};

export default SignIn;
