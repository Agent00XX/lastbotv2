import React, { Fragment, useEffect, useState } from "react";
import { SingleImg } from "./SingleImg";

const chatImgData = [
	{
		id: 1,
		img: "./assets/Images/chatimg.png",
		title: "Tyyni-kitchen",
		text: "Effortless Elegance",
		captionText:
			"The minimalist design is brought to life with Aura and Simple door models in white and Tikkurila Ajpuu V484 tones.",
		consultation: "Book consultation",
		deliveryEstimateTitle: "Delivery estimate",
		deliveryEstimateContent: "3 to 4 weeks from order",
	},
	{
		id: 2,
		// img: "./assets/Images/chatimg2.png",
		img: "./assets/Images/SecondImageProduct.png",
		title: "Hohtava-kitchen",
		text: "Bright and modern",
		captionText:
			"This bright and modern kitchen is the cornerstone of the Scandinavian kitchen style.",
		consultation: "Book consultation",
		deliveryEstimateTitle: "Delivery estimate",
		deliveryEstimateContent: "3 to 4 weeks from order",
	},
	{
		id: 3,
		// img: "./assets/Images/chatimg2.png",
		img: "./assets/Images/SecondImageProduct.png",
		title: "Hohtava-kitchen",
		text: "Bright and modern",
		captionText:
			"This bright and modern kitchen is the cornerstone of the Scandinavian kitchen style.",
		consultation: "Book consultation",
		deliveryEstimateTitle: "Delivery estimate",
		deliveryEstimateContent: "3 to 4 weeks from order",
	},
];

const initialAskByBot = [
	{
		id: 3,
		message: "Help me choose a kitchen",
		role: "assistant",
	},
	{
		id: 4,
		message: "Book a free consultation",
		role: "assistant",
	},
	{
		id: 5,
		message: "I want to speak to a human",
		role: "assistant",
	},
];

const getBotResponse = (userMessage) => {
	// Simple switch statement for bot responses
	console.log("🚀 ~ ():", userMessage, userMessage.toLowerCase());
	switch (userMessage.toLowerCase()) {
		case "help me choose a kitchen":
			return "To help you find the perfect kitchen style for your home, let's begin by discussing your personal taste.Among Scandinavian, Farmhouse, and Modern styles, do you find yourself gravitating towards a particular one?";
		case "scandinavian would be the best":
			return "Fantastic choice! Scandinavian kitchens are known for their simplicity, functionality, and minimalism. Would you prefer a color palette that leans more towards the traditional bright and airy Scandinavian style, or are you interested in incorporating some darker hues for a bit of contrast?";
		case "bye":
			return "Goodbye! Have a great day!";
		case "i want to speak to a human":
			return "Hi, it’s Mari here from AINA.\r\nCan I help you with a specific question?"
		default:
			return "I'm sorry, I didn't understand that.";
	}
};

export const ChatMessasgesStatic = ({
	isFullScreen,
	message,
	setMessage,
	setshowImgContainer,
	setIsHuman,
	inputMessage, 
	setInputMessage,
	scrollRef
}) => {
	const [showImagePage, setShowImagePage] = useState("");
	const [singleImageData, setsingleImageData] = useState({});

	const getClassName = (type) => {
		if (type === "assistant" || type === "human") {
			return "chat-bubble-sender";
		} else {
			return "chat-bubble-reciever";
		}
	};

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, []);

	return (
		<>
			{!showImagePage && (
				<div
					className={
						// isFullScreen ? "message-container-fullscreen" : "message-container"
						"message-container"
					}
					ref={scrollRef}
				>
					{message.length > 0 && message.map(({ id,humanJoined, label, contents, role, metadata, images  = []}, index) => (
						<Fragment key={id}>
							{role === "assistant" || role === 'human' ? (
								role === 'human' && humanJoined ? <div className="humanJoinedContainer">
									<p className="lineForNewJoined"></p>
									<p className="labelForNewJoined">{label}</p>
								</div> : <>
									<div className=" sender-conataoner">
										<img src={"./assets/Images/Logo.png"} alt="user-avatar" className="user-avatar" />
										<p className={`chat-bubble   ${getClassName(role)} `}>
											{contents}
										</p>
									</div>
									{/* {metadata && metadata.data &&  <div className="sender-conataoner">
										<img style={{visibility:'hidden'}} src={"./assets/Images/Logo.png"} alt="user-avatar" className="user-avatar" />
										<div className="wrapperOfBotInitials">

											{metadata.data.map(s => {
												return <div className="botInitialMessage" onClick={() => setInputMessage(s)}>{s}</div>
											})}
										</div>
									</div>} */}
									{/* Images sended by BOT */}
									{images.length > 0 && (
										<div
											class="image-container chat-bubble"
											style={{ marginBottom: 16 }}
										>
											{images.map((cur, idx) => (
												<>
													<div
														class="image-wrapper"
														onClick={() => {
															setShowImagePage(cur.title);
															setsingleImageData(cur);
														}}
													>
														<img src={cur.img} alt="Image 1" />
														<h6 className="img-title">{cur.title}</h6>
														<h6 className="img-text">{cur.text}</h6>
													</div>
												</>
											))}
										</div>
									)}
								</>
							) : (
								<div
									key={index}
									className={`chat-bubble ${getClassName(role)}`}
								// onClick={() => selectServiceHandler(message)}
								>
									<p>{contents}</p>
								</div>
							)}
						</Fragment>
					))}

					{/* Initial ask by BOT */}
					{message.length === 1 && (
						<div className="convoByBotWrapper">
							<p className="askQue">
								<img
									src={"./assets/Images/Askanythinginany.png"}
									alt="user-avatar"
									width={"274px"}
								/>
							</p>
							{initialAskByBot.map((s) => (
								<p
									className="botInitialMessage"
									key={s.id}
									onClick={() => {
										setMessage((prev) => [
											...prev,
											{ role: "user", contents: s.message },
										]);

										setTimeout(() => {
											const botResponse = getBotResponse(s.message.toLowerCase());
											if(s.message.toLowerCase() === "i want to speak to a human"){
												setIsHuman(true)
											}
											setMessage((prev) => [
												...prev,
												// {
												// 	type: s.message.toLowerCase() === "i want to speak to a human" ? "human" : "user",
												// 	humanJoined: true,
												// 	label: "Mari joined"
												// },
												{
													role: s.message.toLowerCase() === "i want to speak to a human" ? "human" : "assistant",
													contents: botResponse,
													img: s.message.toLowerCase() === "i want to speak to a human" ? "./assets/Images/HumanAvatar.png" : "./assets/Images/Logo.png",
													images:
														s.message.toLowerCase() ===
															"help me choose a kitchen"
															? chatImgData
															: [],
												},
											]);
										}, 500);
									}}
								>
									{s.message}
								</p>
							))}
						</div>
					)}

					{/* <div
						  
						className="to-scroll-div"
					/> */}
				</div>
			)}
			{showImagePage && (
				<SingleImg
					setShowImagePage={setShowImagePage}
					singleImageData={singleImageData}
				/>
			)}
		</>
	);
};