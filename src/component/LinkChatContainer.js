import React, { useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { LinkChatMessages } from "./LinkChatMessages";
import { InputMessage } from "./InputMessage";

const messages = [
	{
		id: 1,
		message: "Here are some resources that might help you:",
		type: "user",
		img: "./assets/Images/Logo.png",
		isLink: false,
		linkImageAvailable: false,
	},
	{
		id: 2,
		message: "Guide to choosing materials for your kitchen",
		type: "user",
		img: "./assets/Images/Logo.png",
		linkImage: "./assets/Images/linkImage.png",
		isLink: true,
		linkImageAvailable: true,
	},
	{
		id: 3,
		message: "Download the kitchen Buyers Guide",
		type: "user",
		img: "./assets/Images/Logo.png",
		isLink: true,
		linkImageAvailable: false,
	},
];

export const LinkChatContainer = () => {
	const [scrollRef, setScrollRef] = useState("");
	const [showChat, setShowChat] = useState(false);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [message, setMessage] = useState(messages);
	const [showImgContainer, setshowImgContainer] = useState(false);

	console.log(
		"🚀 ~ file: InputMessage.jsx:5 ~ InputMessage ~ message:",
		message
	);
	console.log("🚀 ~ isFullScreen", isFullScreen, "showChat", showChat);
	const handleAddMessage = (message) => {
		setMessage((prev) => [...prev, { type: "bot", message }]);
	};

	// const scrollRef = useRef()
	return (
		<div className={showChat ? "chat-container" : "chatContainer"}>
			<ChatHeader setShowChat={setShowChat} showChat={showChat} />
			{/* <SingleImg /> */}
			{showChat && (
				<>
					<LinkChatMessages
						scrollRef={scrollRef}
						isFullScreen={isFullScreen}
						message={message}
						setMessage={setMessage}
						setshowImgContainer={setshowImgContainer}
						// messages={messages}
					/>
					<InputMessage
						handleAddMessage={handleAddMessage}
						message={message}
						setMessage={setMessage}
					/>
				</>
			)}
		</div>
	);
};
