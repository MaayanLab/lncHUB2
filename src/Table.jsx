import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export default function Table(props) {
    const csv = props.table.split(/\r?\n/).map((row) => row.split(','));
    const header = csv[0];
    const body = csv.slice(1, props.top);

    console.log(csv)

    const renderedHeader = (
        <thead>
            <tr>
                {
                    header.map((column, i) => (
                        <th
                            key={`header-${i}`}
                        >
                            {column}
                        </th>
                    ))
                }
            </tr>
        </thead>
    );

    const renderedBody = (
        <tbody>
            {
                body.map((row, rowIdx) => (
                    <tr key={`row-${rowIdx}`}>
                        {
                            row.map && row.map((column, colIdx) => (
                                <td
                                    key={`col-${colIdx}`}
                                >
                                    {column}
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </tbody>
    );

    return (
        <table className="table table-sm">
            {renderedHeader}
            {renderedBody}
        </table>
    );
}
