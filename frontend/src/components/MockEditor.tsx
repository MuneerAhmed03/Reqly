import React, { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";

interface MonacoDialogProps {
  open: boolean;
  onClose: () => void;
  code: string;
  onChange: (value: string | undefined) => void;
  onSave: (request: any) => void;
}

const MockEditor: React.FC<MonacoDialogProps> = ({
  open,
  onClose,
  code,
  onChange,
  onSave,
}) => {
  if (!open) {
    return null;
  }
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };
  const handleSave = () => {
    if (editorRef.current) {
      console.log("Code " + editorRef.current.getValue());
    } else {
      console.log("Editor not found");
    }
    onSave(editorRef.current.getValue().toString());
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
         
          <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="bg-black pb-3 sm:flex sm:flex-col justify-between" >
            <label className="text-white text-lg font-sans font-bold p-1">Status Code:</label>
            <input type="number" min="100" max="600" className="w-1/4 bg-gray-900 rounded-md text-white p-2"  />
          </div>
            <Editor
              height="60vh"
              defaultLanguage="json"
              value={code}
              onChange={onChange}
              theme="vs-dark"
              onMount={handleEditorDidMount}
            />
          </div>
          <div className="bg-black px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-zinc-900 text-base font-medium text-white hover:bg-zinc-700 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-zinc-900 text-base font-medium text-white hover:bg-zinc-700 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockEditor;
