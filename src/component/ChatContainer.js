import React, { useEffect, useRef, useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessasges } from './ChatMessasges';
import { InputMessage } from './InputMessage';
import { generateRandomString } from '../utils/helper';

const messages = [
    {
        id: 1,
        message:
            "Hi! 👋 Welcome to AINA-Keittiöt. I'm a virtual assistant powered by AI and I'm here to help you design your perfect kitchen.      How can I help you today?",
        type: "user",
        img: "./assets/Images/Logo.png",
    }

];



export const ChatContainer = ({ BASE_URL }) => {
    console.log("BASE_URL ", BASE_URL);
    const scrollRef = useRef();
    const [uuid, setUuid] = useState("")
    const [sessionId, setSessionId] = useState("")
    const [threadInfos, setThreadInfos] = useState([]);

    useEffect(() => {
        let localStorageUuid = localStorage.getItem("uuid");
        let localStorageSessionId = localStorage.getItem("sessionId");

        if (localStorageUuid) {
            setUuid(localStorageUuid)
        } else {
            const newUuid = generateRandomString()
            localStorage.setItem("uuid", newUuid)
            setUuid(newUuid)
        }

        if (localStorageSessionId) {
            setSessionId(localStorageSessionId)
        } else {
            const newSessionId = generateRandomString()
            localStorage.setItem("sessionId", newSessionId)
            setSessionId(newSessionId)
        }
    }, [])

    const resetChat = () => {
        const newUuid = generateRandomString()
        localStorage.setItem("uuid", newUuid)
        setUuid(newUuid)
        const newSessionId = generateRandomString()
        localStorage.setItem("sessionId", newSessionId)
        setSessionId(newSessionId)
    }


    const [showChat, setShowChat] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [message, setMessage] = useState(messages);
    const [showImgContainer, setshowImgContainer] = useState(false)

    const [inputMessage, setInputMessage] = useState("");
    const [isHuman, setIsHuman] = useState(false)
    const [widgetInfo, setWidgetInfo] = useState(null);
    const [currentUserId, setCurrentUserId] = useState("")
    const [isFetching, setIsFetching] = useState(false); // Flag to control polling
    const [showInitialMessages, setShowInitialMessages] = useState([]);
    
    const getWidget = () => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(BASE_URL, requestOptions)
            .then(response => response.json())
            .then(result => setWidgetInfo(result))
            .catch(error => console.log('error', error));
    }

    const getMessageThreads = (sessionId, uuid) => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        // fetch(`${BASE_URL}/message_threads?session_id=${sessionId}&uuid=${uuid}&url=${window.location.href}`, requestOptions)
        fetch(`${BASE_URL}/message_threads?session_id=${sessionId}&uuid=${uuid}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setThreadInfos(result)
                setCurrentUserId(result[0].id)
                getMessages(sessionId, uuid, result[0].id, true)
            })
            .catch(error => console.log('error', error));
    }

    const getMessages = (sessionId, uuid, currentUserId, firstTime = false) => {
        if (!isFetching && !firstTime) {
            return; // Stop fetching if a new message is already received
        }
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${BASE_URL}/message_threads/${currentUserId}/messages?session_id=${sessionId}&uuid=${uuid}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("result message--> ", result);
                if(result.length > 0 && result[result.length - 1].metadata.type === 'options' && result[result.length - 1].metadata.data.length > 0) {
                    setShowInitialMessages(result[0].metadata.data)
                }
                if (firstTime) {
                    setMessage(result)
                } else if (result[result.length - 1].role === 'assistant' && result[result.length - 1].is_finished) {
                    // } else if (JSON.stringify(result) !== JSON.stringify(message)) {

                    setIsFetching(false); // Stop fetching if new messages are received
                    setMessage(result) // Update the messages state with new messages
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                } else {
                    setMessage(result) // Update the messages state with new messages
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            })
            .catch(error => console.log('error', error));
    }

    const postMessage = (inputFromUser) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "message": {
                "contents": inputFromUser
            }
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${BASE_URL}/message_threads/${currentUserId}/messages?session_id=${sessionId}&uuid=${uuid}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setMessage(prev => [...prev, result]);
                setShowInitialMessages([])
                setIsFetching(true)
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        // if (!widgetInfo) {
            getWidget()
        // }
        if (sessionId && uuid) {
            getMessageThreads(sessionId, uuid)
        }
    }, [currentUserId, sessionId, uuid])

    const handleAddMessage = (message) => {
        postMessage(message)
    }
    useEffect(() => {
        const interval = setInterval(() => {
            getMessages(sessionId, uuid, currentUserId)
        }, 1000); // Fetch every 5 seconds

        // Clear the interval and allow fetching when component unmounts
        return () => clearInterval(interval);
    }, [isFetching]);

    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}


    return (
        <div className="lbt_bot">
            <div style={{border: '1px solid lightgrey'}} className={showChat ? isFullScreen ? "lcb_chat-container-desktopOpenView-fullscreen" : window.innerWidth > 769 ? "lcb_chat-container-desktopOpenView" : "lcb_chat-container" : "lcb_chat-container-desktop"} >
                <ChatHeader setShowChat={setShowChat} showChat={showChat} isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} isHuman={isHuman} widgetInfo={widgetInfo} resetChat={resetChat} />
                {/* <SingleImg /> */}
                {showChat && <>
                    <ChatMessasges scrollRef={scrollRef}
                        isFullScreen={isFullScreen}
                        message={message} setMessage={setMessage}
                        setshowImgContainer={setshowImgContainer}
                        setIsHuman={setIsHuman}
                        inputMessage={inputMessage}
                        setInputMessage={setInputMessage}
                        widgetInfo={widgetInfo}
                        setFocus={setFocus}
                        isFetching={isFetching}
                        threadInfos={threadInfos}
                        showInitialMessages={showInitialMessages}
                    // messages={messages}
                    />
                    <InputMessage isFetching={isFetching} htmlElRef={htmlElRef} isFullScreen={isFullScreen} handleAddMessage={handleAddMessage} inputMessage={inputMessage} setInputMessage={setInputMessage} />
                </>
                }
            </div>
        </div>
    )
}
