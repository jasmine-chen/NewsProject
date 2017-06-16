import React from 'react';
import {Row, Col} from 'antd';
import {BackTop} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import CommonComments from './common_comments';

export default class MobileNewsDetails extends React.Component{
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
      <div id="mobileDetailsContainer">
        <MobileHeader></MobileHeader>
        <div class="ucmobileList">
          <Row>
            <Col span={24}>
              <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
              <CommonComments uniquekey={this.props.match.params.uniquekey}/>
            </Col>
          </Row>
        </div>
        <BackTop/>
        <MobileFooter></MobileFooter>
      </div>
    );
  };
}
