import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./index.scss";
import { useNavigate } from "react-router-dom";
const CustomCarousel = () => {
  const settings = {
    autoPlay: true,
    dynamicHeight: false,
    showThumbs: false,
  };
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <Carousel {...settings}>
        <div>
          <img
            className="carousel-img"
            src="https://source.unsplash.com/featured/900x450?amazon"
            alt="amazon"
          />
          <button onClick={() => navigate("/gift-cards")} className="legend">
            {" "}
            Grab it
          </button>
        </div>
        <div>
          <img
            className="carousel-img"
            src="https://source.unsplash.com/featured/900x450?coupon"
            alt="flipkart"
          />
          <button onClick={() => navigate("/gift-cards")} className="legend">
            {" "}
            Grab it
          </button>
        </div>
        <div>
          <img
            className="carousel-img"
            src="https://source.unsplash.com/featured/900x450?google"
            alt="google"
          />
          <button onClick={() => navigate("/gift-cards")} className="legend">
            {" "}
            Grab it
          </button>
        </div>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
