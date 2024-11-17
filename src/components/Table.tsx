import React from "react";

export type ColumnDefs = {
    title: string;
} & (
    | {
        field: string;
    }
    | {
        render: (rowData: Record<string, any>) => React.ReactNode;
    }
);

interface TableProps {
    columnDefs: ColumnDefs[];
    data: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ columnDefs, data }) => {
    return (
        <table className="min-w-full divide-y overflow-hidden rounded-lg divide-gray-800 shadow-lg">
            <thead className="bg-green-200">
                <tr>
                    {columnDefs.map((column, colIndex) => (
                        <th
                            key={colIndex}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {column.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.map((rowData, rowIndex) => (
                    <tr key={rowIndex} className="cursor-pointer hover:bg-gray-100">
                        {columnDefs.map((column, colIndex) => (
                            <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                                {'field' in column
                                    ? rowData[column.field] ?? "N/A" // Menangani kasus di mana field tidak ada
                                    : column.render
                                    ? column.render(rowData)
                                    : null}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;