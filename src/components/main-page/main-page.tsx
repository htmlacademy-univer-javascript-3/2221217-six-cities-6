import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import SortOptions from '../sort-options/sort-options';
import Spinner from '../spinner/spinner';
import { AuthorizationStatus, CITIES, CITY_COORDINATES } from '../../const';
import { changeCity, logoutAction } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSortedOffers, SortType } from '../../utils/sorting';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [activeSorting, setActiveSorting] = useState<SortType>(SortType.Popular);

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const favoriteOffersCount = allOffers.filter((offer) => offer.isFavorite).length;

  const filteredOffers = useMemo(
    () => allOffers.filter((offer) => offer.city.name === city),
    [allOffers, city]
  );

  const sortedOffers = useMemo(
    () => getSortedOffers(filteredOffers, activeSorting),
    [filteredOffers, activeSorting]
  );

  const offersCount = filteredOffers.length;

  const cityLocation = filteredOffers.length > 0
    ? filteredOffers[0].city
    : {
      name: city,
      location: CITY_COORDINATES[city],
    };

  const handleCityClick = (selectedCity: string) => {
    dispatch(changeCity(selectedCity));
  };

  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                        <div
                          className="header__avatar-wrapper user__avatar-wrapper"
                          style={{ backgroundImage: `url(${user.avatarUrl})` }}
                        >
                        </div>
                        <span className="header__user-name user__name">{user.email}</span>
                        <span className="header__favorite-count">{favoriteOffersCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={(evt) => {
                        evt.preventDefault();
                        handleSignOut();
                      }}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/login">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList
            cities={CITIES}
            activeCity={city}
            onCityClick={handleCityClick}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {isOffersDataLoading ? (
              <Spinner />
            ) : (
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offersCount} places to stay in {city}</b>
                  <SortOptions
                    activeSorting={activeSorting}
                    onSortingChange={setActiveSorting}
                  />
                  <OfferList
                    offers={sortedOffers}
                    onActiveOfferChange={setActiveOfferId}
                  />
                </section>
                <div className="cities__right-section">
                  <Map
                    city={cityLocation}
                    offers={sortedOffers}
                    activeOfferId={activeOfferId}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
