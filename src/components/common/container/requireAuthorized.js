// import React from 'react';
// // import {browserHistory} from 'react-router';

// //This function receives the Component that only some user should access
// export default function requireAuthorized(ComposedComponent){

//   class Authenticated extends React.Component {

//     componentWillMount(){
//         console.log('object', this.props)
//     }

//     render(){
//       return <ComposedComponent />;
//     }
//   }
//   //Return the new Component that requires authorization
//   return Authenticated;
// }

import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function requireAuthorized(ComposedComponent) {
console.log("ComposedComponent", ComposedComponent)
  class Authentication extends Component {
    componentDidMount() {
        console.log('this.props', this.props)
    //   if (!this.props.authorized.auth) {
    //     this.props.tokenAuthentication();
    //   }
    }

    // componentDidUpdate(prevProps) {
    //   if (!this.props.authorized.auth) {
    //     prevProps.tokenAuthentication();
    //   }
    // }

    render() {
        return <ComposedComponent {...this.props} />;
    }
  }
  
  return Authentication;
}
