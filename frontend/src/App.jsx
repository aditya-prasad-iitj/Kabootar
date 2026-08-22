import './App.css'
import logo from "./assets/send.png"
import { useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [showButton, setShowButton] = useState()


  return (
    <>
      <div className="parent">
        <div className="chats">
          <div className="msg-out">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga sint quam aliquid tenetur facilis debitis saepe asperiores culpa praesentium, perspiciatis quibusdam velit quia repellendus, dolor ex esse provident voluptate vel consectetur animi?</div>
          <div className="msg-out">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga sint quam aliquid tenetur facilis debitis </div>
          <div className="msg-out">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga sint quam aliquid tenetur facilis debitis saepe asperiores </div>
        </div>

        <div className="textArea">

          <input className="textBox" type="text" placeholder="Type Your Chitthi..." value={msg} onChange={(e) =>{
            setMsg(e.target.value);
            if(e.target.value.trim() === ""){
              setShowButton(false)
            }else{
              setShowButton(true)
            }
            }}
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
                sendmsg(msg);
              }
              
            }} />

          {showButton && (
            <button className='send' > <img src={logo} alt="logo" width="20" /> </button>
          )}

        </div>

      </div>
    </>
  )
}

export default App
