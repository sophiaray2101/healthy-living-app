import React from "react";
import { useUser } from "../../UserContext";
import {Link} from 'react-router-dom';

import './Navbar.css';

function Navbar() {

    const {username} = useUser();

    return (
        <header className="page-header">
            <h3 class="page-title">Healthy Living FAQs</h3>
            <ul class="nav-bar">
              <li class="nav-bar-item">Welcome, {username}<Link to="/">Log Out</Link></li>
            </ul>
          </header>
      )
}

export default Navbar;