import { Link } from "react-router-dom";
import RatingStars from "../../Utils/GetRatingstar";

const CourseCard = ({ course, Height = "h-96" }) => {
  const avgReviewCount =
    course?.ratingAndReviews?.reduce((acc, review) => acc + review.rating, 0) /
      (course?.ratingAndReviews?.length || 1) || 0;

  return (
    <div className="p-2 h-">
      <Link to={`/course/${course._id}`}>
        <div className="rounded-xl shadow-md hover:shadow-lg transition">
          <img
            src={course?.thumbnail}
            alt="Course thumbnail"
            className={`${Height} rounded-t-xl object-cover`}
          />
          <div className="p-3">
            <p className="text-lg font-semibold">{course?.courseName}</p>
            <p className="text-sm text-gray-600">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <span><RatingStars reviewCount={avgReviewCount} /></span>
              <span>({course?.ratingAndReviews?.length || 0} Ratings)</span>
            </div>
            <p className="text-blue-600 font-bold mt-2">₹{course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
