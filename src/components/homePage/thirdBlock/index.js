import React, { memo } from 'react';
import styles from './index.module.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

const ThirdBlock = function () {

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   centerMode: true,
  //   centerPadding: "250px",
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   speed: 7000,
  //   autoplaySpeed: 1000,
  //   cssEase: "linear",
  //   pauseOnHover: false,
  //   responsive: [
  //     {
  //       breakpoint: 1324,
  //       settings:
  //       {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         centerPadding: "10px",
  //         centerMode: true,
  //       }
  //     },
  //     {
  //       breakpoint: 924,
  //       settings:
  //       {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         centerMode: true,
  //         centerPadding: "20px",
  //       }
  //     },
  //   ]
  // };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 7000,
    infinite: true,
    dots: false,
    responsive: [
      {
        breakpoint: 400,
        settings:
        {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  };
  return (
    <>
      <div className={styles.main}>
        <Slider {...settings}>
          <div >
            <div className={styles.cards}>
              <div className={styles.block}>
                <h4>1</h4>
              </div>
            </div>
          </div>
          <div >
            <div className={styles.cards}>
              <div className={styles.block}>
                <h4>2</h4>
              </div>
            </div>
          </div>
          <div >
            <div className={styles.cards}>
              <div className={styles.block}>
                <h4>3</h4>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.cards}>
              <div className={styles.block}>
                <h4>4</h4>
              </div>
            </div>
          </div>
          <div>
          </div>
        </Slider>
      </div>
    </>
  )
}

export default memo(ThirdBlock);