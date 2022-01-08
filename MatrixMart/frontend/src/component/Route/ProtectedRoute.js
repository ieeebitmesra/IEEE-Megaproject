import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route} from "react-router-dom";
// import { Navigate, Route, Routes, Router } from "react-router-dom";

const ProtectedRoute = ({  component: Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    return (
        <Fragment>
            {loading === false && (
                        <Route
                            {...rest}
                            render={(props) => {
                                if (isAuthenticated === false) {
                                    return <Navigate to="/login" />;
                                }

                                if ( user.role !== "admin") {
                                    return <Navigate to="/login" />;
                                    //   { component: () => <Navigate to="/login" /> }
                                }

                                return <Component {...props} />;
                            }}
                        />
            )}
        </Fragment>
    );
};

export default ProtectedRoute;