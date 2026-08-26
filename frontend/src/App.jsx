import './App.css'
import logo from "./assets/send.png"
import { useState } from "react";
import {io} from "socket.io-client"

function randomMsgId(alrdyIds){ 
  let num;
  do{
    num = Math.floor(Math.random() * 10000);
  }while(alrdyIds.includes(num))

    return num;
}

class Message {
    constructor(id, text, time, from, to) {
        this.id = id;
        this.text = text;
        this.time = time;
        this.from = from;
        this.to = to;
    }
}


const socket = io("http://localhost:3000");
console.log(socket);


function App() {
  let dummyMessages = [
    new Message(1,
      "Hey, are you coming to class today?",
      new Date("2026-08-25T09:15:00"),
      "dummyUser",
      "Rahul"
    ),
    
    new Message(2, 
      "Yeah, I'll be there in 10 minutes.",
      new Date("2026-08-25T09:14:00"),
      "Rahul",
      "dummyUser"
    ),
    
    new Message(3,
      "Cool, don't forget the assignment.",
      new Date("2026-08-25T09:18:00"),
      "dummyUser",
      "Rahul"
    ),
    
    new Message(4,
      "Oh right! I'll finish it before class.",
      new Date("2026-08-25T09:20:00"),
      "Rahul",
      "dummyUser"
    ),
    
    new Message(5,
      "Perfect 👍",
      new Date("2026-08-25T09:21:00"),
      "dummyUser",
      "Rahul"
    )
  ];
  const currentUser = "dummyUser";
  const currentToUser = "dummy2";
  const [msg, setMsg] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [allMsgList, setAllMsgList] = useState(dummyMessages);
  
  
  
  async function sendmsg(msg, to){
    // console.log("Msg Sent:", msg);
    // change it later to not coincide with previous ones
    
    setAllMsgList((messages) => [
      ...messages,
      new Message(randomMsgId(allMsgList.map((msg)=>msg.id)), msg, new Date(), currentUser, to),
    ]);

    await socket.emit("newMsg", new Message(randomMsgId(allMsgList.map((msg)=>msg.id)),msg,new Date(),currentUser, to ));

    setMsg(""); //reseting the textbox blank 
  }


  return (
    <>
      <div className="parent">
        <div className="chats">
          {
            allMsgList
            .sort((a, b)=> a.time - b.time)
            .map((msg)=>{
              return (
                <div className={msg.from === currentUser?'msg-out': 'msg-in'} key={msg.id}> {msg.text}</div>
              )
            })
          }
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
                sendmsg(msg, currentToUser);
                console.log(allMsgList);
                
                
              }
              
            }} />

          {showButton && (
            <button onClick={() => sendmsg(msg, currentToUser)} className='send' > <img src={logo} alt="logo" width="20" /> </button>
          )}

        </div>

      </div>
    </>
  )
}

export default App
