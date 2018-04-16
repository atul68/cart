import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/">Item Catalog</Link>

    <nav>
      <Link to="/add">Add Item</Link>
    </nav>
 
    <hr />
  </header>
);

export default Header;
