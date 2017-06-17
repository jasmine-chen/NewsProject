import React from 'react';
import {Row, Col} from 'antd';
import {Carousel, Tabs} from 'antd';
const TabPane = Tabs.TabPane;

import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_product';

import carousel_1 from '../../images/carousel_1.jpg';
import carousel_2 from '../../images/carousel_2.jpg';
import carousel_3 from '../../images/carousel_3.jpg';
import carousel_4 from '../../images/carousel_4.jpg';

export default class PCNewsContainer extends React.Component{
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
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} class='container'>
            <div class="clearfloat">
              <div class='leftContainer'>
                <div class='carousel'>
                  <Carousel {...setting}>
                    <div><img src={carousel_1}/></div>
                    <div><img src={carousel_2}/></div>
                    <div><img src={carousel_3}/></div>
                    <div><img src={carousel_4}/></div>
                  </Carousel>
                </div>
                <div class="news-image">
                  <PCNewsImageBlock bordered={true} type="guoji" cardTitle="国际" count={6} width="100%" imageWidth="97%" imageHeight="90px"/>
                </div>
              </div>
              <Tabs class="tabs_news">
                <TabPane tab="头条新闻" key="1">
                  <PCNewsBlock type="top" count={21} />
                </TabPane>
                <TabPane tab="社会" key="2">
                  <PCNewsBlock type="shehui" count={21} />
                </TabPane>
                <TabPane tab="军事" key="3">
                  <PCNewsBlock type="junshi" count={21} />
                </TabPane>
                <TabPane tab="财经" key="4">
                  <PCNewsBlock type="caijing" count={21} />
                </TabPane>
              </Tabs>
              <Tabs class="news_attitude_block">
                <TabPane tab="新闻各有态度" key="1">
                  <PCProduct/>
                </TabPane>
              </Tabs>
            </div>
            <div class="news-image-bottom">
              <PCNewsImageBlock bordered={true} type="guonei" cardTitle="国内" count={8} width="100%" imageWidth="97%" imageHeight="96px"/>
              <PCNewsImageBlock bordered={true} type="yule" cardTitle="娱乐" count={16} width="100%" imageWidth="97%" imageHeight="96px"/>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  };
}
