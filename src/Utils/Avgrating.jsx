export default function getAvgRating(ratings) {
  if (!ratings?.length) return 0;

  const total = ratings.reduce((sum, { rating }) => sum + rating, 0);
  return Math.round((total / ratings.length) * 10) / 10;
}
