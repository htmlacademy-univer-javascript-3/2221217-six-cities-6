import { ReviewType } from '../types/review';

const MAX_REVIEWS_COUNT = 10;

export function getSortedReviews(reviews: ReviewType[]): ReviewType[] {
  return [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEWS_COUNT);
}
