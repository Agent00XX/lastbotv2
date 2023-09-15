import React, { useState } from "react";

export const InputMessage = ({ handleAddMessage, inputMessage, setInputMessage }) => {

  return (
    <div className="lcb_input-message">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if(inputMessage){
            handleAddMessage(inputMessage);
            setInputMessage("");
          }
        }}
        className="lcb_inputText"
        >
        <input
          className="lcb_inputTextField"
          type="text"
          placeholder="Ask anything..."
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          name="message"
          value={inputMessage}
        />
        <button type="submit" className="lcb_sendButton">
          <img src={"https://agent00xx.github.io/lastbotv2/assets/Images/send.png"} alt="user-avatar" />
        </button>
      </form>
    </div>
  );
};
