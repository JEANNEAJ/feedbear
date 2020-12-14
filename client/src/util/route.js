import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";

/** Mapping the _id property of the `user` state to the loggedIn prop
 * @param {user} object
 * @returns Prop object containing loggedIn property set to the value of _id
 */
const mapStateToProps = ({ user: { isLoggedIn} }) => ({
  isLoggedIn
});

/** Wrapper component that prevents rendering components that `only users who are not logged in` should see
 * 
 * @param {props} object
 * @returns if no user is logged in the provided component(s) will be rendered, otherwise redirect back to `/` route 
 */
const Auth = ({ isLoggedIn, path, component: Component, ...props }) => (
  isLoggedIn
    ? <Redirect to='/' />
    : Component 
      ? <Route path={path} render={() => <Component {...props} />} />
      : <Route path={path}> { props.children } </Route>
);

/** Wrapper component ensuring `only logged in users` can view the components passed down
 * 
 * @param {props} object
 * @returns if user is logged in the passed down component(s) will render, otherwise the user will be redirected to `/` 
 */
const Protected = ({ isLoggedIn, path, component: Component, ...props }) => (
  isLoggedIn
    ? Component 
      ? <Route path={path} render={() => <Component {...props} />} />
      : <Route path={path}> { props.children } </Route>
    : <Redirect to='/' />
);

export const AuthRoute = withRouter(
  connect(mapStateToProps)(Auth)
);

export const ProtectedRoute = withRouter(
  connect(mapStateToProps)(Protected)
);