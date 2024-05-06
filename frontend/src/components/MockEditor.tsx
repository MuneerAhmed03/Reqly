import React from 'react';
import Editor , {Monaco} from '@monaco-editor/react';

interface MonacoDialogProps {
  open: boolean;
  onClose: () => void;
  code: string;
  onChange: (value: string | undefined) => void;
}

const MockEditor: React.FC<MonacoDialogProps> = ({ open, onClose, code, onChange }) => {
  if (!open) {
    return null;
  }

  const myCustomTheme = {
    base: 'vs-dark', // can also be 'vs' or 'hc-black'
    inherit: true, // can also be false to completely replace the builtin rules
    rules: [
      { token: 'comment', foreground: 'ffa500', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ff0000' },
    ],
    colors: {
      'editor.foreground': '#000000',
      'editor.background': '#EDF9FA',
      'editorCursor.foreground': '#8B0000',
      'editor.lineHighlightBackground': '#0000FF20',
      'editorLineNumber.foreground': '#008800',
      'editor.selectionBackground': '#88000030',
      'editor.inactiveSelectionBackground': '#88000015'
    }
  }




  return (
    
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <Editor
              height="60vh"
              defaultLanguage="json"
              value={code}
              onChange={onChange}
              theme='vs-dark'
            />
          </div>
          <div className="bg-black px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-zinc-900 text-base font-medium text-white hover:bg-zinc-700 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
                Save
            </button>
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-zinc-900 text-base font-medium text-white hover:bg-zinc-700 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
              Close
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MockEditor;
