// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//     const navigate = useNavigate();

    
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     };

//     return (
//         <nav>
//             <Link to="/">Home</Link>
//             <Link to="/dashboard">Dashboard</Link>
//             {localStorage.getItem("token") ? (
//                 <button onClick={handleLogout}>Logout</button>
//             ) : (
//                 <>
//                     <Link to="/login">Login</Link>
//                     <Link to="/signup">Signup</Link>
//                 </>
//             )}
//         </nav>
//     );
// };

// export default Navbar;
