import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ChatPageForProduct } from './ChatPageForProduct'

export const SingleImg = ({ setShowImagePage, singleImageData }) => {
	const [showFullCaption, setShowFullCaption] = useState(false);
	const [showChat, setShowChat] = useState(false);

	let captionTextLength = 70;

	let imageData = singleImageData.images.map(s => s.url)

	return (
		<div className="imageOpenerWrapper">
			<>
				<div className="chat-header-wrapper imageOpnerConatiner">
					<div>
						<img
							style={{ cursor: "pointer" }}
							src={"https://agent00xx.github.io/lastbotv2/assets/Images/back__Icon.png"}
							className="back-arrow"
							alt="back-arrow"
							onClick={() => {
								setShowImagePage("");
							}}
						/>
						<span className="headertext">{singleImageData.name}</span>
					</div>
					<div>
						<span className="svg-icon mr-2 ">
							<img
								src={"https://agent00xx.github.io/lastbotv2/assets/Images/upload.png"}
								alt="user-avatar"
								style={{ marginLeft: 8 }}
							/>
						</span>
						<span
							className="svg-icon"
							onClick={() => {
								setShowChat(!showChat);
							}}
						>
							<img
								src={"https://agent00xx.github.io/lastbotv2/assets/Images/message.png"}
								alt="user-avatar"
								style={{ marginLeft: 8 }}
							/>
						</span>
					</div>
				</div>
				<div className={"image-page-container"}>
					{/* <img src={"https://agent00xx.github.io/lastbotv2/assets/Images/chatimg.png"} /> */}

					{/* <img src={singleImageData.img} alt="chatImage" /> */}

					<Carousel
						showIndicators={true}
						showArrows={false}
						showStatus={false}
						infiniteLoop={false}
						showThumbs={false}
						useKeyboardArrows={false}
						autoPlay={false}
						stopOnHover={false}
						swipeable={false}
						dynamicHeight={false}
						emulateTouch={false}
						autoFocus={false}
					>
						{imageData.map((img) => (
							<div>
								<img src={img} alt="chatImage" />
							</div>
						))}
					</Carousel>

					{/* <span className="img-title">Effortless Elegance </span> */}
					<span className="img-title">{singleImageData.name}</span>

					{/* <p className="single-img-text">
						The minimalist design is brought to life with Aura and Simple door
						models in white and Tikkurila Ajpuu V484 tones.
						<span className="readMoreInImagePage">Read more</span>
					</p> */}

					<p className="single-img-text">
						{showFullCaption
							? singleImageData.description
							: singleImageData.description.slice(0, captionTextLength)}
						<span
							className="readMoreInImagePage"
							onClick={() => setShowFullCaption((prev) => !prev)}
						>
							{showFullCaption ? " Read Less" : " ...Read more"}
						</span>
					</p>

					{/* {(singleImageData.product_options && singleImageData.product_options.options.length > 0) && <div className="materials">
						<div className="material-title">Product Options</div>
						<div className="wrapperOfProductOptions">

							{singleImageData.product_options.options.map(s => {
								return <div className="roundForOptions" style={{ background: s }}></div>
							})}
						</div>
					</div>} */}
					{/* <div className="materialContainer">
							<img src={"assets/Images/box1.png"} alt="Image 1" />
							<img src={"assets/Images/box.png"} alt="Image 1" />
							<img src={"assets/Images/Rectangle20.png"} alt="Image 1" />
						</div> */}
					<span className="img-title" style={{ margin: "16px 0" }}>{singleImageData.price}</span>
					<button className="consultation">
						Purchase
					</button>
					{/* <div className="delivery-estimate">
						<span className="delivery-estimate-title">
							{singleImageData.deliveryEstimateTitle}
						</span>
						<br />
						<span className="delivery-estimate-content">
							{singleImageData.deliveryEstimateContent}
						</span>
					</div> */}
				</div>{" "}
			</>
			{showChat && <ChatPageForProduct setShowChat={setShowChat} />}
		</div>
	);
};
