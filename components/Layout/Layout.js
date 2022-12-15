import React from "react";
import Head from "next/head";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const title =
    Object.keys(router.query).length > 0
      ? router.query.slug.split("-").join(" ").toUpperCase()
      : "Home page";
  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
