import React, { ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
  children?: ReactNode;
  component?: any;
  isLoggedIn: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { component: Component, isLoggedIn, children, ...rest } = props;

  if (!isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }
  return <>{children}</>;

  // return (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       isLoggedIn ? (
  //         <Component {...props}>{children}</Component>
  //       ) : (
  //         <Redirect
  //           to={{
  //             pathname: '/login',
  //             state: { from: props.location },
  //           }}
  //         />
  //       )
  //     }
  //   />
  // );
};
