import "./productList.css";
import Product from "../product/Product";
import { products } from "../../data";

const ProductList = () => {
  return (
    <div className="pl ">
      <div className="pl-texts">
        <h1 className="pl-title">Our Team</h1>
        <p className="pl-desc">
          We here at space have tried our best to give a flawless experience to our users  and are willing to improve in future.
        </p>
      </div>
      <div className="pl-list-p">
        <div className="pl-list">
          {products.map((item) => (
            <Product key={item.id} img={item.img} link={item.link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
