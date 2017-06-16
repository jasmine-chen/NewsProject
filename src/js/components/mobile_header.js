import React from 'react';
import { Link } from 'react-router-dom';
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

import logo from '../../images/logo.png';


class MobileHeader extends React.Component{
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
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({userNickname: json.NickUserName, userid: json.UserId});
      localStorage.userid = json.UserId;
      localStorage.userNickname = json.NickUserName;
    });
    if (this.state.action=="login") {
			this.setState({hasLogined:true});
		}
    message.success("请求成功！");
    this.setModalVisible(false);
  };

  login(){
    this.setModalVisible(true);
  };

  callback(key){
      if(key == 1){
        this.setState({action: 'login'});
      }else if(key == 2){
        this.setState({action: 'register'});
      }
  };

  render(){
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 18}
    };
    const buttonItemLayout = {
      wrapperCol: {span: 18, offset: 4}
    }
    const userShow = this.state.hasLogined?
      <Link to="/usercenter">
        <Icon type="inbox"/>
      </Link>
      :<Icon type="setting" onClick={this.login.bind(this)}/>;

      return (
        <div id="mobileheader">
          <header>
            <a href="/">
              <img src={logo} alt="logo"/>
            </a>
            <span>News</span>
            {userShow}
            <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)}  onOk={()=>this.setModalVisible(false)} okText="关闭">
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
          </header>
        </div>
      );
  };
}

export default MobileHeader = Form.create({})(MobileHeader);
