import FindBatchInputSerial from "./FindBatchInput.jsx";


function TableReport({
                         filteredData,
                         onRowClick,
                         searchSerial,
                         setSearchSerial,
                         handleSerialSearch,
                         handleClearSearch,
                         onDeleteBatch
                     }) {
    const setStatus = () => {
        return "Прошивка";
    };

    function handleEdit(row) {
        console.log(row);
    }


    return (
        <>
            <FindBatchInputSerial
                searchSerial={searchSerial}
                setSearchSerial={setSearchSerial}
                handleSerialSearch={handleSerialSearch}
                handleClearSearch={handleClearSearch}
            />

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
                        <th></th>
                        <th></th>
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
                            <td>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(row);
                                }} className="border-0 bg-transparent p-0" aria-label="Редагувати">
                                    <i className="bi bi-feather fs-5" title="Редагувати"></i>
                                </button>
                            </td>
                            <td>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteBatch(row);

                                }} className="border-0 bg-transparent p-0" style={{color: 'red'}} aria-label="Видалити">
                                    <i className="bi bi-trash fs-5" title="Видалити"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default TableReport;
