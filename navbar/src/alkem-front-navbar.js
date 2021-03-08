import { useStyles } from '@alkem/front-project-config/react-utils';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.css';

function NavbarLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className="NavbarLink"
      activeClassName="NavbarLink--selected"
      exact
    >
      {children}
    </NavLink>
  );
}

function Navbar() {
  useStyles(styles);
  return (
    <nav className="Navbar">
      <NavbarLink to="/">Home</NavbarLink>
      <NavbarLink to="/products">Catalog</NavbarLink>
    </nav>
  );
}

export const component = () => Navbar;
