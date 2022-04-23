import { NavLink } from "react-router-dom";


function AppHeader() {
    return (
        <nav>
        <NavLink to='/'>Banks</NavLink>
        <NavLink to='/calculator'>Calculator</NavLink>
        </nav>
    )}

export default AppHeader