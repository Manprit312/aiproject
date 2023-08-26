import React, { useEffect, useState } from "react";
import { Margin, Mic } from "@mui/icons-material";
import axios from "axios";
import { useSpeechRecognition } from "react-speech-kit";
import "../assets/css/black-dashboard-react.css";
import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Input,
  Container,
} from "reactstrap";

import NotificationAlert from "react-notification-alert";
import Webcam from "react-webcam";
const ChatWindow = ({ messages, sendMessage }) => {
  const [message, setmessage] = useState([]);
  const [micColor, setMicColor] = useState("error");
  const [ready, setready] = useState(false);
  const [Question, setQuestion] = useState("");
  const [Answer, setAnswer] = useState("");
  const [Accu, setAccuracy] = useState("");
  const handleMessageChange = (e) => {
    const data = { messege: e.target.value, id: 2 };
    // setmessage([...message, data]);
    // setAnswer(e.target.value);
    setSpokenText(data);
  };
  const [spokentext, setSpokenText] = useState({});

  useEffect(() => {
    getQuestion();
  }, []);
  const [textToRead, setTextToRead] = useState("");
  const [speechRecognitionAvailable, setSpeechRecognitionAvailable] =
    useState(false);
  var text = [];
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      const data = { messege: result, id: 2 };
      // setmessage([...message, data]);

      // text.push(result).toString();
      setSpokenText(data);
    },
  });
  const getQuestion = async () => {
    const data = { body: "javascript", exp: "2" };
    const res = await axios.post("http://localhost:5000/chatapiquestion", data);

    setmessage([...message, res.data]);

    setQuestion(res.data.messege.slice(4));
  };

  const checkSpeechRecognition = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      return true;
    }
    return false;
  };
  console.log(message);
  console.log(listen, "llllllllllllll");
  // Initialize the speech recognition object
  const initializeSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setTextToRead(transcript);
    };

    recognition.onend = () => {
      // Restart the recognition process after it ends
      recognition.start();
    };

    recognition.start();
  };
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
  const readText = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    synth.speak(utterance);
  };
  const Accuracy = async () => {
    const data = { question: Question, answer: spokentext.messege };
    const res = axios.post("http://localhost:5000/checkAnswer", data);
    setAccuracy(res);
  };

  const handleSendMessage = () => {
    setmessage([...message, spokentext]);
  };

  return (
    <div className="content">
      <div className="heading-int">
        <h1>Live Interview</h1>
      </div>
      <Row>
        <Col md={"6"}>
          <Webcam />
        </Col>
        <Col md={"6"}>
          <Container>
            <Card>
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  fontWeight: "600",
                  margin: "0px 0 30px 0",
                }}
              >
                Live Interview Chat
              </h2>
              <textarea
                defaultValue={spokentext.messege}
                onChange={(e) => handleMessageChange(e)}
              />
              <CardBody>
                <div className="chatboat">
                  {message.map((message, index) =>
                    message.id == 2 ? (
                      <UncontrolledAlert
                        color={
                          Accu ==
                          "The answer to this question does not match the question so the accuracy percentage would be 0%."
                            ? "danger"
                            : "success"
                        }
                        key={index}
                      >
                        {message.messege}
                      </UncontrolledAlert>
                    ) : (
                      <UncontrolledAlert color="info" key={index}>
                        {message.messege}
                      </UncontrolledAlert>
                    )
                  )}
                </div>
                <div className="react-notification-alert-container">
                  <NotificationAlert color={"primary"} />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    marginTop: "20px",
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

                  <Button
                    className="btn-2"
                    style={{ width: "208px" }}
                    block
                    onClick={() => {
                      handleSendMessage();
                    }}
                  >
                    Submit Answer
                  </Button>
                </div>
              </CardBody>
            </Card>
            <Button
              className="btn-2"
              style={{ width: "100%" }}
              block
              onClick={() => Accuracy()}
            >
              checkSpeechRecognition{" "}
            </Button>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default ChatWindow;
