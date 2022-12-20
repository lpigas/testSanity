import Link from "next/link";
import React, { useEffect, useState } from "react";
import { urlFor } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";


const Banner = ({ bannerData,products }) => {
  const {slugProduct, setSlugProduct} = useStateContext()

  useEffect(()=>{
    const product = products.filter(item => item.slug.current === bannerData.product)
    setSlugProduct(product)
  }, [bannerData])
  
  return (
    <div className="banner-container">
      <div>
        <p className="beats-solo">{bannerData.smallText}</p>
        <h3>{bannerData.midText}</h3>
        <h1>{bannerData.largeText1}</h1>
        <img
          src={urlFor(bannerData.image)}
          alt="Stickbot Studio"
          className="banner-image"
        />
        <div>
          {slugProduct.length > 0 &&
          <Link href={`/product/${bannerData.product}`}>
            <button type="button">{bannerData.buttonText}</button>
          </Link>
          }
          <div className="desc">
            <h5>Description</h5>
            <p>{bannerData.desc}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Banner;
