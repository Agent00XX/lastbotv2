import React, { useState } from "react";

export const InputMessage = ({ handleAddMessage, inputMessage, setInputMessage, isFullScreen, htmlElRef, isFetching }) => {

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
          ref={htmlElRef}
          disabled={isFetching}
          value={inputMessage}
        />
        <button type="submit" className={`lcb_sendButton ${isFullScreen ? "lcb_manageIcon" : ""}`} disabled={isFetching}>
          <img src={"https://agent00xx.github.io/lastbotv2/assets/Images/send.png"} alt="user-avatar" />
        </button>
      </form>
    </div>
  );
};
