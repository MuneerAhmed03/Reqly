import MockEditor from "./MockEditor";
import { useEffect, useState } from "react";
import { Dump } from "../types/interfaces";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import socket from "../socket";

interface TitleHeadProps {
  dump: Dump;
}
const notify = () => toast("URL Copied!");

const TitleHead: React.FC<TitleHeadProps> = ({ dump }) => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  console.log(dump);
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
    <div className="flex justify-center items-center bg-gray-950">
      <div className="flex justify-center items-center  w-48 bg-zinc-950 rounded-lg m-4 ">
        <button
          className="w-1/2 p-1 font-semibold rounded-l-lg bg-zinc-950 text-white text-lg font hover:bg-zinc-900"
          onClick={() => {
            navigator.clipboard.writeText(dump.name);
            notify();
          }}
        >
          Copy
        </button>
        <div className="h-full border-r border-zinc-950"></div>
        <button
          className="w-1/2 p-1  rounded-r-lg bg-zinc-950 text-white text-lg hover:bg-zinc-900"
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