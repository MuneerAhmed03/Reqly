import { useEffect, useState } from "react";
import RequestTable from "../components/RequestTable";
import RequestDetails from "../components/RequestDetails";
import socket from "../socket";
import { RequestData, Dump } from "../types/interfaces";
import TitleHead from "../components/TitleHead";
import filterHeaders from "../utils/filterHeaders";
import axios from "axios";

const REQLY_URL = import.meta.env.VITE_REQLY_URL || "http://localhost:3000";

const Inspect = () => {
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(
    null
  );
  const [dump, setDump] = useState<Dump>({
    name: "",
    requests: [],
    mockResponse: {},
  } as Dump);

  useEffect(() => {
    socket.on("newRequest", ({ dump }) => {
      const updatedRequests = filterHeaders(dump.requests);
      const updatedDump = { ...dump, requests: updatedRequests };
      setDump(updatedDump);
      console.log("udpate  occured");
    });
    return () => {
      socket.off("newRequest");
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("dumpName") == null) {
      axios.get(`${REQLY_URL}/dump/generate`).then((res) => {
        if (res.status === 200) {
          setDump(res.data as Dump);
          sessionStorage.setItem("dumpName", res.data.name);
        }
      });
    } else {
      const url = sessionStorage.getItem("dumpName") as string;
      axios.get(`${REQLY_URL}/dump/retrieve/${url}`).then((res) => {
        if (res.status === 200) {
          setDump(res.data as Dump);
        } else {
          sessionStorage.removeItem("dumpName");
        }
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-auto">
      <TitleHead dump={dump} />
      <div className="flex flex-row flex-grow">
        {/* RequestTable takes up 1/3 of the screen */}
        <div className="w-2/3 bg-stone-950 overflow-auto">
          <RequestDetails selectedRequest={selectedRequest} />
        </div>
        {/* RequestDetails takes up 2/3 of the screen */}
        <div className="w-1/3 bg-black overflow-auto">
          <RequestTable
            filteredRequests={dump.requests}
            onSelectionChange={setSelectedRequest}
          />
        </div>
      </div>
    </div>
  );
};

export default Inspect;
