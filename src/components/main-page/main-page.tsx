import { useCallback } from 'react';
import CitiesList from '../cities-list/cities-list';
import Header from '../header/header';
import Spinner from '../spinner/spinner';
import MainPageContent from './main-page-content';
import { CITIES } from '../../const';
import { changeCity } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCity, getOffersDataLoading } from '../../store/selectors';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector(getCity);
  const isOffersDataLoading = useAppSelector(getOffersDataLoading);

  const handleCityClick = useCallback((selectedCity: string) => {
    dispatch(changeCity(selectedCity));
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <Header isMainPage />

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
              <MainPageContent />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
