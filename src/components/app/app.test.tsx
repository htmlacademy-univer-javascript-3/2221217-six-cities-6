import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { mockFavoriteOffer, mockUser } from '../../mocks/mock-data';
import { createTestStore } from '../../utils/create-test-store';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import MainPage from '../main-page/main-page';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';

function renderWithRouting(
  initialRoute: string,
  authorizationStatus = AuthorizationStatus.NoAuth,
) {
  const api = axios.create();
  const mockApi = new MockAdapter(api);
  mockApi.onGet('/favorite').reply(200, [mockFavoriteOffer]);

  const store = createTestStore({
    user: {
      authorizationStatus,
      user: authorizationStatus === AuthorizationStatus.Auth ? mockUser : null,
    },
  }, api);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

describe('Application routing', () => {
  it('should render main page on root route', () => {
    renderWithRouting('/');

    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('should render login page on /login route', () => {
    renderWithRouting('/login');

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should redirect unauthorized user from favorites to login', () => {
    renderWithRouting('/favorites', AuthorizationStatus.NoAuth);

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should render favorites page for authorized user', async () => {
    renderWithRouting('/favorites', AuthorizationStatus.Auth);

    expect(await screen.findByText('Saved listing')).toBeInTheDocument();
  });

  it('should render 404 page for unknown route', () => {
    renderWithRouting('/unknown-route');

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
