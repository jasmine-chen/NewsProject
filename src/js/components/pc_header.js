import React from 'react';
import { Link } from 'react-router-dom';
import {Row, Col} from 'antd';
import logo from '../../images/logo.png';

import 'whatwg-fetch';

import {
  Menu,
  Icon,
  Button,
  Modal,
  Form,
  Tabs,
  Input,
  message
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component{
  constructor(){
    super();
    this.state = {
      current: 'top',
      hasLogined: false,
      userNickname: '',
      modalVisible: false,
      action: 'login',
      userid: 0
    };
  };

  componentWillMount(){
    if(localStorage.userid!=''){
      this.setState({hasLogined: true});
      this.setState({userNickname: localStorage.userNickname,userid: localStorage.userid});
    }
  };
  setModalVisible(value){
    this.setState({modalVisible: value});
  };
  handleClick(e){
    if(e.key == "register"){
      this.setState({current: 'register'});
      this.setModalVisible(true);
    }else{
      this.setState({current: e.key});
    }
  };
  handleSubmit(e){
    //页面开始向 API 进行数据提交
    //阻止特定事件的默认行为
    e.preventDefault();
    var formData = this.props.form.getFieldsValue();
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
     + "&username=" + formData.userName + "&password=" + formData.password
    + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password
    + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({userNickname: json.NickUserName, userid: json.UserId});
      localStorage.userid = json.UserId;
      localStorage.userNickname = json.NickUserName;
    });
    if(this.state.action == 'login'){
      this.setState({hasLogined: true});
    }
    message.success("请求成功！");
    this.setModalVisible(false);
  };

  callback(key){
      if(key == 1){
        this.setState({action: 'login'});
      }else if(key == 2){
        this.setState({action: 'register'});
      }
  };

  logout(){
    localStorage.userid = '';
    localStorage.userNickname = '';
    this.setState({hasLogined: false});
  };

  render(){
      const {getFieldDecorator} = this.props.form;
      const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 18}
      };
      const buttonItemLayout = {
        wrapperCol: {span: 18, offset: 4}
      }

    const userShow = this.state.hasLogined?
        <Menu.Item key="logout" class="register">
          <Button type="primary" htmlType="button">{this.state.userNickname}</Button>
          &nbsp;&nbsp;
          <Link to='/usercenter' target="_blank" class="person-center">
            <Button type="dashed" htmlType="button">个人中心</Button>
          </Link>
          &nbsp;&nbsp;
          <Button type="primary" ghost htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
        </Menu.Item>
       :<Menu.Item key="register" class="register">
          <Icon type="appstore"/>注册/登录
        </Menu.Item>;
      return (
        <header class="header-menu">
          <Row>
            <Col span={2}></Col>
            <Col span={3}>
              <a href="/" class="logo">
                <img src={logo} alt="logo"/>
                <span>News</span>
              </a>
            </Col>
            <Col span={17}>
              <Menu onClick={this.handleClick.bind(this)} mode="horizontal" selectedKeys={[this.state.current]}>
                  <Menu.Item key="top">
                    <Icon type="appstore"/>头条
                  </Menu.Item>
                  <Menu.Item key="guonei">
                    <Icon type="appstore"/>国内
                  </Menu.Item>
                  <Menu.Item key="guoji">
                    <Icon type="appstore"/>国际
                  </Menu.Item>
                  <Menu.Item key="shehui">
                    <Icon type="appstore"/>社会
                  </Menu.Item>
                  <Menu.Item key="junshi">
                    <Icon type="appstore"/>军事
                  </Menu.Item>
                  <Menu.Item key="caijing">
                    <Icon type="appstore"/>财经
                  </Menu.Item>
                  <Menu.Item key="keji">
                    <Icon type="appstore"/>科技
                  </Menu.Item>
                  <Menu.Item key="yule">
                    <Icon type="appstore"/>娱乐
                  </Menu.Item>
                  <Menu.Item key="tiyu">
                    <Icon type="appstore"/>体育
                  </Menu.Item>
                  {userShow}
              </Menu>
              <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
                <Tabs type="card" onChange={this.callback.bind(this)}>
                  <TabPane tab="登录" key="1">
                    <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                      <FormItem label="账户" {...formItemLayout}>
                        {getFieldDecorator('userName')(
                          <Input placeholder="请输入您的账号" />
                        )}
                      </FormItem>
                      <FormItem label="密码" {...formItemLayout}>
                        {getFieldDecorator('password')(
                          <Input type="password" placeholder="请输入您的密码" />
                        )}
                      </FormItem>
                      <FormItem {...buttonItemLayout}>
                        <Button type="primary" htmlType="submit">登录</Button>
                      </FormItem>
                    </Form>
                  </TabPane>
                  <TabPane tab="注册" key="2">
                    <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                      <FormItem label="账户" {...formItemLayout}>
                        {getFieldDecorator('r_userName')(
                          <Input placeholder="请输入您的账号" />
                        )}
                      </FormItem>
                      <FormItem label="密码" {...formItemLayout}>
                        {getFieldDecorator('r_password')(
                          <Input type="password" placeholder="请输入您的密码" />
                        )}
                      </FormItem>
                      <FormItem label="确认密码" {...formItemLayout}>
                        {getFieldDecorator('r_confirmPassword')(
                          <Input type="password" placeholder="请再次输入您的密码" />
                        )}
                      </FormItem>
                      <FormItem {...buttonItemLayout}>
                        <Button type="primary" htmlType="submit">注册</Button>
                      </FormItem>
                    </Form>
                  </TabPane>
                </Tabs>
              </Modal>
            </Col>
            <Col span={2}></Col>
          </Row>
        </header>
      );
  };
}
export default PCHeader = Form.create({})(PCHeader);
