import React from 'react';

export const ChatFullScreen = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // const text = value.trim();
        // if (text.length > 0) sendMessage(creds, chatId, { text });
        // setValue("");
    };
    const handleChange = (event) => {
        // setValue(event.target.value);
        // isTyping(props, chatId);
    };
    const handleUpload = (event) => {
        // sendMessage(creds, chatId, { files: event.target.files, text: "" });
    };
    return (
        <>
            <div className='chat-feed'>
                <div className='chat-title-container'>
                    {/* <div className='chat-title'>{chat.title}</div> */}
                    <div className='chat-subtitle'>
                        dfgdfgdfg                      {/* {chat.people.map((person) => `${person.person.username}`)} */}
                    </div>
                </div>
                {/* {renderMessages()} */}
                <div style={{ height: '100px' }} />
                <div className='message-form-container'>
                    {/* <MessageForm {...props} chatId={activeChat} /> */}
                    <form className="message-form" onSubmit={handleSubmit}>
                        <input
                            className="message-input"
                            placeholder="Send a message ..."
                            // value={value}
                            onChange={handleChange}
                        />
                        <label htmlFor="upload-button">
                            <span className="image-button">
                                {/* <PictureOutlined className="picture-icon" /> */}
                            </span>
                        </label>
                        <input
                            type="file"
                            multiple={false}
                            id="upload-button"
                            style={{ display: "none" }}
                            onChange={handleUpload}
                        />
                        <button type="submit" className="send-button">
                            {/* <SendOutlined className="send-icon" /> */}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
