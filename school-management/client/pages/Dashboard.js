import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            const userData = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
            setUser(userData);
        }
    }, [navigate]);

    return (
        <div>
            <h2>Welcome, {user?.role === "teacher" ? "Teacher" : "Student"}!</h2>
            <p>Email: {user?.email}</p>
        </div>
    );
};

export default Dashboard;
