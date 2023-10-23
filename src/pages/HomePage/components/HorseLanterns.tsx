import React from 'react';
import { Carousel, Image } from 'antd';
import { history } from 'umi';

const LanternImageStyle: React.CSSProperties = {
  width: 'auto',
  height: 'auto',
  objectFit: 'cover',
};
const HorseLanterns: React.FC = () => {
  return (
    <>
      <Carousel autoplay>
        <div
          style={LanternImageStyle}
          onClick={() => {
            history.push({
              pathname: '/profile/course-info/course_gt8struhos3g636lqdijozljx2i5ru',
              query: {},
            });
          }}
        >
          <Image
            height="500px"
            src="https://cdn.pixabay.com/photo/2016/04/01/00/08/toronto-1298016_1280.jpg"
          ></Image>
        </div>
        <div
          style={LanternImageStyle}
          onClick={() => {
            history.push({
              pathname: '/profile/course-info/course_i8e1bijjr2xfohtbvsn6z87vd3wdcl',
              query: {},
            });
          }}
        >
          <Image
            height="500px"
            src="https://cdn.pixabay.com/photo/2016/12/23/12/40/night-1927265_1280.jpg"
          ></Image>
        </div>
        <div
          style={LanternImageStyle}
          onClick={() => {
            history.push({
              pathname: '/profile/course-info/course_mpv0yxl5jyr7vodw4v8xp4s2tg4h3m',
              query: {},
            });
          }}
        >
          <Image
            height="500px"
            src="https://cdn.pixabay.com/photo/2017/03/16/05/23/kirkjufell-2148191_1280.jpg"
          ></Image>
        </div>
      </Carousel>
    </>
  );
};
export default HorseLanterns;
