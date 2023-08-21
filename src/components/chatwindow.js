import React, { useEffect, useState } from "react";
import { Mic } from "@mui/icons-material";
import { useSpeechRecognition } from "react-speech-kit";
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
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import Webcam from "react-webcam";
const ChatWindow = ({ messages, sendMessage }) => {
  const [message, setmessage] = useState([]);
  const [ready, setready] = useState(false);
  const handleMessageChange = (e) => {
    const data = { messege: e.target.value, id: 2 };
    setmessage([...message, data]);
  };
  useEffect(() => {
    getQuestion();
  }, []);
  const [textToRead, setTextToRead] = useState("");
  const [speechRecognitionAvailable, setSpeechRecognitionAvailable] =
    useState(false);

  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      const data = { messege: result, id: 2 };
      setmessage([...message, data]);
    },
  });
  const getQuestion = async () => {
    const data = { body: "javascript", exp: "2" };
    const res = await axios.post("http://localhost:5000/chatapiquestion", data);

    setmessage([...message, res.data]);
    console.log(message);
  };

  const checkSpeechRecognition = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      return true;
    }
    return false;
  };
  console.log(message);
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

  // Initialize speech synthesis and read the provided text
  const readText = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    synth.speak(utterance);
  };
  const handleSendMessage = () => {};

  return (
    <div className="content">
      <Row>
        {" "}
        <Col md={"6"}>
          <Webcam />
        </Col>
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
              <CardBody>
                {message.map((message, index) =>
                  message.id == 2 ? (
                    <UncontrolledAlert color="danger" key={index}>
                      {message.messege}
                    </UncontrolledAlert>
                  ) : (
                    <UncontrolledAlert color="info" key={index}>
                      {message.messege}
                    </UncontrolledAlert>
                  )
                )}
                <div className="react-notification-alert-container">
                  <NotificationAlert color={"primary"} />
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
                      onMouseDown={listen}
                      onMouseUp={stop}
                      style={{
                        padding: " 6px",
                        width: "40px",
                        borderRadius: "25px",
                        background: " aliceblue",
                        height: "40px",
                      }}
                    />

                    <textarea
                      style={{ display: "none" }}
                      value={message}
                      onChange={(e) => handleMessageChange(e)}
                    />
                  </FormGroup>

                  <Button
                    style={{ width: "200px" }}
                    block
                    color="success"
                    onClick={() => {
                      handleSendMessage();
                    }}
                  >
                    Submit Answer
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default ChatWindow;
