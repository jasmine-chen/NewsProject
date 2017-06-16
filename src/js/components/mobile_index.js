import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';

import {
  Tabs,
  Carousel
} from 'antd';
const TabPane = Tabs.TabPane;

import carousel_1 from '../../images/carousel_1.jpg';
import carousel_2 from '../../images/carousel_2.jpg';
import carousel_3 from '../../images/carousel_3.jpg';
import carousel_4 from '../../images/carousel_4.jpg';

export default class MobileIndex extends React.Component{
    render(){
      const setting = {
        dots: true,
        //每次展示的幻灯片张数
        slidesToShow: 1,
        //每次幻灯片滑动的张数
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        // 将所有幻灯片循环播放
        infinite: true
      };
      return (
        <div>
          <MobileHeader></MobileHeader>
          <Tabs>
            <TabPane tab="头条" key="1">
            <div class='carousel'>
              <Carousel {...setting}>
                <div><img src={carousel_1}/></div>
                <div><img src={carousel_2}/></div>
                <div><img src={carousel_3}/></div>
                <div><img src={carousel_4}/></div>
              </Carousel>
            </div>
              <MobileList type="top" count={20}/>
            </TabPane>
            <TabPane tab="国内" key="2">
              <MobileList type="guonei" count={20}/>
            </TabPane>
            <TabPane tab="国际" key="3">
              <MobileList type="guoji" count={20}/>
            </TabPane>
            <TabPane tab="社会" key="4">
              <MobileList type="shehui" count={20}/>
            </TabPane>
            <TabPane tab="军事" key="5">
              <MobileList type="junshi" count={20}/>
            </TabPane>
            <TabPane tab="财经" key="6">
              <MobileList type="caijing" count={20}/>
            </TabPane>
            <TabPane tab="科技" key="7">
              <MobileList type="keji" count={20}/>
            </TabPane>
            <TabPane tab="娱乐" key="8">
              <MobileList type="yule" count={20}/>
            </TabPane>
            <TabPane tab="体育" key="9">
              <MobileList type="tiyu" count={20}/>
            </TabPane>
            <TabPane tab="时尚" key="10">
              <MobileList type="shishang" count={20}/>
            </TabPane>
          </Tabs>
          <MobileFooter></MobileFooter>
        </div>
      );
  };
}
