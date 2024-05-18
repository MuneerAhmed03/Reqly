import MockEditor from "./MockEditor";
import { useEffect, useState } from "react";
import { Dump } from "../types/interfaces";
import toast, { Toaster } from "react-hot-toast";
import socket from "../socket";
import YourSvg from "../assets/reqly.svg";
const REQLY_URL = import.meta.env.VITE_REQLY_URL || "http://localhost:3000";

interface TitleHeadProps {
  dump: Dump;
}
const notify = () => toast("URL Copied!");

const TitleHead: React.FC<TitleHeadProps> = ({ dump }) => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (response) {
      const updatedDump = { ...dump, mockResponse: JSON.parse(response) };
      try {
        console.log(updatedDump);
      } catch (error) {
        console.error("Invalid JSON:", response);
      }
      socket.emit("response", updatedDump);
    }
  }, [response]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex justify-center items-center relative bg-black">
      <div className="absolute left-0 w-full md:w-40 h-full shadow-lg hover:p-1">
        <img className="w-full h-full shadow-lg" src={YourSvg} alt="Your SVG" />
      </div>
      <div className="flex justify-center items-center w-full  md:w-48 bg-zinc-950 rounded-lg m-4 ">
        <button
          className="w-full md:w-1/2 p-1 font-semibold rounded-l-lg bg-zinc-950 text-white text-lg font hover:bg-zinc-900"
          onClick={() => {
            navigator.clipboard.writeText(
              `${REQLY_URL}/dump/inspect/${dump.name}`,
            );
            notify();
          }}
        >
          Copy
        </button>
        <div className="h-full border-r border-zinc-950"></div>
        <button
          className="w-full md:w-1/2 p-1  rounded-r-lg bg-zinc-950 text-white text-lg hover:bg-zinc-900"
          onClick={() => {
            setOpen(true);
          }}
        >
          Mock
        </button>
        <MockEditor
          open={open}
          onClose={handleClose}
          code={JSON.stringify(dump.mockResponse, null, 1)}
          onChange={() => {}}
          onSave={(code: string) => setResponse(code)}
        />
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default TitleHead;
