import { NavLink } from "react-router-dom";

import Menu from '@mui/material/Menu';

function AppHeader() {
  <Menu/>
    
    
    return (
        <nav>
        <NavLink to='/'>Banks</NavLink>
        <NavLink to='/calculator'>Calculator</NavLink>
        </nav>
    )}

export default AppHeader