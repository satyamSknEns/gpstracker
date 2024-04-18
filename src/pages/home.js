import React from "react";
import Layout from "../components/layout";
import HeaderBanner from "../components/headerBanner";
import PopularStores from "../components/popularStores";
import CouponOffers from "../components/couponOffers";
import TrendCategories from "../components/trendCategories";
import NewsLetter from "../components/newsLetter";
import OurCustomers from "../components/ourCustomers";
import ImageText from "../components/imageText";

const HomePage = () => {
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  return (
    <Layout>
      <HeaderBanner />
      <PopularStores />
      <CouponOffers />
      <TrendCategories />
      <NewsLetter />
      <OurCustomers />
      <ImageText />
    </Layout>
  );
};

export default HomePage;
