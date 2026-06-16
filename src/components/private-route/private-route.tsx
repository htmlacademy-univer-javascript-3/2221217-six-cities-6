import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../store/hooks';
import Spinner from '../spinner/spinner';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to="/login" />;
}

export default PrivateRoute;
