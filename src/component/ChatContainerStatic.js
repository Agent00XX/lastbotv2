import React, { useEffect, useRef, useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessasges } from './ChatMessasges';
import { InputMessage } from './InputMessage';
import { ChatMessasgesStatic } from './ChatMessasgesStatic';

const messages = [
    {
        id: 1,
        contents:
            "Hi! 👋 Welcome to AINA-Keittiöt. I'm a virtual assistant powered by AI and I'm here to help you design your perfect kitchen.      How can I help you today?",
        role: "assistant",
        img: "./assets/Images/Logo.png",
    }

];




export const ChatContainerStatic = () => {
    const scrollRef = useRef()

    const [uuid, setUuid] = useState("my-unique-user-identifier")
    const [sessionId, setSessionId] = useState("my-long-and-unique-session-id")
    const [showChat, setShowChat] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [message, setMessage] = useState(messages);
    const [showImgContainer, setshowImgContainer] = useState(false)

    const [inputMessage, setInputMessage] = useState("");
    const [isHuman, setIsHuman] = useState(false)
    const [widgetInfo, setWidgetInfo] = useState(null);
    const [currentUserId, setCurrentUserId] = useState("")
    const [isFetching, setIsFetching] = useState(false); // Flag to control polling

    // const getWidget = () => {
    //     let requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };
    //     fetch("https://elo.pasi.ai/widgets/0454ddb5e93e783b6e49d1253239a4297ca559cd", requestOptions)
    //         .then(response => response.json())
    //         .then(result => setWidgetInfo(result))
    //         .catch(error => console.log('error', error));
    // }

    // const getMessageThreads = (sessionId, uuid) => {
    //     let requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };

    //     fetch(`https://elo.pasi.ai/widgets/0454ddb5e93e783b6e49d1253239a4297ca559cd/message_threads?session_id=${sessionId}&uuid=${uuid}`, requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             console.log({ result });
    //             setCurrentUserId(result[0].id)
    //             getMessages(sessionId, uuid, result[0].id, true)
    //         })
    //         .catch(error => console.log('error', error));
    // }

    const getMessages = (sessionId, uuid, currentUserId, firstTime = false) => {
        // if (!isFetching && !firstTime) {
        //     return; // Stop fetching if a new message is already received
        // }
        // let requestOptions = {
        //     method: 'GET',
        //     redirect: 'follow'
        // };

        // fetch(`https://elo.pasi.ai/widgets/0454ddb5e93e783b6e49d1253239a4297ca559cd/message_threads/${currentUserId}/messages?session_id=${sessionId}&uuid=${uuid}`, requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         if(firstTime){
        //             setMessage(result)
        //         } else if (JSON.stringify(result) !== JSON.stringify(message)) {
        //             setIsFetching(false); // Stop fetching if new messages are received
        //             setMessage(result) // Update the messages state with new messages
        //             scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        //           }
        //     })
        //     .catch(error => console.log('error', error));
    }

    // const postMessage = (inputFromUser) => {
    //     let myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     let raw = JSON.stringify({
    //         "message": {
    //             "contents": inputFromUser
    //         }
    //     });

    //     let requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     fetch(`https://elo.pasi.ai/widgets/0454ddb5e93e783b6e49d1253239a4297ca559cd/message_threads/${currentUserId}/messages?session_id=${sessionId}&uuid=${uuid}`, requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             console.log(result)
    //             setMessage(prev => [...prev, result]);
    //             setIsFetching(true)
    //             console.log("scrollRef.current.scrollHeight", scrollRef.current.scrollHeight)
    //             scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    //         })
    //         .catch(error => console.log('error', error));
    // }

    // useEffect(() => {
    //     if (!widgetInfo) {
    //         getWidget()
    //     }
    //     if (!currentUserId) {
    //         getMessageThreads(sessionId, uuid)
    //     }
    // }, [widgetInfo, currentUserId])

    const handleAddMessage = (message) => {
        postMessage(message)
    }
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getMessages(sessionId, uuid, currentUserId)
    //     }, 5000); // Fetch every 5 seconds
    
    //     // Clear the interval and allow fetching when component unmounts
    //     return () => clearInterval(interval);
    //   }, [isFetching]);


    return (
        <div className={showChat ? isFullScreen ? "chat-container-desktopOpenView-fullscreen" : window.innerWidth > 769 ? "chat-container-desktopOpenView" : "chat-container" : window.innerWidth > 769 ? "chat-container-desktop" : "chatContainer"} >
            <ChatHeader setShowChat={setShowChat} showChat={showChat} isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} isHuman={isHuman} widgetInfo={widgetInfo} />
            {/* <SingleImg /> */}
            {showChat && <>
                <ChatMessasgesStatic scrollRef={scrollRef}
                    isFullScreen={isFullScreen}
                    message={message} setMessage={setMessage}
                    setshowImgContainer={setshowImgContainer}
                    setIsHuman={setIsHuman}
                    inputMessage={inputMessage}
                    setInputMessage={setInputMessage}
                // messages={messages}
                />
                <InputMessage handleAddMessage={handleAddMessage} inputMessage={inputMessage} setInputMessage={setInputMessage} />
            </>
            }
        </div>
    )
}
