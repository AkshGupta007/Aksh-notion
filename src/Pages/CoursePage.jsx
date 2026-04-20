import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { buyCourse } from '../Services/StudentFeaturesApi'
const CoursePage = () => {

    const{courseId}=useParams()
    const {token}=useSelector((state)=>state.auth);
     const { user } = useSelector((state) => state.profile);
     const dispatch=useDispatch();
     const navigate=useNavigate()

    const handlebuy=()=>{

        if(token){
           buyCourse([courseId],token,user,navigate,dispatch)
        }

    }
  return (
    <div className='min-h-screen text-white'>
      hiiii

      <button className='text-white bg-yellow px-2 py-2'
      onClick={()=>handlebuy()}>
        BUY NOW
      </button>
    </div>
  )
}

export default CoursePage


 