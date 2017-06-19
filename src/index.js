import React from 'react';
import ReactDOM from 'react-dom';

// import { AppContainer } from 'react-hot-loader';
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件

import Root from './js/root';

import Promise from 'promise-polyfill';

if(!window.Promise){
  window.Promise = Promise;
  alert("promise");
}

// 以下用于React的热模块替换 react-hot-loader，但是在 IE 中无法使用。
// const render = (Component) => {
//   ReactDOM.render(
//     <AppContainer>
//       <Component/>
//     </AppContainer>,
//     document.getElementById('mainContainer')
//   );
// };
//
// render(Root);
//
// // 模块热替换的 API
// if(module.hot){
//   module.hot.accept('./js/root', () => {
//     render(Root)
//   });
// }


export default class Index extends React.Component{
  render(){
      return (
        <Root/>
      )
  };
};
ReactDOM.render(<Index/>,document.getElementById("mainContainer"));
