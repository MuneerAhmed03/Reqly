

export const DetailHeader: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className="flow-root rounded-lg border  py-3 shadow-lg border-gray-700 m-2">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">{title}</h2>
            </div>
        </div>
    )
}