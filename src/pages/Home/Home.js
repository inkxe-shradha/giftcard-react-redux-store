import React from "react";
import "./home.scss";
import CustomCarousel from "../../components/Carousel/Customcarousel";
import { Divider, Chip } from "@mui/material";
import StaticCoupons from "../../components/StaticCoupons/StaticCoupons";

const Home = () => {
  return (
    <div>
      <CustomCarousel />
      <Divider sx={{ marginTop: 5 }}>
        <Chip label="Most Viewed" />
      </Divider>
      <StaticCoupons />
    </div>
  );
};

Home.propTypes = {};

export default Home;
