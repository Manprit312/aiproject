import React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "reactstrap";
import { motion } from "framer-motion"
let faceio;
const Home = () => {
  useEffect(() => {
    faceio = new faceIO("fioa769a");
  }, []);
  const [permissions, setPermissions] = useState();
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef();

  // function handleLogin() {
  //   const faceio = new faceIO("fioa769a");
  //   faceio.authenticate();
  // }
  const handleRegister = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: "example@gmail.com",
        },
      });
      console.log("resposnse", response);
      const details = {
        age: "26",
        gender: "female",
        facialId: "b66bee5d248f4ddeb45e49e712d9b1d3fioa414d",
        timestamp: "2023-07-26T12:27:44",
      };
      console.log(` Unique Facial ID: ${response.facialId}
    Enrollment Date: ${response.timestamp}
     Gender: ${response.details.gender}
    Age Approximation: ${response.details.age}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    
      <div className="content">
        <div
          className="photo"
          style={{ display: "flex", justifyContent: "center",textAlign: "center"}}
        >
          <img alt="..." src={require("assets/img/ai-face.png")} />
        </div>
        <div className="typography-line">
          <h1 style={{ textAlign: "center" }}>faceId</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repellendus, delectus, obcaecati provident rem ipsa voluptatibus
            molestias magnam, harum architecto doloribus incidunt.
          </p>
        </div>
        <Button
          onClick={() => handleRegister()}
          className="btn-3"
          type="submit"
        >
          Get Started
        </Button>
        <motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", stiffness: 100 }}
/>
      </div>
    </>
  );
};

export default Home;
