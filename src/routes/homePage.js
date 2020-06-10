import React from 'react'
import {connect} from 'dva'
import {Link, routerRedux} from 'dva/router'
import {Button, Flex, WhiteSpace, WingBlank} from 'antd-mobile'
import styles from '../assets/css/home.less'
import logo from '../assets/images/home_txt.png'

class homePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCalendar: false,
      showFormSelect: false,
      showToSelect: false
    }
    this.closeModule = this.closeModule.bind(this)
  }

  closeModule({stateName, status}) {
    this.setState({
      [stateName]: !this.state.showDate
    })
  }

  componentDidMount() {
  }

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
          <div style={{padding: '15px 0'}}>

            <WhiteSpace size={"xl"}/>
            <WingBlank size="md"><Button onClick={() => {
              this.props.dispatch(routerRedux.push('/login'))
            }}>登录</Button></WingBlank>

            <WhiteSpace size="xl"/>
            <WingBlank size="md"><Button onClick={() => {
              this.props.dispatch(routerRedux.push('/info'))
            }}>我的信息</Button></WingBlank>

            <WhiteSpace size="xl"/>
            <WingBlank size="md"><Button onClick={() => {
              this.props.dispatch(routerRedux.push('/agreement'))
            }}>我的协议</Button></WingBlank>

            <WhiteSpace size="xl"/>
            <WingBlank size="md"><Button onClick={() => {
              this.props.dispatch(routerRedux.push('/sign'))
            }}>签署协议</Button></WingBlank>

            {/*<WhiteSpace size="xl"/>*/}
            {/*<WingBlank size="md">*/}
              {/*<Link to={'login'}>测试</Link>*/}
            {/*</WingBlank>*/}

          </div>
        </WingBlank>
      </div>
    )
  }
}

export default connect()(homePage);
