import React from 'react';
import ReactDOM from 'react-dom';

import '../css/pc.css';
import '../css/mobile.css';

import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import MediaQuery from 'react-responsive';

import PCIndex from './components/pc_index';
import PCUserCenter from './components/pc_usercenter';
import PCNewsDetails from './components/pc_news_details';
import MobileIndex from './components/mobile_index';
import MobileNewsDetails from './components/mobile_news_details';
import MobileUserCenter from './components/mobile_usercenter';

export default class Root extends React.Component{
  render(){
      return (
        <div>
          <MediaQuery query='(min-device-width: 1224px)'>
            <Router>
              <div>
                <Route exact path="/" component={PCIndex}/>
                <Route path="/details/:uniquekey" component={PCNewsDetails}/>
                <Route path="/usercenter" component={PCUserCenter}/>
              </div>
            </Router>
          </MediaQuery>
          <MediaQuery query='(max-device-width: 1224px)'>
            <Router>
              <div>
                <Route exact path="/" component={MobileIndex}/>
                <Route path="/details/:uniquekey" component={MobileNewsDetails}/>
                <Route path="/usercenter" component={MobileUserCenter}/>
              </div>
            </Router>
          </MediaQuery>
        </div>
      );
  };
}

// ReactDOM.render(<Root/>,document.getElementById("mainContainer"));
