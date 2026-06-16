import { memo, useCallback } from 'react';
import classNames from 'classnames';

type CitiesListProps = {
  cities: string[];
  activeCity: string;
  onCityClick: (city: string) => void;
};

function CitiesList({ cities, activeCity, onCityClick }: CitiesListProps): JSX.Element {
  const handleCityClick = useCallback((evt: React.MouseEvent<HTMLAnchorElement>, city: string) => {
    evt.preventDefault();
    onCityClick(city);
  }, [onCityClick]);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li key={city} className="locations__item">
            <a
              className={classNames('locations__item-link', 'tabs__item', {
                'tabs__item--active': city === activeCity,
              })}
              href="#"
              onClick={(evt) => handleCityClick(evt, city)}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(CitiesList);
