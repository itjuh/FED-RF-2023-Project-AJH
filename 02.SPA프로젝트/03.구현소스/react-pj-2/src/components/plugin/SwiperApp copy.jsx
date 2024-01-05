import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './css/swiper.css';
// import required modules
import { Pagination, Navigation, Keyboard, Autoplay } from 'swiper/modules';

export function SwiperApp2() {
  const imgArr = [
    "keyboard2",
    "keyboard3",
    "keyboard4",
    "keyboard5",
    "keyboard6",
    "keyboard7",
    "keyboard8",
    "keyboard9",
    "keyboard10",
    "keyboard11",
    "keyboard12",
    "keyboard13",
    "keyboard14",
  ];

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={{
        //   clickable: true,
        // }}
        direction={"vertical"}
        keyboard={true}
        // autoplay={{
        //   delay: 1000,
        //   disableOnInteraction: false,
        // }}
        // 사용 할 모듈을 여기에 적용시킨다
        modules={[Pagination, Navigation, Keyboard, Autoplay]}
        className="mySwiper swiper2 row-s-13"
      >
        {
          imgArr.map((v,i)=><SwiperSlide key={i}><img src={"./images/image_prod2/" + v + ".png"} alt='images'/></SwiperSlide>)
        }
      </Swiper>
    </>
  );
}
