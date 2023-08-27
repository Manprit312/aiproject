import React, { useState } from "react";
import NotificationAlert from "react-notification-alert";

import { Button } from "reactstrap";
const InputField = ({ sendMessage }) => {
  const notificationAlertRef = React.useRef(null);

  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <div>
      <div className="react-notification-alert-container">
        <NotificationAlert color={"primary"} />
      </div>
      <div style={{ display: "flex" }}>
        <input type="text" value={message} onChange={handleMessageChange} />

        <Button
          style={{ width: "200px" }}
          block
          color="primary"
          onClick={() => {
            handleSendMessage();
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default InputField;
