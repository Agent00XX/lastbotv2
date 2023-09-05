import React, { useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { InputMessage } from "./InputMessage";
import { LocationChatMessages } from "./LocationChatMessages";

const messages = [
	{
		id: 1,
		message: "You can find our store here:",
		type: "user",
		img: "./assets/Images/Logo.png",
		locationImage: "./assets/Images/mapImage.png",
		isLink: false,
		locationImageAvailable: true,
	},
	{
		id: 2,
		message: "AINA Helsinki - Runeberginkatu 38 Helsinki",
		type: "user",
		img: "./assets/Images/Logo.png",
		locationImage: "./assets/Images/mapImage.png",
		isLink: true,
		locationImageAvailable: false,
	},
];

export const LocationChatContainer = () => {
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
					<LocationChatMessages
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
