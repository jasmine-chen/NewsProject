import React from 'react';
import {Row, Col} from 'antd';
import {
  Tabs,
  Upload,
  Icon,
  Modal,
  Card
} from 'antd';
const TabPane = Tabs.TabPane;
import PCHeader from './pc_header';
import PCFooter from './pc_footer';

export default class PCUserCenter extends React.Component {
  constructor(){
    super();
    this.state = {
      usercollection: '',
      usercomments: '',
      previewImage: '',
      previewVisible: false,
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }],
    };
  };

  componentDidMount(){
    var myFetchOptions = {
      method: "GET"
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({usercollection: json});
    });
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({usercomments: json});
    });
  };

  handleCancel(){
    this.setState({previewVisible: false});
  };

  render(){
    const props = {
      action: "//jsonplaceholder.typicode.com/posts/",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      listType: "picture-card",
      fileList: this.state.fileList,
      onPreview: (file) => {
        this.setState({previewImage: file.url || file.thumbUrl, previewVisible: true});
      },
      onChange: ({fileList}) => this.setState({fileList})
    };

    const {usercollection, usercomments} = this.state;
    const usercollectList = usercollection.length?
      usercollection.map((uc, index) => (
        <Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`} target="_blank">查看</a>}>
          <p>{uc.Title}</p>
        </Card>
      ))
    :
      '您还没有收藏任何的新闻，快去收藏一些新闻吧！';

    const usercommentsList = usercomments.length?
      usercomments.map((comment, index) => (
        <Card key={index} title={`在 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a href={`/#/details/${comment.uniquekey}`} target="_blank">查看</a>}>
          <p>{comment.Comments}</p>
        </Card>
      ))
    :
      '您还没有发表过任何评论。';

    return(
      <div>
        <PCHeader/>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                <Row>
                  <Col span={24}>
                    {usercollectList}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                <Row>
                  <Col span={24}>
                    {usercommentsList}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="头像设置" key="3">
                <div>
                  <Upload {...props}>
                    <Icon type="plus" />
                    <div className="ant-upload-text">上传照片</div>
                  </Upload>
                  <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                    <img alt="预览" src={this.state.previewImage} style={{width: '100%'}}/>
                  </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter/>
      </div>
    );
  };
}
