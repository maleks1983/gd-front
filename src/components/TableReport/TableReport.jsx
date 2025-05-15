function TableReport({
                         filteredData,
                         onRowClick,
                         onDeleteBatch
                     }) {

    const setStatus = () => {
        return "Прошивка";
    };




    return (
        <>

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr className="table-header text-center">
                        <th>#</th>
                        <th>ID Партії</th>
                        <th>Діапазон</th>
                        <th className="d-none d-md-table-cell">Кількість</th>
                        <th className="d-none d-md-table-cell">Тип прошивки</th>
                        <th className="d-none d-md-table-cell">Статус</th>

                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={row.id} className="table-row text-center" onClick={() => onRowClick(row)}>
                            <th>{index + 1}</th>
                            <td>{row.id}</td>
                            <td>
                                {row.ranges?.map((r, i) => (
                                    <div key={i}>
                                        {r.start} - {r.end}
                                    </div>
                                ))}
                            </td>
                            <td className="d-none d-md-table-cell">{row.quantity}</td>
                            <td className="d-none d-md-table-cell">{row.firmware}</td>
                            <td className="d-none d-md-table-cell">{setStatus()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default TableReport;
