import { useState, useEffect } from "react";
import { UserContext } from "./userContext.js";

const storedUser = localStorage.getItem("user");

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        localStorage.setItem("user", user ? JSON.stringify(user) : "");
    }, [user]);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
