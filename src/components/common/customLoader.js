import React from 'react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

// const types = [
//   'ThreeDots',
//   'Bars',
//   'Circles',
//   'Grid',
//   'Hearts',
//   'Oval',
//   'Puff',
//   'Rings',
//   'TailSpin',
//   'Watch',
//   'RevolvingDot',
//   'Triangle',
//   'Plane',
//   'CradleLoader'
// ];
const LoaderThreeDots = ({ color="#4291EB", type= "ThreeDots", height=150, width=250 }) => (
  <Loader
    style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // minHeight: '280px',
    }}
    type={type}
    color={color}
    height={width}
    width={height}
  />
 );
 

export default LoaderThreeDots;