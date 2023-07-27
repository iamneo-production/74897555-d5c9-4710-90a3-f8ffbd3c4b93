import React, { useEffect, useState, useRef, useCallback } from "react";
import api, { BASE_URL } from "../../utils/api";

const Communication = () => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const [chats, setChats] = useState([]);
  const [project, setProject] = useState({});
  const name = decodedToken.username;
  const formRef = useRef(null);
  const messageEndRef = useRef(null);
  useEffect(() => {
    if (decodedToken.role === "MANAGER") {
      const loginid = decodedToken.id;
      api
        .get(`${BASE_URL}/project/manager/${loginid}`)
        .then((response) => {
          setProject(response.data);
          setSendMessage((prevSendMessage) => ({
            ...prevSendMessage,
            projectid: response.data.id,
          }));
        })
        .catch((error) => {
          console.error("Error fetching options: ", error);
        });
    } else {
      const loginid = decodedToken.id;
      try {
        api
          .get(`${BASE_URL}/project/user/${loginid}`)
          .then((response) => {
            setProject(response.data);
            setSendMessage((prevSendMessage) => ({
              ...prevSendMessage,
              projectid: response.data.project_id,
            }));
          })
          .catch((error) => {
            console.error("Error fetching options: ", error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [decodedToken.id, decodedToken.role]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [chats]);
  const [sendMessage, setSendMessage] = useState({
    name: decodedToken.username,
    description: "",
    projectid:
      decodedToken.role === "MANAGER" ? project.id : project.project_id,
  });

  const getChat = () => {
    loadUser();
  };
  const loadUser = useCallback(async () => {
    const pid = sendMessage.projectid;
    try {
      const response = await api.get(`${BASE_URL}/communication/${pid}`);
      setChats(response.data);
    } catch (error) {
      console.error("Error loading project:", error);
    }
  }, [sendMessage.projectid]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadUser();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [loadUser]);

  const addFormdata = (e) => {
    setSendMessage({ ...sendMessage, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const projectid = sendMessage.projectid;
    await api.post(`${BASE_URL}/addchat/${projectid}`, sendMessage);
    loadUser();
    formRef.current.reset();
  };

  return (
    <div>
      {sendMessage.projectid === undefined ? (
        <div className="text-center mt-5">
          <img
            src="https://www.itarian.com/assets-new/images/project-management.png"
            height="450px"
            width="500px"
            style={{ maxWidth: "100%" }}
            alt=""
          />
          <h2 className="text-primary">
            {" "}
            <br />
            No projects found
          </h2>
          <p style={{ fontSize: "18px" }}>
            It appears that no projects have yet been created! Once your project
            is created, the project chats will be displayed here.{" "}
          </p>
        </div>
      ) : (
        <div>
          <div className="container card shadow d-flex align-items-center justify-content-center p-2 m-2 mx-auto">
            <div className="input-group text-center mx-auto d-flex align-items-center justify-content-center">
              <input
                type="number"
                placeholder="Enter project id..."
                name="projectid"
                className="pidbox p-2"
                value={sendMessage.projectid}
                disabled
              />
              <input
                type="text"
                name="name"
                className="p-3"
                value={name}
                placeholder="Enter a name"
                style={{ width: "200px", height: "40px" }}
                onChange={addFormdata}
                required
                disabled
              />
              <button
                className="bg-success text-white p-2"
                style={{ width: "70px" }}
                onClick={getChat}
              >
                chat
              </button>
            </div>
          </div>

          <div
            className="container communicationbody border border-solid border-1 border-danger"
            style={{
              maxHeight: "550px",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
          >
            {chats.map((chat) => {
              if (chat.name === sendMessage.name) {
                return (
                  <h6
                    className="ms-auto m-1 p-3 border border-1 border-black"
                    style={{ width: "500px" }}
                    key={chat.id}
                  >
                    <span className="text-info">{name} : </span>
                    {chat.description}
                  </h6>
                );
              } else {
                return (
                  <h6
                    className="me-auto m-1 p-3 border border-1 border-black"
                    style={{ width: "500px" }}
                    key={chat.id}
                  >
                    <span className="text-info">{chat.name} : </span>
                    {chat.description}
                  </h6>
                );
              }
            })}
            <div ref={messageEndRef} />
          </div>

          <div className="container card shadow d-flex align-items-center justify-content-center p-3 m-2 mx-auto">
            <form ref={formRef} onSubmit={onSubmit}>
              <div className="input-group">
                <input
                  type="number"
                  name="projectid"
                  className="p-3"
                  value={sendMessage.projectid}
                  style={{ width: "80px" }}
                  onChange={addFormdata}
                  required
                  disabled
                />

                <input
                  type="text"
                  name="description"
                  placeholder="Enter a message"
                  className="p-3"
                  style={{ width: "900px" }}
                  onChange={addFormdata}
                  required
                />
                <button
                  className="p-3 bg-success text-white"
                  style={{ width: "80px" }}
                  disabled={sendMessage.projectid === undefined}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Communication;
