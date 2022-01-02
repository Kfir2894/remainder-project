import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Remainders from "./Remainders";
import { Routes, Route, Link } from "react-router-dom";



const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showRemainders, setRemainders] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setRemainders(true);
    }
  };

  return (
    <div className="App">
      {!showRemainders ? (
        
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <div>
          <h1>
            <Link to={'/Remainders'}>TO SET REMAINDERS</Link>
          </h1>
          <Routes>
            <Route path={"/"} element={<App />} />
            <Route
              path={"/Remainders"}
              element={
                <Remainders socket={socket} username={username} room={room}  />
              }
            />
          </Routes>
          
        </div>
      )}
    </div>
  );
}

export default App;
