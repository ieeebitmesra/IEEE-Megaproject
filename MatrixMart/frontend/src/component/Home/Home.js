import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import MetaData from "../layout/MetaData";
import "./Home.css";
import Product from './ProductCard.js';
import Loader from "../layout/Loader/Loader.js";
import { clearErrors, getProduct } from '../../actions/productAction.js';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'
import Typewriter from "typewriter-effect";
import { Link } from 'react-router-dom'
import Carousel from "react-material-ui-carousel";

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.user);

    const {
        products,
        loading,
        error,
    } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert])

    return (
        <Fragment>
            {loading ? (
                <Loader />
                // "loading..."
            ) : (
                <Fragment>
                    <MetaData title="MatrixMart" />
                    <div className="home-background">

                        {!isAuthenticated && <Link to="/login">
                            <div className="login-option-home">
                                <div>
                                    LOGIN | SIGNUP
                                </div>
                            </div>
                        </Link>}

                        <div className="icon-bar">
                            <a href="https://twitter.com/Mayankesh_"><i class="fa fa-twitter"></i></a>
                            <a href="https://www.linkedin.com/in/mayankesh-jha-15446b206"><i class="fa fa-linkedin"></i></a>
                            <a href="https://github.com/mayankesh239"><i class="fa fa-github"></i></a>
                            <a href="https://www.facebook.com/mayankesh.jha"><i class="fa fa-facebook"></i></a>
                            <a href="https://www.instagram.com/mayankesh__/"><i class="fa fa-instagram"></i></a>
                        </div>


                        <div className="banner">
                            <p> <Typewriter
                                options={{
                                    strings: ['WELCOME TO MATRIX MART', 'TIME TO BE SHOPAHOLIC'],
                                    autoStart: true,
                                    loop: true,
                                }}
                            /></p>

                            <br />
                            <div id="animation-container1">
                                <div>
                                    BUY
                                </div>
                                <div id="flip">
                                    <div><div>AMAZING</div></div>
                                    <div><div>AFFORDABLE</div></div>
                                    <div><div>QUALITY</div></div>
                                </div>
                                <div>
                                    PRODUCTS!
                                </div>
                            </div>

                            <a href="#container">
                                <button>
                                    LET'S GO <CgMouse />
                                </button>
                            </a>

                        </div>

                        <h2 className="homeHeading">FEATURED PRODUCTS</h2>

                        <Link to={"/Search"}>
                            <div className="searchBox1">
                                <input
                                    type="text"
                                    placeholder="Search a Product ..."
                                />
                                <input type="submit" value="Search" />
                            </div>
                        </Link>


                        <div className="container" id="container">
                            {products &&
                                products.map((product) => (
                                    <Product product={product} />
                                ))}
                        </div>

                        <h2 className="homeHeading">BEST DEALS</h2>

                        <Carousel>
                            <img
                                className="CarouselImageSection"
                                key="1"
                                src={"https://res.cloudinary.com/mayankesh/image/upload/v1640451469/products/gt6a97ztrryqlip1fwrl.webp"}
                                alt="Slide1"
                            />
                            <img
                                className="CarouselImageSection"
                                key="2"
                                src={"https://res.cloudinary.com/mayankesh/image/upload/v1640525902/products/jpf8f67pl0ykcainfubl.jpg"}
                                alt="Slide2"
                            />
                            <img
                                className="CarouselImageSection"
                                key="3"
                                src={"https://res.cloudinary.com/mayankesh/image/upload/v1640523635/products/md0vg22oiypups5wmxl8.jpg"}
                                alt="Slide3"
                            />
                        </Carousel>

                        <h2 className="homeHeading">MATRIX MART GUARANTEES QUALITY</h2>
                        <div className="social_media">
                            <iframe width="800vw" height="500vw" title="bhideo"
                                src="https://www.youtube.com/embed/jSZ6koFAVqY">
                            </iframe>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;