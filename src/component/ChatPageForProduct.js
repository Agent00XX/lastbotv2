import React, { useState } from 'react'

export const ChatPageForProduct = ({ setShowChat }) => {
  const [messages, setMessages] = useState([{
    id: 1,
    message: "Let me know if you have any specific questions about the Tyyni-kitchen!",
    type: "user",
    img: "./assets/Images/Logo.png",
  }])
  const [message, setMessage] = useState("");

  const getClassName = (type) => {
    if (type === "user") {
      return "lcb_chat-bubble-sender";
    } else {

      return "lcb_chat-bubble-reciever";
    }
  };

  return (
    <div className='lcb_imageOpenerWrapper'>
      <div className="lcb_chat-header-wrapper lcb_imageOpnerConatiner">
        <div>
          <span className='lcb_headertext'>Tyyni-kitchen chat</span>
        </div>
        <div >
          <span className="lcb_svg-icon" onClick={() => {
            setShowChat(false)
          }}>
            <img src={"https://agent00xx.github.io/lastbotv2/assets/Images/x-close.png"} alt="user-avatar" style={{ marginLeft: 8 }} />
          </span>
        </div>
      </div>

      <div
        className={
          "lcb_message-container"
        }
      >

        {messages.map(({ message, type, img, id, images = [] }, index) => (
          <>
            {type === "user" ? (
              <>
                <div className=" lcb_sender-conataoner">
                  <img src={img} alt="user-avatar" className="lcb_user-avatar" />
                  <p className={`lcb_chat-bubble   ${getClassName(type)} `}>
                    {message}
                  </p>
                </div>
                {/* {images.length > 0 && <div class="image-container chat-bubble" style={{ marginBottom: 16 }}>
                  {images.map((cur, idx) => (
                    <>
                    <div class="image-wrapper" onClick={() => setShowImagePage(cur.title)}>
                    <img src={cur.img} alt="Image 1" />
                    <h6 className="img-title">{cur.title}</h6>
                    <h6 className="img-text">{cur.text}</h6>
                    </div>
                    </>
                    ))}
                  </div>} */}
              </>
            ) : (
              <div
                key={index}
                className={`lcb_chat-bubble ${getClassName(type)}`}
              // onClick={() => selectServiceHandler(message)}
              >
                <p>{message}</p>
              </div>
            )}
          </>
        ))}
      </div>

      <div className="lcb_input-message">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if(message){
            setMessages(prev => [...prev, { type: 'bot', message }]);
            setMessage("");
          }
        }}
        className="lcb_inputText"
        >
        <input
          className="lcb_inputTextField"
          type="text"
          placeholder="Ask anything..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          name="message"
          value={message}
        />
        <button type="submit" className="lcb_sendButton">
          <img src={"https://agent00xx.github.io/lastbotv2/assets/Images/send.png"} alt="user-avatar" />
        </button>
      </form>
    </div>
    </div>
  )
}
