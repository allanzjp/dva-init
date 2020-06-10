import {Button, WingBlank, WhiteSpace, Flex} from 'antd-mobile';
import React from 'react'
import styles from '../assets/css/home.less'
import logo from "../assets/images/home_txt.png"

const PlaceHolder = ({className = '', ...restProps}) => (
  <Button></Button>
);

class MyMean extends React.Component {

  render() {
    return (
      <div className={styles['animate-route']}>
        {/* navbar */}
        <WhiteSpace size={"xl"}/>
        <WingBlank style={{flex: 1}}>
          <WhiteSpace size="xl"/>
          {/* logo */}
          <Flex justify="center">
            <img src={logo} width={'200px'} alt="logo"/>
          </Flex>
          
        </WingBlank>
      </div>
    )

  }
}

export default MyMean
