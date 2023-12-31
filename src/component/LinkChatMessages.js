import React, { useState } from "react";
import { SingleImg } from "./SingleImg";
import "./LinkChatMessages.css";

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
];

export const LinkChatMessages = ({
	isFullScreen,
	message,
	setMessage,
	setshowImgContainer,
}) => {
	const [showImagePage, setShowImagePage] = useState("");
	const [singleImageData, setsingleImageData] = useState({});

	const initialAskByBot = [
		{
			id: 3,
			message: "Help me choose a kitchen",
			type: "bot",
		},
		{
			id: 4,
			message: "Book a free consultation",
			type: "bot",
		},
		{
			id: 5,
			message: "What are the delivery times?",
			type: "bot",
		},
	];

	const getClassName = (type, isLink) => {
		if (type === "user" && isLink) {
			return "lcb_chat-bubble-sender lcb_linkMessage";
		} else if (type === "user" && !isLink) {
			return "lcb_chat-bubble-sender";
		} else {
			return "lcb_chat-bubble-reciever";
		}
	};

	const getBotResponse = (userMessage) => {
		// Simple switch statement for bot responses
		switch (userMessage.toLowerCase()) {
			case "help me choose a kitchen":
				return "To help you find the perfect kitchen style for your home, let's begin by discussing your personal taste.Among Scandinavian, Farmhouse, and Modern styles, do you find yourself gravitating towards a particular one?";
			case "scandinavian would be the best":
				return "Fantastic choice! Scandinavian kitchens are known for their simplicity, functionality, and minimalism. Would you prefer a color palette that leans more towards the traditional bright and airy Scandinavian style, or are you interested in incorporating some darker hues for a bit of contrast?";
			case "bye":
				return "Goodbye! Have a great day!";
			default:
				return "I'm sorry, I didn't understand that.";
		}
	};

	return (
		<>
			{!showImagePage && (
				<div
					className={
						isFullScreen ? "lcb_message-container-fullscreen" : "lcb_message-container"
					}
				>
					{message.map(
						(
							{
								message,
								type,
								img,
								id,
								linkImage,
								linkImageAvailable,
								isLink,
								images = [],
							},
							index
						) => (
							<>
								{type === "user" ? (
									<>
										<div className="lcb_ sender-conataoner">
											<div>
												<img
													src={img}
													alt="user-avatar"
													className="lcb_user-avatar"
												/>
											</div>

											<div>
												<p
													className={`lcb_chat-bubble   ${getClassName(
														type,
														isLink
													)} `}
												>
													{message}
												</p>

												{linkImageAvailable && (
													<img
														src={linkImage}
														alt="linkImage"
														className="lcb_linkImage"
													/>
												)}
											</div>
										</div>

										{images.length > 0 && (
											<div
												className="image-container chat-bubble"
												style={{ marginBottom: 16 }}
											>
												{images.map((cur, idx) => (
													<>
														<div
															className="image-wrapper"
															onClick={() => {
																setShowImagePage(cur.title);
																setsingleImageData(cur);
															}}
														>
															<img src={cur.img} alt="Image 1" />
															<h6 className="lcb_img-title">{cur.title}</h6>
															<h6 className="lcb_img-text">{cur.text}</h6>
														</div>
													</>
												))}
											</div>
										)}
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
						)
					)}

					{message.length === 1 && (
						<div className="lcb_convoByBotWrapper">
							<p className="lcb_askQue">
								<img
									src={"https://agent00xx.github.io/lastbotv2/assets/Images/Askanythinginany.png"}
									alt="user-avatar"
									width={"274px"}
								/>
							</p>
							{initialAskByBot.map((s) => (
								<p
									className="lcb_botInitialMessage"
									key={s.id}
									onClick={() => {
										setMessage((prev) => [
											...prev,
											{ type: "bot", message: s.message },
										]);

										setTimeout(() => {
											const botResponse = getBotResponse(s.message);
											setMessage((prev) => [
												...prev,
												{
													type: "user",
													message: botResponse,
													img: "./assets/Images/Logo.png",
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

					<div
						//   ref={ref}
						className="lcb_to-scroll-div"
					/>
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
