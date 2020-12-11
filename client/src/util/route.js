import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";

/** Mapping the _id property of the `user` state to the loggedIn prop
 * @param {user} object
 * @returns Prop object containing loggedIn property set to the value of _id
 */
const mapStateToProps = ({ user: { data: { _id }} }) => ({
  loggedIn: Boolean(_id)
});

/** Wrapper component that prevents rendering components that `only users who are not logged in` should see
 * 
 * @param {props} object
 * @returns if no user is logged in the provided component(s) will be rendered, otherwise redirect back to `/` route 
 */
const Auth = ({ loggedIn, path, component: Component, children, ...props }) => {

  if (Component) {
    return (
      <Route path={path} render={() => (
        loggedIn 
        ?
        <Redirect to='/' />
        :
        <Component {...props} />)} 
      />
    )
  }

  return (
    loggedIn
    ?
    <Redirect to='/' />
    :
    <Route path={path}> { children } </Route>
  )
}

/** Wrapper component ensuring `only logged in users` can view the components passed down
 * 
 * @param {props} object
 * @returns if user is logged in the passed down component(s) will render, otherwise the user will be redirected to `/` 
 */
const Protected = ({ loggedIn, path, component: Component }) => (
  <Route
    path={path}
    render={props => (
      loggedIn ?
      <Component {...props} /> :
      <Redirect to='/' />
    )}
  />
);

export const AuthRoute = withRouter(
  connect(mapStateToProps)(Auth)
);

export const ProtectedRoute = withRouter(
  connect(mapStateToProps)(Protected)
);