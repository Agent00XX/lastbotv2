import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { SingleImg } from "./SingleImg";
import ImageViewer from "react-simple-image-viewer";
import { Interweave } from "interweave";

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
		message: "I want to speak to a human",
		type: "bot",
	},
];

const getBotResponse = (userMessage) => {
	// Simple switch statement for bot responses
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

export const ChatMessasges = ({
	isFullScreen,
	message,
	setMessage,
	setshowImgContainer,
	setIsHuman,
	inputMessage,
	setInputMessage,
	widgetInfo,
	scrollRef,
	setFocus,
	isFetching,
	threadInfos,
	showInitialMessages
}) => {
	const [showImagePage, setShowImagePage] = useState("");
	const [singleImageData, setsingleImageData] = useState({});
	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const ref = useRef(null);

	const openImageViewer = useCallback((index) => {
		setCurrentImage(index);
		setIsViewerOpen(true);
	}, []);

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
	};

	const getClassName = (type) => {
		if (type === "assistant" || type === "human") {
			return "lcb_chat-bubble-sender";
		} else {
			return "lcb_chat-bubble-reciever";
		}
	};

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, []);

	useEffect(() => {
		if (message.length) {
			ref.current?.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [message.length]);

	const renderMessages = (messages = []) => {
		return messages.map(({ humanJoined, label, contents, role, metadata }, index) => {
			return (
				<Fragment key={index}>
					{role === "assistant" || role === 'human' ? (
						role === 'human' && humanJoined ? <div className="lcb_humanJoinedContainer">
							<p className="lcb_lineForNewJoined"></p>
							<p className="lcb_labelForNewJoined">{label}</p>
						</div> : <Fragment>
							{metadata?.data?.length > 0 && metadata?.type === 'images' && <div className="lcb_sender-conataoner" style={{ padding: 10 }}>
								<div className="lcb_user-avatar">{widgetInfo?.initials}</div>
								{metadata.type === 'images' && <div className="lcb_wrapperOfBotInitials">
									{metadata.data.length > 0 && (
										<div
											className="lcb_image-container lcb_chat-bubble"
											style={{ marginBottom: 16 }}
										>
											{metadata.data.map((curr, idx) => (
												<div
													key={idx}
													className="lcb_image-wrapper"
													onClick={() => {
														openImageViewer(idx)
													}}
												>
													<img src={curr.image_url} alt={curr.image_alt} />
													<h6 className="lcb_img-title">{curr.image_title}</h6>
												</div>

											))}
											{isViewerOpen && (
												<ImageViewer
													src={metadata.data.map(s => s.image_url)}
													currentIndex={currentImage}
													onClose={closeImageViewer}
													disableScroll={false}
													backgroundStyle={{
														backgroundColor: "rgba(0,0,0,0.9)"
													}}
													closeOnClickOutside={true}
												/>
											)}
										</div>
									)}
								</div>}
							</div>}
							<div className="lcb_sender-conataoner">
								{/* <img src={"https://agent00xx.github.io/lastbotv2/assets/Images/Logo.png"} alt="user-avatar" className="lcb_user-avatar" /> */}
								<div style={{ visibility: metadata.type === 'images' ? "hidden" : "visible" }} className="lcb_user-avatar">{widgetInfo?.initials}</div>
								<p className={`lcb_chat-bubble   ${getClassName(role)} `}>
									<Interweave content={contents} />
								</p>
							</div>
							{metadata?.data?.length > 0 && metadata?.type !== 'images' && <div 
								className="lcb_sender-conataoner" 
								style={{ padding: 10, display: metadata.type === 'options' ? "none" : "" }}
							>
								{/* {index === (message?.length - 1) && metadata?.data?.length > 0 && <div className="lcb_sender-conataoner"> */}
								<img style={{ visibility: 'hidden' }} src={"https://agent00xx.github.io/lastbotv2/assets/Images/Logo.png"} alt="user-avatar" className="lcb_user-avatar" />
								{/* {(metadata.type === 'options') && <div className="lcb_wrapperOfBotInitials">
									{metadata.data.filter(s => typeof s !== "string").map((s, idx) => {
										return <div
											key={idx}
											className="image-wrapper"
											onClick={() => openImageViewer(idx)}
										>
											<img className="lcb_imageWithText" src={s.image_url} alt={s.image_alt} />
											<h6 className="lcb_img-title2">{s.image_title}</h6>
										</div>
									})}
									{isViewerOpen && (
										<ImageViewer
											src={metadata.data.filter(s => typeof s !== "string").map(s => s.image_url)}
											currentIndex={currentImage}
											onClose={closeImageViewer}
											disableScroll={false}
											backgroundStyle={{
												backgroundColor: "rgba(0,0,0,0.9)"
											}}
											closeOnClickOutside={true}
										/>
									)}
									{metadata.data.filter(s => typeof s == "string").map((s, idx) => {
										return <div key={idx} className="lcb_botInitialMessage" onClick={() => {
											setInputMessage(s)
											setFocus()
										}}>{s}</div>
									})}
								</div>} */}


								{metadata.type === 'products' && <div className="lcb_wrapperOfBotInitials">
									{metadata.data.length > 0 && (
										<div
											className="lcb_image-container lcb_chat-bubble"
											style={{ marginBottom: 16 }}
										>
											{metadata.data.map((curr, idx) => (
												<div
													key={idx}
													className="lcb_image-wrapper"
													onClick={() => {
														setShowImagePage(curr.name);
														setsingleImageData(curr);
													}}
												>
													<img src={curr.images[0].url} alt={curr.images[0].alt} />
													<h6 className="lcb_img-title">{curr.name}</h6>
													<h6 className="lcb_img-text">{curr.short_description}</h6>
												</div>

											))}
										</div>
									)}
								</div>}

								{metadata.type === 'links' && <div className="lcb_wrapperOfBotInitials">
									{metadata.data.map(s => {
										return <a key={s.title} className="lcb_botLinks" target={s.target} href={s.url} >{s.title}</a>
									})}
								</div>}
							</div>}
						</Fragment>
					) : (
						<div
							key={index}
							className={`lcb_chat-bubble ${getClassName(role)}`}
						>
							<p>{contents}</p>
						</div>
					)}
				</Fragment>
			)
		})
	}

	return (
		<>
			{!showImagePage && (
				<div
					className={
						// isFullScreen ? "message-container-fullscreen" : "message-container"
						"lcb_message-container"
					}
					ref={scrollRef}
				>
					<div>
						{threadInfos.length > 0 && threadInfos.map((s, index) => {

							return <Fragment key={index}>
								<div className="lcb_humanJoinedContainer">
									<p className="lcb_lineForNewJoined"></p>
									<p className="lcb_labelForNewJoined">{s.title}</p>
								</div>

								{index !== (threadInfos.length - 1) && renderMessages(s.messages)}
							</Fragment>
						})}
						{/* Render current messages */}
						{renderMessages(message)}
					</div>

					<div>

						{/* Initial ask by BOT */}
						{showInitialMessages.length > 0 && (
							<div className="lcb_convoByBotWrapper" style={{marginTop: 30}}>
								<p className="lcb_askQue">
									<img
										src={"https://agent00xx.github.io/lastbotv2/assets/Images/Askanythinginany.png"}
										alt="user-avatar"
										width={"274px"}
									/>
								</p>
								{showInitialMessages.map((s) => (
									<p
										className="lcb_botInitialMessage"
										key={s}
										onClick={() => {
											setInputMessage(prev => {
												return prev ? `${prev}, ${s}` : s
											})
											setFocus()
										}}
									>
										{s}
									</p>
								))}
							</div>
						)}

						{isFetching && <div className="lcb_sender-conataoner" style={{ alignItems: 'center' }}>
							<div className="lcb_user-avatar">{widgetInfo?.initials}</div>
							<div class="lcb_spinner">
								<div class="lcb_bounce1"></div>
								<div class="lcb_bounce2"></div>
								<div class="lcb_bounce3"></div>
							</div></div>}

						<div className="lcb_to-scroll-div" ref={ref} />
					</div>

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
