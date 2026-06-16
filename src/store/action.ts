import { AxiosInstance } from 'axios';
import { Dispatch } from 'redux';
import { AuthorizationStatus } from '../const';
import { OfferType } from '../types/offer';
import { LoginData, UserType } from '../types/user';
import { dropToken, getToken, saveToken } from '../services/api';
import { State } from './reducer';

export enum ActionType {
  ChangeCity = 'CHANGE_CITY',
  FillOffers = 'FILL_OFFERS',
  SetOffersDataLoading = 'SET_OFFERS_DATA_LOADING',
  SetAuthorizationStatus = 'SET_AUTHORIZATION_STATUS',
  SetUser = 'SET_USER',
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity;
  payload: string;
};

export type FillOffersAction = {
  type: ActionType.FillOffers;
  payload: OfferType[];
};

export type SetOffersDataLoadingAction = {
  type: ActionType.SetOffersDataLoading;
  payload: boolean;
};

export type SetAuthorizationStatusAction = {
  type: ActionType.SetAuthorizationStatus;
  payload: AuthorizationStatus;
};

export type SetUserAction = {
  type: ActionType.SetUser;
  payload: UserType | null;
};

export type Action =
  | ChangeCityAction
  | FillOffersAction
  | SetOffersDataLoadingAction
  | SetAuthorizationStatusAction
  | SetUserAction;

export const changeCity = (city: string): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});

export const fillOffers = (offers: OfferType[]): FillOffersAction => ({
  type: ActionType.FillOffers,
  payload: offers,
});

export const setOffersDataLoading = (isOffersDataLoading: boolean): SetOffersDataLoadingAction => ({
  type: ActionType.SetOffersDataLoading,
  payload: isOffersDataLoading,
});

export const setAuthorizationStatus = (authorizationStatus: AuthorizationStatus): SetAuthorizationStatusAction => ({
  type: ActionType.SetAuthorizationStatus,
  payload: authorizationStatus,
});

export const setUser = (user: UserType | null): SetUserAction => ({
  type: ActionType.SetUser,
  payload: user,
});

export const fetchOffersAction = () =>
  async (
    dispatch: Dispatch<Action>,
    _getState: () => State,
    api: AxiosInstance,
  ): Promise<void> => {
    dispatch(setOffersDataLoading(true));
    try {
      const { data } = await api.get<OfferType[]>('/offers');
      dispatch(fillOffers(data));
    } finally {
      dispatch(setOffersDataLoading(false));
    }
  };

export const checkAuthAction = () =>
  async (
    dispatch: Dispatch<Action>,
    _getState: () => State,
    api: AxiosInstance,
  ): Promise<void> => {
    const token = getToken();

    if (!token) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      return;
    }

    try {
      const { data } = await api.get<UserType>('/login');
      dispatch(setUser(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setUser(null));
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  };

export const loginAction = ({ email, password }: LoginData) =>
  async (
    dispatch: Dispatch<Action>,
    _getState: () => State,
    api: AxiosInstance,
  ): Promise<boolean> => {
    try {
      const { data } = await api.post<UserType>('/login', { email, password });
      saveToken(data.token);
      dispatch(setUser(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      return true;
    } catch {
      return false;
    }
  };

export const logoutAction = () =>
  async (
    dispatch: Dispatch<Action>,
    _getState: () => State,
    api: AxiosInstance,
  ): Promise<void> => {
    try {
      await api.delete('/logout');
    } catch {
      // Log out locally even if the request fails.
    } finally {
      dropToken();
      dispatch(setUser(null));
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  };
