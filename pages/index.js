import React, { useState } from "react";
import { Banner, Product, FooterBanner } from "../components";
import Selector from "../components/Selector/selector";
import { client } from "../lib/client";

const Home = ({ products, bannerData, currency }) => {
  const [exchange, setExchange] = useState("USD");
  const exchangeData =
    exchange &&
    currency.filter((onecurrency) => onecurrency.currency === exchange)[0];
  return (
    <>
      <Banner bannerData={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Sell product</h2>
        <p>Children toys</p>
      </div>
      <div className="currency">
        <Selector data={currency} foundValue={setExchange} />
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product
            key={product._id}
            product={product}
            exchangeData={exchangeData}
          />
        ))}
      </div>

      <FooterBanner bannerData={bannerData.length && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const currencyQuery = '*[_type == "currency"]';
  const currency = await client.fetch(currencyQuery);

  return {
    props: { products, bannerData, currency },
  };
};

export default Home;
