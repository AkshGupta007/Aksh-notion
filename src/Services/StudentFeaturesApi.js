import { toast } from "react-toastify";
import { apiconnector } from "./apiconnector";
import { setPaymentLoading } from "../slices/Courseslice";
import { resetcart } from "../slices/Cartslice";
import{ORDER_RESPONSE_API,COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API,SEND_CONTACT_US_QUERY_API} from "./apis"

// router.post("/capturepayment", Authorization, isstudent, capturepayment);
// router.post("/verifysignature", isstudent, verifyPayment);
// router.post("/sendpaymentemail", isstudent, sendPaymentSuccessEmail);



function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function buyCourse(
  courses,
  token,
  userDetails,
  navigate,
  dispatch,
) {
  const toastId = toast.loading("Loading...");
  try {
    // Load Razorpay checkout script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    // Create order on backend
    const orderResponse = await apiconnector(
      "POST",
      ORDER_RESPONSE_API,
      { courses },
      { Authorization: `Bearer ${token}` },
    );

    /// Razorpay checkout options

    console.log("order response", orderResponse);
    console.log("RAZORPAY KEY:", process.env.REACT_APP_RAZORPAY_KEY);

   const options = {
     key: process.env.REACT_APP_RAZORPAY_KEY,
     currency: orderResponse.data.message.currency,
     amount: orderResponse.data.message.amount,
     order_id: orderResponse.data.message.id,

      method: {
        upi: true,
      },

    //  method: {
    //    upi: true,
    //    card: true, // domestic cards only
    //    netbanking: true,
    //    wallet: true,
    //    emi: false,
    //  },

    //  config: {
    //    display: {
    //      blocks: {
    //        banks: {
    //          name: "Pay via UPI or Card",
    //          instruments: [
    //            { method: "upi" },
    //            { method: "card" },
    //            { method: "netbanking" },
    //          ],
    //        },
    //      },
    //      sequence: ["block.banks"],
    //      preferences: { show_default_blocks: false },
    //    },
    //  },
     name: "AKshNotion",
     description: "Thank you for purchasing the course",

     prefill: {
       name: userDetails.firstName,
       email: userDetails.email,
     },
     handler: function (response) {
       sendPaymentSuccessEmail(
         response,
         orderResponse.data.message.amount,
         token,
       );
       verifyPayment({ ...response, courses }, token, navigate, dispatch);
     },
     theme: { color: "#0d6efd" },
   };

   const paymentOption = new window.Razorpay(options);

   paymentOption.open();

   paymentOption.on("payment.failed", function (response) {
     toast.error("Oops, payment failed");
     console.log(response.error);
   })
  } catch (error) {
    console.error("BUY COURSE ERROR:", error);
    toast.error("Something went wrong");
  } finally {
    toast.dismiss(toastId);
  }
}

// send payment success email
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiconnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` },
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR...", error);
  }
}

// verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiconnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    console.log("very payment response",response);

    toast.success("Payment successful, you are added to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetcart());
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR...", error);
    toast.error("Payment verification failed");
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}



export const sendcontactusquery= async(formData)=>{
  const toastId = toast.loading("Sending your query...");
  try {
    const response = await apiconnector("POST", SEND_CONTACT_US_QUERY_API, formData,{})
    toast.success("Your query has been sent successfully!");
    return response.data;
  } catch (error) {
    console.error("SEND CONTACT US QUERY ERROR...", error);
    toast.error("Failed to send your query. Please try again.");
  } finally {
    toast.dismiss(toastId);
  }
}