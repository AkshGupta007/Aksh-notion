export default function getAvgRating(reviews) {
  if (!reviews?.length) return 0;
  const total = reviews.reduce((sum, { rating }) => sum + rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}
