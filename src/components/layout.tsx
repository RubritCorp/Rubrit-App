// native libraries
import Head from "next/head";
// components
import Footer from "components/Footer";
import Navbar from "components/NavBar";
// styles

const Layout: React.FC<{
  title?: string;
  description?: string;
}> = ({ children, title, description }) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="../../public/favicon.ico" />
        <title>{`Rubrit | ${title}`}</title>
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
