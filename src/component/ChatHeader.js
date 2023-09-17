import React from 'react'
import { ArrowsAngleContract, ArrowsAngleExpand, ChevronUp } from 'react-bootstrap-icons'
// import Avtar from '../../public/assets/Images/Avatar.png'
// import Avtar from './assets/Images/Avtar.png'
export const ChatHeader = ({ setShowChat, showChat, setIsFullScreen, isFullScreen , isHuman, widgetInfo}) => {

    return (
        <>
            {!showChat && window.innerWidth < 769 ? <div className="lcb_chatIconFloat" onClick={() => {
                setShowChat(!showChat)
            }}> 
            {/* https://agent00xx.github.io/lastbotv2/assets/Images/Logo.png */}
                <img src={"https://agent00xx.github.io/lastbotv2/assets/Images/Chat-icon.png"} alt="user-avatar" />
            </div> :
                <div className="lcb_chat-header-wrapper">
                    <div className='lcb_headertext_wrapper'>
                        <img src={isHuman ? "https://agent00xx.github.io/lastbotv2/assets/Images/HumanAvatar.png" : "https://agent00xx.github.io/lastbotv2/assets/Images/Logo.png"} className="lcb_user-avatar" alt="user-avatar" />
                        <span className="lcb_headertext">{isHuman ? "Mari from AINA" : widgetInfo?.name}</span>
                        {!isHuman && <img src={"https://agent00xx.github.io/lastbotv2/assets/Images/bot.png"} alt="user-avatar" style={{ marginLeft: 8 }} />}
                    </div>
                    <div  className="lcb_chat-header-wrapper">
                        <span className="lcb_svg-icon lcb_mr-2 ">
                            <img src={"https://agent00xx.github.io/lastbotv2/assets/Images/backIcon.png"} alt="user-avatar" style={{ marginLeft: 8 }} />
                        </span>
                        {window.innerWidth > 769 && <span className="lcb_svg-icon" onClick={() => setIsFullScreen(prev => !prev)}>

                            {!isFullScreen ? <ArrowsAngleExpand /> : <ArrowsAngleContract />}
                        </span>}

                        <span onClick={() => {
                            setShowChat(!showChat)
                        }}>

                            {showChat ? <img src={"https://agent00xx.github.io/lastbotv2/assets/Images/backIcon.svg"} alt="user-avatar" style={{ marginLeft: 8 }} /> : <ChevronUp />}
                        </span>
                    </div>
                </div>}
        </>
    )
}
