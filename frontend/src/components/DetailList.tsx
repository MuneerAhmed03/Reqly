interface DetailListProps {
    data: { [key: string]: string };
  }  

export const DetailList:React.FC<DetailListProps> = ({data}) => {
  console.log("DetailLisProps : " + Object.entries(data))
  return (
    <>
      <div className="flow-root rounded-lg border  py-3 shadow-sm border-gray-700 m-2">
        <dl className="-my-3 divide-y  text-sm divide-gray-700">
            {Object.entries(data).map(([key, value]) => (
                <div className="grid grid-cols-1 gap-1 p-3 e sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
            <dt className="font-medium text-white">{key}</dt>
            <dd className=" sm:col-span-2 text-gray-200">
              {value}
            </dd>
          </div>
          ))}
        </dl>
      </div>
    </>
  );
};
