import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import Selector from "../../components/Selector/selector";
import {
  AiOutlineMinus,
  AiOutlilePlus,
  AiFillStar,
  AiOutlineStar,
  AiOutlinePlus,
} from "react-icons/ai";

const ProductDetails = ({ product, products, currency }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const [exchange, setExchange] = useState("USD");
  const exchangeData =
    exchange &&
    currency &&
    currency.filter((onecurrency) => onecurrency.currency === exchange)[0];

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          {/* <div className='small-images-container'>
            {image?.map((item, i) =>(
              <img src={urlFor(item)} 
                    className=""
                    onMouseEnter={''}
              />
            ))

            }

          </div> */}
        </div>
        <div className="product-details-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <div className="product-exchange">
            <Selector data={currency} foundValue={setExchange} />
          </div>
          <p className="price">
            {price * +exchangeData.exchange} {exchange}
          </p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={""}>
                <AiOutlineMinus />
              </span>
              <span className="num">0</span>
              <span className="plus" onClick={""}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type={"button"} className="add-to-cart" onClick={""}>
              Add to cart
            </button>
            <button type={"button"} className="buy-now" onClick={""}>
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export async function getStaticProps({ params: { slug } }) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  const currencyQuery = '*[_type == "currency"]';
  const currency = await client.fetch(currencyQuery);

  return {
    props: { product, products, currency },
  };
}

export default ProductDetails;
