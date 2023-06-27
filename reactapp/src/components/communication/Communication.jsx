import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import './communication.css';

const Communication = () => {
  const [projectid, setProjectid] = useState(0);
  const [chats, setChat] = useState([]);
  const[sendMessage,setsendMessage]=useState({
    
    "name":'',
    "description":''
  });
  const onInputchange = (e) => {
    setProjectid(e.target.value);
  };
  const getChat = (e) => {
    if (projectid > 0) {
      console.log('projectId = ' + projectid);
      loadUser();
    } else {
      console.log('less than 0');
    }
  };
  useEffect(() => {
    console.log("projectid = "+projectid+" name = "+sendMessage.name+" description = "+sendMessage.description);
    console.log("\n send projectid = "+sendMessage.projectid);    
    const interval  = setInterval(() =>{
      loadUser();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
    
  },[sendMessage,projectid])
  const loadUser = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/communication?projectid=' + projectid
      );
      setChat(response.data);
    } catch (error) {
      console.error('Error loading project:', error);
    }
  };
  const addFormdata =(e)=>{
    setsendMessage({...sendMessage,[e.target.name]: e.target.value});
    
  };
   const onSubmit=async(e)=>{
     e.preventDefault();
     if(sendMessage.projectid>0)
     {
    await axios.post("http://localhost:8080/addchat",sendMessage);
    loadUser();
    console.log("data added");
     }
     else
     {
      alert("less than 0 \n"+"project id in send = "+sendMessage.projectid+"\n"+"project name in send = "+sendMessage.name+"\nproject description in send = "+sendMessage.description);
     }
    
   }
  return (
    <div>
      <div className="container card shadow d-flex align-items-center justify-content-center p-2 m-2 mx-auto">
        <div className="input-group text-center mx-auto d-flex align-items-center justify-content-center">
          <input
            type="number"
            placeholder="Enter project id..."
            name="projectid"
            className="pidbox p-2"
            onChange={(e) => onInputchange(e)}
          />
          <input
            type="text"
            name="name"
            className="p-3"
            placeholder="Enter a name"
            style={{ width: '200px', height:"40px" }}
            onChange={(e)=>addFormdata(e)}
            required
          />
          <button
            className="bg-success text-white p-2"
            style={{ width: '70px' }}
            onClick={(e) => getChat(e)}
          >
            chat
          </button>
        </div>
      </div>
      <div className="container communicationbody border border-solid border-1 border-danger">
      
        {chats.map((chat) => {
          if(chat.projectid==projectid)
          if (chat.name ===  sendMessage.name) {
            return (
              <h6
                className="ms-auto m-1 p-3 border border-1 border-black"
                style={{ width: '500px' }}
              >
                <span className="text-info">{chat.name} :  </span>
                {chat.description} 
                
              </h6>
            );
          } else {
            return (
              <h6
                className="me-auto m-1 p-3 border border-1 border-black"
                style={{ width: '500px' }}
              >
                <span className="text-info" >{chat.name} :  </span>{chat.description}
              </h6>
            );
          }
        })}
      </div>
      <div className="container card shadow d-flex align-items-center justify-content-center p-3 m-2 mx-auto">
        <form onSubmit={(e)=>onSubmit(e)}>
        <div className="input-group">
          <input
            type="number"
            name="projectid"
            className="p-3"
            value={sendMessage.projectid=projectid}
            style={{ width: '80px' }}
            onChange={(e)=>addFormdata(e)}
            required
           disabled
          />
          
          
          
          <input
            type="text"
            name="description"
            placeholder="Enter a message"
            className="p-3"
            style={{ width: '900px' }}
            onChange={(e)=>addFormdata(e)}
            required
          />
          <button className="p-3 bg-success text-white" style={{ width: '80px' }}>
            Send
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Communication;