import React, { useEffect, useState } from "react";
import { Banner, Product, FooterBanner } from "../components";
import Selector from "../components/Selector/selector";
import { useStateContext } from "../context/StateContext";
import { client } from "../lib/client";
import {AiFillLeftSquare, AiFillRightSquare, Airou } from "react-icons/ai";

const Home = ({ products, bannerData, currency }) => {
  const {totalExchange, setCurrency, bannerIndex, setBannerIndex,showCart} = useStateContext()
  const exchangeData =
  totalExchange &&
    currency.filter((onecurrency) => onecurrency.currency === totalExchange)[0];
    useEffect(()=>{
      setCurrency(exchangeData && exchangeData.exchange)
    }, [exchangeData])



    const changeBanner = ( value) =>{
      if (value === 'right'){
        if (bannerIndex === bannerData.length - 1 ){
          setBannerIndex(0)
        } else{
          setBannerIndex(bannerIndex + 1)
        }
      } else if (value === 'left'){
        if(bannerIndex === 0){
          setBannerIndex(bannerData.length -1)
        } else{
          setBannerIndex(bannerIndex - 1)
        }
      }
    }
    useEffect(() => {
      if(showCart === false){
        const interval = setInterval(() => changeBanner('left'), 5000);
        return () => clearInterval(interval);
      }
    }, [bannerIndex, showCart]);

  return (
    <>
      <Banner bannerData={bannerData.length && bannerData[bannerIndex]} products={products}/>
      <div className="banner-square">
      <AiFillLeftSquare onClick={()=> changeBanner('left')} size={100}/>
      <div className={`circle-container`}>
        {bannerData?.map((item, i)=>(

          <div key={item._id} className={`circle ${bannerIndex === i && 'banner-entered'}`} onClick={()=> setBannerIndex(i)}>
          </div>
        ))
        }
      </div>
      <AiFillRightSquare onClick={()=> changeBanner('right')} size={100}/>
      </div>
      <div className="products-heading">
        <h2>Sell product</h2>
        <p>Children toys</p>
      </div>
      <div className="currency">
        <Selector data={currency} />
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

      <FooterBanner bannerData={bannerData.length && bannerData[bannerIndex]} />
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
