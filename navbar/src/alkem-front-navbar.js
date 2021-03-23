import { CssLoader } from '@alkem/front-project-config/react-utils';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

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
  return (
    <CssLoader elemType="nav">
      <NavbarLink to="/">Home</NavbarLink>
      <NavbarLink to="/products">Catalog</NavbarLink>
    </CssLoader>
  );
}

export const component = () => Navbar;
