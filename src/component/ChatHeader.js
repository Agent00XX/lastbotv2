import React from 'react'
import { ArrowsAngleContract, ArrowsAngleExpand, ChevronDown, ChevronUp } from 'react-bootstrap-icons'
// import Avtar from '../../public/assets/Images/Avatar.png'
// import Avtar from './assets/Images/Avtar.png'
export const ChatHeader = ({ setShowChat, showChat, setIsFullScreen, isFullScreen , isHuman, widgetInfo}) => {

    return (
        <>
            {!showChat && window.innerWidth < 769 ? <div className='chatIconFloat' onClick={() => {
                setShowChat(!showChat)
            }}>
                <img src={"./assets/Images/Chat-icon.png"} alt="user-avatar" />
            </div> :
                <div className="chat-header-wrapper">
                    <div>
                        <img src={isHuman ? "./assets/Images/HumanAvatar.png" : "./assets/Images/Logo.png"} className="user-avatar" alt="user-avatar" />
                        <span className='headertext'>{isHuman ? "Mari from AINA" : widgetInfo?.name}</span>
                        {!isHuman && <img src={"./assets/Images/bot.png"} alt="user-avatar" style={{ marginLeft: 8 }} />}
                    </div>
                    <div >
                        <span className='svg-icon mr-2 '>
                            <img src={"./assets/Images/backIcon.png"} alt="user-avatar" style={{ marginLeft: 8 }} />
                        </span>
                        {window.innerWidth > 769 && <span className='svg-icon' onClick={() => setIsFullScreen(prev => !prev)}>

                            {!isFullScreen ? <ArrowsAngleExpand /> : <ArrowsAngleContract />}
                        </span>}

                        <span onClick={() => {
                            setShowChat(!showChat)
                        }}>

                            {showChat ? <img src={"./assets/Images/backIcon.svg"} alt="user-avatar" style={{ marginLeft: 8 }} /> : <ChevronUp />}
                        </span>
                    </div>
                </div>}
        </>
    )
}
