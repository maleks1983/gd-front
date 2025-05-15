import {useUser} from "../../hooks/useUser.js";


function UserDetail() {
    const user = useUser();
    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <h2>id: {user?.id}</h2>
                <h3>Вітаю, {user?.name}</h3>
                <p>Телефон: +380{user?.tel}</p>
            </div>

        </>)
}

export default UserDetail