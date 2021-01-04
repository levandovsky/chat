import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface ProtectedRouteProps extends RouteProps {
  condition: boolean;
}

const ProtectedRoute = ({
  component,
  condition,
  path,
  ...rest
}: ProtectedRouteProps) => {
  const componentToRender = (props: any) => (
    <Route component={component} {...props} />
  );

  return condition ? (
    <Route path={path} {...rest} render={componentToRender} />
  ) : (
    <Redirect from={path as string} to="/sign-in" />
  );
};

export default ProtectedRoute;
