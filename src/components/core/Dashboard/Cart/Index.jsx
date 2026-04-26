import React from "react";
import ReactStars from "react-stars";
import { IoTrashBin } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../../../slices/Cartslice";
import { buyCourse } from "../../../../Services/StudentFeaturesApi";
import { useNavigate } from "react-router";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cart, totalitems, totalPrice } = useSelector((state) => state.cart);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10 md:px-10 lg:px-20">
      {/* ── Header ── */}
      <div className="mb-10 border-b border-white/10 pb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-yellow-400 mb-1">
          My Learning
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          My Wishlist
        </h1>
        <p className="mt-2 text-sm text-white/40">
          {totalitems} {totalitems === 1 ? "course" : "courses"} saved
        </p>
      </div>

      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── Cart Items ── */}
          <div className="flex-1 flex flex-col gap-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 md:gap-5 items-start bg-white/5 hover:bg-white/[0.07] transition-colors duration-200 border border-white/10 rounded-2xl p-4 md:p-5"
              >
                {/* Thumbnail */}
                <img
                  src={item?.thumbnail}
                  alt={item?.name}
                  className="w-24 h-16 rounded-xl object-cover shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium tracking-widest uppercase text-yellow-400 truncate mb-1">
                    {item?.coursedescription}
                  </p>
                  <p className="text-white font-semibold text-base leading-snug truncate">
                    {item?.name}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-semibold text-yellow-400">
                      4.5
                    </span>
                    <ReactStars
                      count={5}
                      value={4.5}
                      size={14}
                      color2={"#facc15"}
                      color1={"rgba(255,255,255,0.15)"}
                      edit={false}
                      half={true}
                    />
                    <span className="text-xs text-white/35">
                      ({item?.ratingandreview?.length ?? 0} reviews)
                    </span>
                  </div>
                </div>

                {/* Price + Remove */}
                <div className="shrink-0 flex flex-col items-end justify-between gap-3 self-stretch">
                  <p className="text-white font-bold text-lg">
                    ₹{item?.price?.toLocaleString("en-IN")}
                  </p>
                  <button
                    onClick={() => dispatch(removeItem(item))}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200"
                  >
                    <IoTrashBin />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order Summary ── */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sticky top-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-5">
              Order Summary
            </p>

            <div className="flex flex-col gap-3 mb-5 text-sm">
              <div className="flex justify-between text-white/55">
                <span>
                  {totalitems} {totalitems === 1 ? "course" : "courses"}
                </span>
                <span className="text-white">
                  ₹{totalPrice?.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-white/55">
                <span>Platform fee</span>
                <span className="text-green-400">Free</span>
              </div>
            </div>

            <div className="h-px bg-white/10 mb-5" />

            <div className="flex justify-between items-baseline mb-6">
              <span className="text-white font-semibold">Total</span>
              <span className="text-3xl font-bold text-yellow-400">
                ₹{totalPrice?.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={() => buyCourse([cart], token, user, navigate, dispatch)}
              className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-widest uppercase text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/25 active:scale-[0.98]"
            >
              Buy Now
            </button>

            <p className="text-center text-xs text-white/25 mt-4">
              Secure checkout · Instant access
            </p>
          </div>
        </div>
      ) : (
        /* ── Empty State ── */
        <div className="flex flex-col items-center justify-center py-28 gap-5 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl bg-yellow-400/10 border border-yellow-400/20">
            🛒
          </div>
          <div>
            <p className="text-2xl font-semibold text-white mb-2">
              Your wishlist is empty
            </p>
            <p className="text-sm text-white/35">
             GO TO HOMEPAGE
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 transition-all duration-200"
          >
            Explore Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
