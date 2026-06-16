import React, { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { postCommentAction } from '../../store/action';

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const getRatingTitle = (num: number) => {
    switch (num) {
      case 5:
        return 'perfect';
      case 4:
        return 'good';
      case 3:
        return 'not bad';
      case 2:
        return 'badly';
      case 1:
        return 'terribly';
      default:
        return '';
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!rating || comment.length < 50 || comment.length > 300) {
      return;
    }

    setIsSubmitting(true);
    setHasError(false);

    void dispatch(postCommentAction(offerId, { comment, rating }))
      .then((isSuccess) => {
        if (isSuccess) {
          setRating(0);
          setComment('');
        } else {
          setHasError(true);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const isFormDisabled = isSubmitting;
  const isSubmitDisabled = isSubmitting || !rating || comment.length < 50 || comment.length > 300;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((num) => (
          <React.Fragment key={num}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={num}
              id={`${num}-stars`}
              type="radio"
              checked={rating === num}
              onChange={handleRatingChange}
              disabled={isFormDisabled}
            />
            <label
              htmlFor={`${num}-stars`}
              className="reviews__rating-label form__rating-label"
              title={getRatingTitle(num)}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        disabled={isFormDisabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        {hasError && (
          <p style={{ color: '#ff0000', marginBottom: '10px' }}>
            Failed to submit review. Please try again.
          </p>
        )}
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
