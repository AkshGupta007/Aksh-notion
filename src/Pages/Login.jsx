import React from 'react'
import Template from '../components/core/Template'
import gif from "../assests/OIP.jpeg"

const Login = () => {
  return (
    <div>
      <Template heading={"Welcome Back"} 
      description1={"discover your passions"}
      description2={"be gratefull"}
      image={gif}
      />
    </div>
  );
}

export default Login
