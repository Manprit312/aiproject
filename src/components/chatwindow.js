import React, { useEffect, useState } from "react";
import { InfoOutlined, Mic } from "@mui/icons-material";

import { useSpeechRecognition } from "react-speech-kit";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  UncontrolledAlert,
  Button,
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Container,
} from "reactstrap";
import axios from "axios";

import NotificationAlert from "react-notification-alert";

const ChatWindow = ({ messages, sendMessage }) => {
  const [message, setmessage] = useState([]);
  const synth = window.speechSynthesis;
  const [textToRead, setTextToRead] = useState("");
  const [Answertosee, setAnswertosee] = useState([]);
  const [micColor, setMicColor] = useState("error");

  const [Question, setQuestion] = useState("");
  const [Answer, setAnswer] = useState("");
  const [Accu, setAccuracy] = useState("");
  const handleMessageChange = (e) => {
    const data = { messege: e.target.value, id: 2 };
    // setmessage([...message, data]);
    // setAnswer(e.target.value);
    setSpokenText(data);
  };

  // Check and initialize speech recognition if available

  if (synth && Question) {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  }

  const [spokentext, setSpokenText] = useState({});

  useEffect(() => {
    console.log(Question, "data");

    const webgazer = window.webgazer;
    webgazer
      .setGazeListener((data, clock) => {
        setAnswer(clock);
        console.log(data, "data");
        console.log(clock, "clock");
        if (data == null) {
          alert("Suspicious Activity Detected");
        }
        var x = data.x; // X coordinate on the screen
        var y = data.y; // Y coordinate on the screen

        // Check if gaze is outside a defined region (e.g., outside the screen bounds)
        var screenWidth = window.innerWidth;
        console.log(
          window.innerWidth,
          window.innerHeight,
          ">>>>>>>>>>>>>>>>>>>"
        );
        var screenHeight = window.innerHeight;
        var threshold = 1000; // Adjust this threshold as needed

        if (x > window.innerWidth || y > window.innerHeight) {
          // User is likely not looking at the screen
          // toast.error("User is not looking at the screen.");
        } else {
          // User is likely looking at the screen
          console.log("User is looking at the screen.");
        }
      })
      .begin();
  }, []);

  var text = [];
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      const data = { messege: result, id: 2 };
    

      // text.push(result).toString();
      setSpokenText(data);
    },
  });
  const getQuestion = async () => {
    const data = { body: "javascript", exp: "2" };
    const res = await axios.post("http://localhost:5000/chatapiquestion", data);

    setmessage([...message, res.data]);
    setQuestion(res.data.messege.slice(4));
    readText(res.data.messege.slice(4));
  };

  // Initialize the speech recognition object

  const micOff = () => {
    setmessage([...message, spokentext]);
    setMicColor("error");
    stop();
  };

  const micControl = () => {
    console.log("prinary");
    setMicColor("primary");
    listen();
  };
  // Initialize speech synthesis and read the provided text
  const readText = (t) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(t);
    synth.speak(utterance);
  };
  const Accuracy = async () => {
    const data = { question: Question, answer: spokentext.messege };
    const res = await axios.post("http://localhost:5000/checkAnswer", data);

    setAccuracy(res.data);
    toast.info(res.data);

    if (Accu.includes("No")) {
      setAnswertosee([...Answertosee, "No"]);
    }
  };

  const handleSendMessage = () => {
    setmessage([...message, spokentext]);
  };

  return (
    <div className="content">
      <ToastContainer />
      <Row>
        <Col md={"6"}>{/* <Webcam /> */}</Col>
        <Col md={"6"}>
          <Container>
            <Card style={{ height: "100vh" }}>
              <h1
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Live Interview Chat
              </h1>
              <p>
                <InfoOutlined />
                Single Click to start audio recording, double click to stop
              </p>
              <textarea
                style={{ height: "113px" }}
                defaultValue={spokentext.messege}
                onChange={(e) => handleMessageChange(e)}
              />
              <CardBody>
                {message.map((message, index) =>
                  message.id == 2 ? (
                    <UncontrolledAlert
                      className="alert-without-close"
                      color={Answertosee.includes("No") ? "danger" : "success"}
                      key={index}
                      closable={false}
                    >
                      {message.messege}
                    </UncontrolledAlert>
                  ) : (
                    <UncontrolledAlert
                      className="alert-without-close"
                      color="info"
                      key={index}
                    >
                      {message.messege}
                    </UncontrolledAlert>
                  )
                )}
                <div className="react-notification-alert-container">
                  <NotificationAlert color={"primary"} icon={null} />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <FormGroup>
                    <Mic
                      onClick={() => micControl()}
                      onDoubleClick={() => micOff()}
                      style={{
                        padding: " 6px",
                        width: "40px",
                        cursor: "pointer",
                        borderRadius: "25px",
                        background: " aliceblue",
                        height: "40px",
                      }}
                      color={micColor}
                    />
                  </FormGroup>

                  {Answer.length > 0 ? (
                    <Button
                      style={{ width: "200px" }}
                      block
                      color="success"
                      z
                      onClick={() => {
                        handleSendMessage();
                      }}
                    >
                      Submit Answer
                    </Button>
                  ) : null}
                  <Button
                    style={{ width: "200px" }}
                    block
                    color="success"
                    z
                    onClick={() => {
                      getQuestion();
                    }}
                  >
                    get Question
                  </Button>
                </div>
                <Button
                  style={{ width: "100%" }}
                  block
                  color="success"
                  onClick={() => Accuracy()}
                >
                         Accuracy          {" "}
                </Button>
                {message.length > 10 ? (
                  <Button style={{ width: "200px" }} block color="success">
                    finish
                  </Button>
                ) : null}
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default ChatWindow;
