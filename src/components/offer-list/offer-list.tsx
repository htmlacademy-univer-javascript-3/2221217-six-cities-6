import { memo } from 'react';
import OfferCard from '../offer-card/offer-card';
import { OfferType } from '../../types/offer';

type OfferListItemProps = {
  offer: OfferType;
  onActiveOfferChange?: (offerId: string | null) => void;
};

function OfferListItem({ offer, onActiveOfferChange }: OfferListItemProps): JSX.Element {
  const handleMouseEnter = () => {
    onActiveOfferChange?.(offer.id);
  };

  const handleMouseLeave = () => {
    onActiveOfferChange?.(null);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <OfferCard {...offer} />
    </div>
  );
}

const MemoizedOfferListItem = memo(OfferListItem);

type OfferListProps = {
  offers: OfferType[];
  onActiveOfferChange?: (offerId: string | null) => void;
};

function OfferList({ offers, onActiveOfferChange }: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <MemoizedOfferListItem
          key={offer.id}
          offer={offer}
          onActiveOfferChange={onActiveOfferChange}
        />
      ))}
    </div>
  );
}

export default memo(OfferList);
