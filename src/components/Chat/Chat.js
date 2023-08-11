import React, { useState } from 'react';
import SpeechToText from 'components/speechtotext';
import { useSpeechRecognition } from 'react-speech-kit'
const TextToSpeechAndSpeechToText = () => {
  const [textToRead, setTextToRead] = useState('');
  const [speechRecognitionAvailable, setSpeechRecognitionAvailable] = useState(false);
  const [value, setValue] = useState('')
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result)
    }
  })
  // Check if speech recognition is available in the browser
  const checkSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      return true;
    }
    return false;
  };

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

  // Check and initialize speech recognition if available
  useState(() => {
    setSpeechRecognitionAvailable(checkSpeechRecognition());
    if (speechRecognitionAvailable) {
      initializeSpeechRecognition();
    }
  }, [speechRecognitionAvailable]);

  return (
    <div>
      <h2>Text to Speech and Speech to Text</h2>
      {speechRecognitionAvailable ? (
        <>
          <h3>Speech to Text</h3>
          <p>{textToRead}</p>
        </>
      ) : (
        <p>Speech recognition not available in this browser.</p>
      )}
   <textarea
         value={value}
         onChange={(event) => setValue(event.target.value)}
        />
        <button onMouseDown={listen} onMouseUp={stop}>
          🎤
        </button>
      <h3>Text to Speech</h3>
      <textarea
        value={textToRead}
        onChange={(e) => setTextToRead(e.target.value)}
      />
      <button onClick={readText}>Read Text</button>
   
    </div>
  
  );
};

export default TextToSpeechAndSpeechToText;
