import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";
import { useEffect, useState } from "react";

function RatingStars({ reviewCount, starSize = 20 }) {
  const [stars, setStars] = useState({ full: 0, half: 0, empty: 0 });

  useEffect(() => {
    // console.log("reviewCount in RatingStars:", reviewCount);
    const full = Math.floor(reviewCount) || 0;
    const half = Number.isInteger(reviewCount) ? 0 : 1;
    const empty = 5 - full - half;
    setStars({ full, half, empty });
  }, [reviewCount]);

  return (
    <div className="flex gap-1 text-yellow-400">
      {Array.from({ length: stars.full }, (_, i) => (
        <TiStarFullOutline key={`full-${i}`} size={starSize} />
      ))}
      {Array.from({ length: stars.half }, (_, i) => (
        <TiStarHalfOutline key={`half-${i}`} size={starSize} />
      ))}
      {Array.from({ length: stars.empty }, (_, i) => (
        <TiStarOutline key={`empty-${i}`} size={starSize} />
      ))}
    </div>
  );
}

export default RatingStars;
