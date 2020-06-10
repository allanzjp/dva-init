import {Flex, WhiteSpace, WingBlank} from 'antd-mobile';
import React from 'react'
import logo from "../assets/images/home_txt.png"
import styles from "../assets/css/home.less"

export class Header extends React.Component {
  render() {
    return (
      <div>
        {/* navbar */}
        <WhiteSpace size={"xl"}/>
        <WingBlank style={{flex: 1}}>
          <WhiteSpace size="xl"/>
          {/* logo */}
          <Flex justify="center">
            <img src={logo} width={'200px'} alt="logo"/>
          </Flex>
        </WingBlank>
        <WhiteSpace size={"xl"}/>
      </div>
    )
  }
}

export const PlaceHolder = ({className = '', onClick, content = '', ...restProps}) => (
  <div className={`${className} ${styles.placeholder}`} onClick={onClick} {...restProps}>{content}</div>
);

export function formatSearch(se) {
  if (typeof se !== "undefined") {
    se = se.substr(1);
    let arr = se.split("&"),
      obj = {},
      newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr = arr[i].split("=");
      if (typeof obj[newArr[0]] === "undefined") {
        obj[newArr[0]] = newArr[1];
      }
    }
    return obj;
  }
}
