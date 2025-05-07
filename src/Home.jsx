import { useUser } from './UserContext';

function Home() {
    const { user } = useUser();
    function TableReport(){
        return <>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>

            </table>
        </>
    }

    return (
        <div className="h-100">
            <div className="container d-flex flex-column h-100">
                <div className="d-flex flex-column align-items-center">
                    <h2>id: {user?.id}</h2>
                    <h3>Вітаю, {user?.name}</h3>
                    <p>Телефон: +380{user?.tel}</p>

                </div>
                <div className="flex-grow-1 flex-fill">
                    <h3 className="text-center pt-3">Виконання за день</h3>
                    <TableReport />
                </div>



            </div>

        </div>
    );
}

export default Home;
