import React, { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../context/user.context";
import './navigation.styles.scss'

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
      <div className="navigation">

        <Link className="logo-container" to='/'>
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>
            SHOP
          </Link>
          {
            currentUser ? (
              <Link className="nav-link" to='/auth' onClick={signOutHandler}>
                SIGN OUT
              </Link>
            ) : (
              <Link className="nav-link" to='/auth'>
                SIGN IN
              </Link>
            )}
        </div>

      </div>

      <Outlet />
    </Fragment>
  )
}

export default Navigation;