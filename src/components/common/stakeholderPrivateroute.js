
import React from "react"
import { navigate } from "@reach/router"
import { connect } from 'react-redux'

const mapStateToProps = ({ user }) => ({ user });

const StakeholderPrivateRoute = ({ component: Component, user }) => {
    const [isLoggedIn, setLoginIn] = React.useState(false);
    // const redirectLink = () => {
    //     if (user.user.Role.roleName === 'stakeholder') {
    //       navigate("/stakeholders/");
    //     } else {
    //       navigate("/dashboard/projects");
    //     }
    //   }
    React.useEffect(() => {
        if (user.user.Role.roleName === 'stakeholder') {
            setLoginIn(true);
        } else {
            setLoginIn(false);
        }
    });

    if (!isLoggedIn) {
        navigate("/")
    }
    return <Component />
}


export default connect(mapStateToProps)(StakeholderPrivateRoute);
