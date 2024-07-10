import React, { useEffect, useRef, useState } from "react";
import img from "../../Assets/Images/Action.jpg";
import { useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { imageUrl } from "../Constants/Image_Url";

function SupportChatBox() {
  const { id } = useParams();
  // const { type } = useParams();



  // const aid = localStorage.getItem("advocateId");

  const [messageList, setMessageList] = useState([
  ]);
  const [userDetalis, setUserDetails] = useState({
    img: { filename: "" },
  });
  const [inputValue, setInputValue] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    axiosInstance
      .post(`viewChatBetweenuserandSupport/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setMessageList(res.data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`viewUserById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setUserDetails(res.data.data);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSend = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`chatting`, {
        msg: inputValue,
        from: "support",
        to: "users",
        support: true,
        toId:id
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setInputValue("");
          setMessageList((prevMessageList) => [
            ...prevMessageList,
            res.data.data,
          ]);
        } else {
          console.log("Failed to send message");
        }
      })
      .catch(() => {
        console.log("Failed to send message");
      });
    console.log("client");
  };

  // const handleJnrSend = (e) => {
  //   e.preventDefault();
  //   axiosInstance
  //     .post(`chatting`, {
  //       msg: inputValue,
  //       from: "advocates",
  //       to: "jnrAdv",
  //       advId: aid,
  //       jrId: uid,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.status === 200) {
  //         setInputValue("");
  //         setMessageList((prevMessageList) => [
  //           ...prevMessageList,
  //           res.data.data,
  //         ]);
  //       } else {
  //         toast.error("Failed to send message");
  //       }
  //     })
  //     .catch(() => {
  //       toast.error("Failed to send message");
  //     });
  //   console.log("jnr");
  // };

  // const handleInternSend = (e) => {
  //   e.preventDefault();
  //   axiosInstance
  //     .post(`chatting`, {
  //       msg: inputValue,
  //       from: "advocates",
  //       to: "interns",
  //       advId: aid,
  //       internId: uid,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.status === 200) {
  //         setInputValue("");
  //         setMessageList((prevMessageList) => [
  //           ...prevMessageList,
  //           res.data.data,
  //         ]);
  //       } else {
  //         toast.error("Failed to send message");
  //       }
  //     })
  //     .catch(() => {
  //       toast.error("Failed to send message");
  //     });
  //   console.log("jnr");
  // };

  return (
    <div>
      <div className="advocate_chat mt-4">
        {messageList.length ? (
          <div className="adv_chat_container">
            <div className="chat-header">
              <img
                src={`${imageUrl}/${userDetalis.img.filename}`}
                className="img-fluid"
                alt="Advocate"
              />
              <span className="fs-5 px-3 text-light">{userDetalis.name}</span>
            </div>
            <div className="adv_chat-body p-5" ref={chatBodyRef}>
              {messageList.map((msg) => (
                <div>
                  <div
                      key={msg.id}
                    className={`chat-message ${
                      msg.from == "users"
                        ? "received"
                        : "sent"
                    }`}
                  >
                    <div className="message-header">
                      <span className="username">
                        <small>
                          {msg.from == "users"
                              ? msg.userId.name
                              : 'Support'}
                        </small>
                      </span>
                      <span className="timestamp text-light">
                        {msg.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <p className="message-content fs-5">{msg.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no_chat_container text-light">
            <h3>Please start the conversation.</h3>
          </div>
        )}
        <form
          onSubmit={handleSend}
        >
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type Your Message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SupportChatBox;
