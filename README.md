📚 StudyNotion — Ed-Tech Learning Platform

<img width="1918" height="1000" alt="image" src="https://github.com/user-attachments/assets/2421db29-e90e-4446-8f03-ffa8ddda3815" />


A full-stack ed-tech platform where instructors can create and sell courses, and students can enroll, learn, and track their progress.

🌐 Live Demo: https://aksh-notion-vwjg.vercel.app
🔗 Backend API: https://aksh-notion-3.onrender.com

📋 Table of Contents

About the Project
Features
Tech Stack
System Architecture
Getting Started
Environment Variables
API Endpoints
Screenshots
Contact


🧠 About the Project
StudyNotion is a fully functional ed-tech platform inspired by Udemy/Coursera. It supports two types of users:

Students — Browse, enroll in, and watch courses. Track progress with a visual progress bar.
Instructors — Create courses with sections and lectures, upload videos via Cloudinary, and earn through Razorpay payments.

Built as a major full-stack project using the MERN stack, it implements real-world features like JWT authentication, OTP verification, cloud media storage, and payment integration.

✨ Features
👨‍🎓 Student

Sign up / Login with OTP email verification
Browse and search courses
Enroll in courses via Razorpay payment gateway
Watch lecture videos with progress tracking
View enrolled courses with completion percentage
Edit profile and upload profile picture

👨‍🏫 Instructor

Create, edit, and delete courses
Add sections and subsections (lectures) with video uploads
Manage course content via a drag-and-drop style builder
View enrolled students and course analytics
Dashboard with earnings overview

🔐 Auth

JWT-based authentication with cookie storage
OTP-based email verification on signup
Password reset via email
Protected routes for students and instructors


🛠 Tech Stack
Frontend
TechnologyUsageReact 19UI libraryRedux ToolkitState managementReact Router v7Client-side routingTailwind CSSStylingAxiosAPI callsReact Hook FormForm handlingFramer MotionAnimationsReact ToastifyNotificationsChart.jsInstructor analyticsSwiper.jsCourse carousels
Backend
TechnologyUsageNode.jsRuntimeExpress.js v5Web frameworkMongoDB + MongooseDatabaseJWTAuthenticationBcryptPassword hashingNodemailerEmail (OTP, reset)CloudinaryVideo/image storageRazorpayPayment gatewayExpress FileUploadFile handling

🏗 System Architecture
┌─────────────────────┐         ┌─────────────────────┐
│                     │  HTTPS  │                     │
│   React Frontend    │ ──────► │  Express Backend     │
│   (Vercel)          │         │  (Render)            │
│                     │◄─────── │                     │
└─────────────────────┘  JSON   └──────────┬──────────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
           ┌────────▼───────┐   ┌──────────▼──────┐   ┌─────────▼────────┐
           │   MongoDB       │   │   Cloudinary    │   │    Razorpay      │
           │   Atlas         │   │   (Media)       │   │   (Payments)     │
           └────────────────┘   └─────────────────┘   └──────────────────┘

🚀 Getting Started
Prerequisites

Node.js v18+
MongoDB Atlas account
Cloudinary account
Razorpay account
Gmail account (for Nodemailer)

Clone the repository
bashgit clone https://github.com/AkshGupta007/Aksh-notion.git
cd Aksh-notion
Install frontend dependencies
bashnpm install
Install backend dependencies
bashcd server
npm install
Run locally
bash# From root directory — runs both frontend and backend
npm run dev
Frontend runs on http://localhost:3000
Backend runs on http://localhost:4000

🔐 Environment Variables
Frontend (.env in root)
envREACT_APP_BASE_URL=http://localhost:4000/api
Backend (.env in /server)
envMONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER_NAME=your_folder_name

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

MAIL_HOST=smtp.gmail.com
USER=your_email@gmail.com
PASSWORD=your_app_password

FRONTEND_URL=http://localhost:3000

📡 API Endpoints
Auth Routes /api/user
MethodEndpointDescriptionPOST/signupRegister new userPOST/loginLogin userPOST/sendotpSend OTP to emailPOST/changepasswordChange password
Course Routes /api/course
MethodEndpointDescriptionGET/getAllCoursesFetch all coursesGET/getCourseDetails/:idGet course detailsPOST/createCourseCreate new coursePUT/editCourseEdit courseDELETE/deleteCourseDelete coursePOST/addSectionAdd sectionPOST/addSubSectionAdd lecture
Profile Routes /api/profile
MethodEndpointDescriptionGET/getUserDetailsGet user profilePUT/updateProfileUpdate profilePUT/updateDisplayPictureUpdate avatarGET/getEnrolledCoursesGet enrolled courses
Payment Routes /api/payment
MethodEndpointDescriptionPOST/capturePaymentInitiate Razorpay orderPOST/verifyPaymentVerify payment signature

📸 Screenshots

<img width="1897" height="987" alt="image" src="https://github.com/user-attachments/assets/a2ce5656-e1a2-4c0e-8403-ab5d75b8b239" />

<img width="1867" height="1007" alt="image" src="https://github.com/user-attachments/assets/abe1a439-2f7b-48e8-bbe6-7ed86fa0db6d" />

<img width="1903" height="945" alt="image" src="https://github.com/user-attachments/assets/a7223e3e-b980-409e-b045-cf2e4d45e45c" />

<img width="1881" height="995" alt="image" src="https://github.com/user-attachments/assets/8fe8bf5a-cd8a-4eb7-9184-c341a0bd7342" />





Home PageCourse PageShow ImageShow Image


🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

Fork the repository
Create your branch: git checkout -b feature/your-feature
Commit your changes: git commit -m 'Add some feature'
Push to the branch: git push origin feature/your-feature
Open a Pull Request


👤 Contact
Aksh Gupta
GitHub: @AkshGupta007
Live Project: https://aksh-notion-vwjg.vercel.app

⭐ If you found this project helpful, please give it a star on GitHub!
