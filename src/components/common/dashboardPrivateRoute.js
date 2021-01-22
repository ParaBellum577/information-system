
import React from "react"
import { navigate } from "@reach/router"
import { connect } from 'react-redux'

const mapStateToProps = ({ user }) => ({ user });

const DashboardPrivateRoute = ({ component: Component, user }) => {
    const [isLoggedIn, setLoginIn] = React.useState(true);
    console.log("🚀 ~ file: dashboardPrivateRoute.js ~ line 10 ~ DashboardPrivateRoute ~ isLoggedIn", isLoggedIn)
    // const redirectLink = () => {
    //     if (user.user.Role.roleName === 'stakeholder') {
    //       navigate("/stakeholders/");
    //     } else {
    //       navigate("/dashboard/projects");
    //     }
    //   }
    React.useEffect(() => {
        if (Object.keys(user.user).length !== 0 && user.user.Role.roleName === 'stakeholder') {
            setLoginIn(false);
        } else {
            setLoginIn(true);
        }
    }, [user]);

    if (!isLoggedIn) {
        navigate("/")
    }
    return <Component />
}


export default connect(mapStateToProps)(DashboardPrivateRoute);
