import { NavLink } from "react-router-dom";

import s from './AppBar.module.scss'

function AppBar() {
    return (
        <div className={s.navigation}>
        <NavLink className={s.link} activeClassName={s.active} to='/' exact>Banks</NavLink>
        <NavLink className={s.link} activeClassName={s.active} to='/calculator'>Calculator</NavLink>
        </div>
    )}

export default AppBar