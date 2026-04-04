// const {instance} = require('../connections/razorpay');
// const user = require('../models/users');
// const course = require('../models/courses');
// const mailsender = require('../utils/sendemail');

// /////// capture the order and initiate razorpay payment

// exports.capturepayment= async(req,res)=>{
//     //// get courseid and userid
//     ///validation of ids and coursedetails
//     //// previous payment check
//     // order create
//     /// return response

//     try{
//         const {courseid}=req.body;
//         const userid= req.user.id;

//         // validare coursedetails
//         let course;
//         course = await course.findbyid(courseid);
//         if(!course){
//             return res.status(404).json({
//                 success:false,
//                 message:"course not found"
//             })
//         }
//         ///// user already enrolled
//         const uid= new moongoose.Types.ObjectId(userid);
//         if(course.studentsenrolled.includes(uid)){
//             return res.status(400).json({
//                 success:false,
//                 message:"user already enrolled in the course"
//             })
//          }

//          //// order create
//          const amount=course.price*100;
//          const currency='INR';

//          const options={
//             amount,
//             currency,
//             recipt:Math.random().toString(),
//             notes:{
//                 courseid,
//                 userid
//             }
//          }
//          ///// intitate payment using razorpat

//          const paymentresponse=await instance.orders.create(options);
//          console.log(paymentresponse);
//          return res.status(200).json({
//             success:true,
//             message:"order created successfully",
//             orderid:paymentresponse.id,
//             coursename:course.coursename,
//             courseprice:course.price

//          })


//         }
    
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"error in creating order",
//             error:error.message
//         })
//     }
// }

// exports.verifysignature=async(req,res)=>{

//         const webhookSecret="123456789";

//         const signature= req.headers['x-razorpay-signature'];

//         const shasum= crypto.createHmac('sha256',webhookSecret);
//         shashum.update(JSON.stringify(req.body));
//         const digest=shasum.digest('hex');

//         if(signature===digest){
//             console.log("payment is legit");

//          try {
//            const { courseid, userid } = req.body.payload.payment.entity.notes;

//            const enrolled = await course.findbyidandupdate(
//              courseid,
//              {
//                $push: {
//                  studentsenrolled: userid,
//                },
//              },
//              { new: true },
//            );
//            if (!enrolled) {
//              return res.status(500).json({
//                success: false,
//                message: "error in enrolling course",
//              });
//            }

//            const courseenrolled = await user.findbyidandupdate(userid, {
//              $push: {
//                courses: courseid,
//              },
//            },{ new: true });
//            if (!courseenrolled) {
//              return res.status(500).json({
//                success: false,
//                message: "error in enrolling course",
//              });
//            }
//            // send mail to user on successful payment

//            const emailresponse = await mailsender(
//              courseenrolled.email,
//              "course enrollment successfull",
//              "congratulations! you have been enrolled in the course" +
//                course.coursename,
//            );
//            console.log(emailresponse);
//            return res.status(200).json({
//              success: true,
//              message: "payment verified and course enrolled successfully",
//            });
//          } catch (error) {
//            return res.status(500).json({
//              success: false,
//              message: "error in verifying signature",
//              error: error.message,
//            });
//          }
//             }
        
      
//     }

    
