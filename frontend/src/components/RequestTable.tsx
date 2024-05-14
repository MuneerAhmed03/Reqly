
interface RequestTableProps {
  filteredRequests: any[];
    onSelectionChange: (request: any) => void; 
  }

const RequestTable: React.FC<RequestTableProps> = ({ filteredRequests, onSelectionChange }) => {

  return (
    <div className="shadow overflow-hidden m-6 sm:rounded-lg border-b border-gray-700 bg-gray-800">
      <table className="min-w-full">
        <thead className="m-4">
          <tr>
            <th className="px-6 py-3 border-b m-2 bg-white border-gray-700 text-left text-xs leading-4 font-medium text-gray-900 uppercase tracking-wider">
              URL
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900">
          {filteredRequests?.map((request) => (
            <tr
              className="cursor-pointer"
              onClick={() => onSelectionChange(request)}
            >
              <td className="px-6 py-4 whitespace-normal border-b border-gray-700 text-sm leading-5 font-medium text-gray-200">
                <p>
                  {request.method} {request.url}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
