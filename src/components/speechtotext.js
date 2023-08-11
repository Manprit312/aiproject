import React, { useState, useEffect } from "react";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  var recognition;

  // Check if speech recognition is available in the browser
  const checkSpeechRecognition = () => {
    return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
  };

  // Initialize speech recognition
  const initializeSpeechRecognition = () => {
 console.log(window)
    recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
console.log("transcript",transcript)
      setRecognizedText(transcript);
    };

    recognition.onend = () => {
      // Restart the recognition process after it ends
      if (isListening) {
        recognition.start();
      }
    };
  };

  // Start or stop the speech recognition based on isListening state
  useEffect(() => {
    
    if (isListening) {
      recognition?.start();
    } else {
      recognition?.stop();
    }

    return () => {
      // Clean up and stop recognition when the component unmounts
      recognition?.stop();
    };
  }, [isListening]);

  // Toggle listening state
  const toggleListening = () => {
    setIsListening(!isListening);
  };

  useEffect(() => {
    // Check and initialize speech recognition if available
    if (checkSpeechRecognition()) {
      initializeSpeechRecognition();
    } else {
      setRecognizedText("Speech recognition is not available in this browser.");
    }
  }, []);

  return (
    <div>
      <h1>Speech to Text</h1>
      <button onClick={toggleListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>{recognizedText}</p>
    </div>
  );
};

export default SpeechToText;
