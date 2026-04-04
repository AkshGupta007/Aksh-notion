import React from 'react'
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import ReactStars from "react-stars";
import { IoTrashBin } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../../../slices/Cartslice';

const Index = () => {

    const dispatch=useDispatch();

    const {cart,totalitems,totalPrice}=useSelector((state)=>state.cart);
  return (
    <div className="text-white">
      <h1> MY WISHLIST</h1>

      <p>{`Total Items: ${totalitems}`}</p>
      <div>
        <div>
          {cart.length > 0 ? (
            <div>
              {cart.map((item, index) => {
                return (
                  <div key={index}>
                    <img
                      src={item?.thumbnail}
                      alt={item?.name}
                      className="w-12 h-12 rounded object-cover"
                    />

                    <div>
                      <p>{item?.coursedescription}</p>
                      <p>{item?.name}</p>

                      <div>
                        <span>4.5</span>
                        <ReactStars
                          count={5}
                          size={20}
                          color2={"#ffd700"}
                          edit={false}
                          fulledIcon={<FaStar />}
                          emptyIcon={<FaRegStarHalfStroke />}
                        />
                        <span>{item?.ratingandreview?.length}</span>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => dispatch(removeItem(item))}
                        className="flex items-center gap-x-2 text-red-500"
                      >
                        <span>
                          <IoTrashBin />
                        </span>
                        <p>REMOVE</p>
                      </button>

                      <p> RS.{item?.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>NO ITEMS IN CART</p>
          )}
        </div>
      </div>

      <div>

        {/* amount rendering */}

        <p> TOTAL :</p>
        <p> RS.{totalPrice}</p>

        <button onClick={() => {
            alert("Payment functionality coming soon!");
        }}>
            BUY NOW
        </button>
      </div>
    </div>
  );
}

export default Index
