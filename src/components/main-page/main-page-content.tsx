import { memo, useCallback, useState } from 'react';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import SortOptions from '../sort-options/sort-options';
import { useAppSelector } from '../../store/hooks';
import {
  getCity,
  getCityLocation,
  getOffersCountByCity,
  getSortedOffersByCity,
} from '../../store/selectors';
import { SortType } from '../../utils/sorting';

function MainPageContent(): JSX.Element {
  const city = useAppSelector(getCity);
  const offersCount = useAppSelector(getOffersCountByCity);
  const cityLocation = useAppSelector(getCityLocation);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [activeSorting, setActiveSorting] = useState<SortType>(SortType.Popular);
  const sortedOffers = useAppSelector((state) => getSortedOffersByCity(state, activeSorting));

  const handleActiveOfferChange = useCallback((offerId: string | null) => {
    setActiveOfferId(offerId);
  }, []);

  return (
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
          onActiveOfferChange={handleActiveOfferChange}
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
  );
}

export default memo(MainPageContent);
