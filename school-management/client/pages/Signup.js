import { useState } from "react";
import { register } from "../api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "student" });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("User registered successfully!");
            navigate("/login");
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <select name="role" onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
