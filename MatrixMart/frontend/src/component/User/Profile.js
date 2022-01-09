import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {//bug to be fixed
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`} />
                    <div className="profileContainer">
                        <div className="div2">
                            <div>
                                <h4>FULL NAME</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>EMAIL</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>JOINED ON</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>

                            <div>
                                <Link to="/orders">MY ORDERS</Link>
                                <Link to="/password/update">CHANGE PASSWORD</Link>
                            </div>
                        </div>
                        <div className="div1">
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/me/update">EDIT PROFILE</Link>
                        </div>

                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;