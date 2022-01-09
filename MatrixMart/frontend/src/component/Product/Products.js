import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Carousel from "react-material-ui-carousel";


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);

    const [price, setPrice] = useState([0, 3600000]);

    const [category, setCategory] = useState("");

    const [ratings, setRatings] = useState(0);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.products);

    let { keyword } = useParams();

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    let count = filteredProductsCount;



    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="products-container">

                        <MetaData title={`PRODUCTS--MATRIXMART`} />
                        <h2 className="productsHeading">PRODUCTS</h2>

                        <div className="products">
                            {products &&
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                        </div>




                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={3600000}
                            />

                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li
                                        className="category-link"
                                        key={category}
                                        onClick={() => setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>

                            <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {

                                        setRatings(newRating);

                                    }}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}
                                />
                            </fieldset>
                        </div>


                        {resultPerPage < count && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}


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
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Products
