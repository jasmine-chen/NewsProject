import React from 'react';
import {Row, Col} from 'antd';
import {BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';
import 'whatwg-fetch';

export default class PCNewsDetails extends React.Component{
  constructor(){
    super();
    this.state = {
      newsItem: ''
    };
  };
  componentDidMount(){
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey,myFetchOptions)
    .then(response => response.json())
    .then(
      json => {
        this.setState({newsItem: json});
        document.title = this.state.newsItem.title + "- News | 仿新闻平台";
        // alert(this.state.newsItem.pagecontent);
      }
    )
  }
  createMarkup(){
    return {__html: this.state.newsItem.pagecontent};
  };
  render(){
    return(
      <div class="news_details">
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={14}>
            <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
            <CommonComments uniquekey={this.props.match.params.uniquekey} />
          </Col>
          <Col span={6}>
            <PCNewsImageBlock bordered={false} type="top" count={40} width="100%" cardTitle="头条新闻" imageWidth="96%" imageHeight="94px" />
          </Col>
          <Col span={2}></Col>
        </Row>
        <BackTop/>
        <PCFooter></PCFooter>
      </div>
    );
  };
}
