import React, { useState } from 'react';


import './styles.css';

const baseClassName = 'chat-bubble';

const ChatBubble = (props) => {
  const alt = props.direction === 'right' ? 'alt' : '';
  return (
      <div className="msg">
        <div className={"bubble " + alt}>
          <div className="txt">
            <span className={"name " + alt}>{props.from}</span>
            <span className="timestamp">{props.time}</span>
            <span className="message">
              {props.children}
            </span>
          </div>
          <div className={"bubble-arrow " + alt}/>
        </div>
      </div>
  )
}

export default ChatBubble;