import Footer from "components/Footer";
import Navbar from "components/NavBar";
import Head from "next/head";
import React, { Children } from "react";

interface Props {
  authenticated: boolean;
}

const Layout: React.FC<{
  title?: string;
  description?: string;
}> = ({ children, title, description }) => {
  return (
    <div className="layoutContainer">
      <Head>
        <link rel="icon" href="../../public/favicon.ico" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "Next.js | mi sitio web",
  description: "Descripcion de mi sitio Web",
};