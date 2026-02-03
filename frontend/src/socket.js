// src/socket.js
import { io } from "socket.io-client";

// Use the deployed backend URL from the environment variable
const socket = io(process.env.REACT_APP_BACKEND_URL, {
  transports: ["websocket"],
  withCredentials: false
});

export default socket;
