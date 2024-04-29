const TitleHead = () => {
  return (
    <div className="flex justify-center items-center bg-gray-900">
      <div className="flex justify-center items-center  w-48 bg-gray-300 rounded-lg m-4 ">
        <button className="w-1/2  rounded-l-lg bg-stone-500 text-white">
          Copy
        </button>
        <div className="h-full border-r border-gray-500"></div>
        <button className="w-1/2  rounded-r-lg bg-stone-500 text-white">
          Mock
        </button>
      </div>
    </div>
  );
};

export default TitleHead;