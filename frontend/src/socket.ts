import io from "socket.io-client";

const REQLY_URL = import.meta.env.VITE_REQLY_URL || "http://localhost:3000";

const socket = io(REQLY_URL);

export default socket;
