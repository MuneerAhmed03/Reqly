import React from 'react'

const EmptySelection  = () => {
    const name = sessionStorage.getItem("dumpName");
    return (
        <div className="w-full mt-5 md:mt-0 flex items-center justify-center">
        <div className="w-full bg-white shadow-lg rounded-lg  sm:rounded-lg m-5">
            <div className="px-4 py-5 border-b border-gray-700 sm:px-6">
                <h3 className="text-lg text-center leading-6 justify-center font-medium text-gray-900 flex">
                        Waiting for Request On :<br/>
                        {`http://localhost:8000/dump/inspect/${name}`}
                </h3>
                </div>
            </div>
        </div>
    )
}

export default EmptySelection