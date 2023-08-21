import React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "reactstrap";
import { motion } from "framer-motion"
import { Box, Typography } from "@material-ui/core";
let faceio;
const Home = () => {
  // useEffect(() => {
  //   faceio = new faceIO("fioa769a");
  // }, []);
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
      <Box
      sx={{
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', 
        color:'white',
       
      }}
    >
      
    <Box sx={{    display: 'flex',
     flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'}}>
      <Box className="imgAskToJoin" sx={{    width: '71%',
    padding: '50px',
    background: '#05273d',
    borderRadius: '24px'}}>
      <img src={require('assets/img/askToJoin.png')} height={'100%'} width={'100%'}/>
        </Box>

     <Box  sx={{textAlign: 'center',
    marginTop: '8px'}}>
     <Typography variant="h5" padding={10} className="headingAskTojoin">
      Are you ready  to show your s4kills?
    </Typography>
      </Box>
      {/* text 
          text-align: center;
    margin-top: 8p
      text
      height: auto;
    width: 71%;
    padding: 50px;
    background: #05273d;
    border-radius: 24px;
    allsec
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */}
    <Box   sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
     
        color:'white'
      }} >
    <Button >
      Lets Go
    </Button>
    <Button>
      Cancel
    </Button>
    </Box>
    
    </Box>
    </Box>
      </div>
    </>
  );
};

export default Home;
