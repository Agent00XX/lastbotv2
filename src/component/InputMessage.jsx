import React, { useState } from "react";

export const InputMessage = ({ handleAddMessage, inputMessage, setInputMessage }) => {

  return (
    <div className="input-message">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if(inputMessage){
            handleAddMessage(inputMessage);
            setInputMessage("");
          }
        }}
        className="inputText"
        >
        <input
          className="inputTextField"
          type="text"
          placeholder="Ask anything..."
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          name="message"
          value={inputMessage}
        />
        <button type="submit" className="sendButton">
          <img src={"./assets/Images/send.png"} alt="user-avatar" />
        </button>
      </form>
    </div>
  );
};
