import React from "react";
import { Card, CardGroup } from "react-bootstrap";

export const ChatMessasges = ({ isFullScreen }) => {
  const messages = [
    {
      message:
        "Hey 👋 Can I help you with anything? I’m a smart AI bot that understands normal language. I’ll get a human if there’s something I can’t help with.  ",
      type: "user",
      img: "./assets/Images/Logo.png",
    },
    {
      message: "Help me choose a kitchen",
      type: "bot",
    },
    {
      message:
        "To help you find the perfect kitchen style for your home, let's begin by discussing your personal taste. Among Scandinavian, Farmhouse, and Modern styles, do you find yourself gravitating towards a particular one?",
      type: "user",
      img: "./assets/Images/Logo.png",
    },
    {
      message: "scandinavian would be the best",
      type: "bot",
    },
    // {
    //   message: "Property 1=Default",
    //   type: "user",
    //   img: "./assets/Images/Logo.png",
    // },
    // {
    //   message: "Property 1=Default",
    //   type: "bot",
    // },
  ];

  const chatImgData = [
    {
      id: 1,
      img: "./assets/Images/chatimg.png",
      title: "Tyyni-kitchen",
      text: " Harmonious Scandinavian style.",
    },
    {
      id: 2,
      // img: "./assets/Images/chatimg2.png",
      img: "./assets/Images/chatimg.png",
      title: "Hohtava-kitchen",
      text: " Bright and airy.",
    },
  ];
  const getClassName = (type) => {
    if (type === "user") {
      return "chat-bubble-sender";
    }
    return "chat-bubble-reciever";
  };
  return (
    <div
      className={
        isFullScreen ? "message-container-fullscreen" : "message-container"
      }
    >
      {messages.map(({ message, type, img }, index) => (
        <>
          {type === "user" ? (
            <div className="d-block sender-conataoner">
              <img src={img} alt="user-avatar" className="user-avatar" />
              <p className={`chat-bubble p-3    ${getClassName(type)} `}>
                {message}
              </p>
            </div>
          ) : (
            <div key={index} className={`chat-bubble ${getClassName(type)}`}>
              <p>{message}</p>
            </div>
          )}

          {/* <div key={index} className={`chat-bubble ${getClassName(type)}`}>
            <p>{message}</p>
          </div> */}
        </>
      ))}

      <CardGroup>
        {chatImgData.map((cur, idx) => (
          <Card
            style={{
              width: "220px",
              height: "229px",
            }}
            className="card"
          >
            <Card.Img variant="top" src={cur.img} />
            <Card.Body>
              <Card.Title className="single-chat-tittle">
                {cur.title}
              </Card.Title>
              <Card.Text className="single-chat-text">{cur.text}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
      {/* </Row> */}
      {/* </div> */}

      {/* <img src={"./assets/Images/wax.jpg"} alt="user-avatar" /> */}
      <div
        //   ref={ref}
        className="to-scroll-div"
      />
    </div>
    // <div
    //   className={
    //     isFullScreen ? "message-container-fullscreen" : "message-container"
    //   }
    // >
    //   {messages.map(({ message, type, img }, index) => (
    //     <>
    //       {type === "user" ? (
    //         <div className="d-block ">
    //           <img src={img} alt="user-avatar" className="user-avatar" />
    //           <p className={`chat-bubble p-3    ${getClassName(type)} `}>
    //             {message}
    //           </p>
    //         </div>
    //       ) : (
    //         <div key={index} className={`chat-bubble ${getClassName(type)}`}>
    //           <p>{message}</p>
    //         </div>
    //       )}

    //       {/* <div key={index} className={`chat-bubble ${getClassName(type)}`}>
    //         <p>{message}</p>
    //       </div> */}
    //     </>
    //   ))}

    //   <Container>
    //     <Row
    //       // xs={1}
    //       // md={2}
    //       className=" overflow-auto  d-flex"
    //       // style={{ display: "contents" }}
    //     >
    //       {/* {Array.from({ length: 4 }).map((_, idx) => ( */}
    //       {[1, 2].map((cur) => (
    //         <>
    //           <Col className=" w-100  ">
    //             <Image
    //               src="./assets/Images/wax.jpg"
    //               fluid
    //               width="220px"
    //               height="177px"
    //               radius="8px"
    //               // style={{ width: "150px", height: " 150px" }}
    //             />
    //           </Col>

    //           {/* ))} */}
    //         </>
    //       ))}
    //     </Row>
    //   </Container>
    //   {/* <img src={"./assets/Images/wax.jpg"} alt="user-avatar" /> */}
    //   <div
    //     //   ref={ref}
    //     className="to-scroll-div"
    //   />
    // </div>
  );
};
