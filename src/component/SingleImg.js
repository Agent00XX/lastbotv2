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
		<div className="lcb_imageOpenerWrapper">
			<>
				<div className="lcb_chat-header-wrapper lcb_imageOpnerConatiner">
					<div>
						<img
							style={{ cursor: "pointer" }}
							src={"https://agent00xx.github.io/lastbotv2/assets/Images/back__Icon.png"}
							className="lcb_back-arrow"
							alt="back-arrow"
							onClick={() => {
								setShowImagePage("");
							}}
						/>
						<span className="lcb_headertext">{singleImageData.name}</span>
					</div>
					<div>
						<span className="lcb_svg-icon lcb_mr-2 ">
							<img
								src={"https://agent00xx.github.io/lastbotv2/assets/Images/upload.png"}
								alt="user-avatar"
								style={{ marginLeft: 8 }}
							/>
						</span>
						<span
							className="lcb_svg-icon"
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
				<div className={"lcb_image-page-container"}>
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

					{/* <span className="lcb_img-title">Effortless Elegance </span> */}
					<span className="lcb_img-title">{singleImageData.name}</span>

					{/* <p className="lcb_single-img-text">
						The minimalist design is brought to life with Aura and Simple door
						models in white and Tikkurila Ajpuu V484 tones.
						<span className="lcb_readMoreInImagePage">Read more</span>
					</p> */}

					<p className="lcb_single-img-text">
						{showFullCaption
							? singleImageData.description
							: singleImageData.description.slice(0, captionTextLength)}
						<span
							className="lcb_readMoreInImagePage"
							onClick={() => setShowFullCaption((prev) => !prev)}
						>
							{showFullCaption ? " Read Less" : " ...Read more"}
						</span>
					</p>

					{/* {(singleImageData.product_options && singleImageData.product_options.options.length > 0) && <div className="lcb_materials">
						<div className="lcb_material-title">Product Options</div>
						<div className="lcb_wrapperOfProductOptions">

							{singleImageData.product_options.options.map(s => {
								return <div className="lcb_roundForOptions" style={{ background: s }}></div>
							})}
						</div>
					</div>} */}
					{/* <div className="lcb_materialContainer">
							<img src={"assets/Images/box1.png"} alt="Image 1" />
							<img src={"assets/Images/box.png"} alt="Image 1" />
							<img src={"assets/Images/Rectangle20.png"} alt="Image 1" />
						</div> */}
					<span className="lcb_img-title" style={{ margin: "16px 0" }}>{singleImageData.price}</span>
					<button className="lcb_consultation">
						Purchase
					</button>
					{/* <div className="lcb_delivery-estimate">
						<span className="lcb_delivery-estimate-title">
							{singleImageData.deliveryEstimateTitle}
						</span>
						<br />
						<span className="lcb_delivery-estimate-content">
							{singleImageData.deliveryEstimateContent}
						</span>
					</div> */}
				</div>{" "}
			</>
			{showChat && <ChatPageForProduct setShowChat={setShowChat} />}
		</div>
	);
};
