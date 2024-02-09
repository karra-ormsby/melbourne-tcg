import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div className="navItems">
            <Link to='/categories'>Categories</Link>
            <Link to='/items'>Items</Link>
            <Link to='/additems'>Add Listing</Link>
        </div>
    );
};

export default Navbar;