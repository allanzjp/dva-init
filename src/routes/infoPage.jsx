import React from 'react'
import {Button, Card, InputItem, Toast, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'dva'
import {Header, PlaceHolder} from '../components/header'
import {createForm} from 'rc-form'
import styles from "../assets/css/home.less"
import styled from 'styled-components';
import {getCiBankCardInfo} from "../services/service"

const genders = [{label: '男', value: 0}, {label: '女', value: 1}]

const MyInputItem = styled(InputItem)`
  .am-list-item.am-input-item {
      height: 25px;
      padding-left: 0px;
      font-size: 14px;
      line-height: 25px;
  }
  .am-list-item {
      position: relative;
      display: -ms-flexbox;
      display: flex;
      padding-left: 0px;
      min-height: 25px;
      background-color: #fff;
      vertical-align: middle;
      overflow: hidden;
      -webkit-transition: background-color 200ms;
      transition: background-color 200ms;
      -ms-flex-align: center;
      align-items: center;
  }
`;

class infoPage extends React.Component {
  state = {
    display: styles.show,
    editDisplay: styles.hidden,
    bankName: '',
    bankCard: '',
    cardNum: '',
  };

  componentDidMount() {
    this.employee_query()
    this.cancel()
  }

  //协议模版查询
  employee_query = () => {
    let type = 'app/employeeInfo'
    this.props.dispatch({
      type,
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          display: styles.show,
          editDisplay: styles.hidden,
          bankName: res.data.data.bankName,
          bankCard: res.data.data.bankCard,
          cardNum: res.data.data.cardNum,
        });
      } else {
        Toast.fail(res.data.msg)
      }
    })
  };

  edit = () => {
    console.log("edit")
    this.setState({
      display: styles.hidden,
      editDisplay: styles.show
    })
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      if (typeof value.bankCard === 'undefined' && typeof value.cardNum === 'undefined') {
        Toast("沒有变更的信息")
        return;
      }

      this.info_update(value)
    });
  }

  info_update = (value) => {
    let type = 'app/employeeUpdate'
    this.props.dispatch({
      type,
      payload: {
        ...value,
        bankName: this.state.bankName,
      },
    }).then(res => {
      if (res.data.code === 200) {
        window.location.reload()
      } else {
        Toast.fail(res.data.msg)
      }
    })
  }

  cancel = () => {
    this.setState({
      display: styles.show,
      editDisplay: styles.hidden
    })
  }

  onBlurBankName = () => {
    console.log('onblur')
    this.props.form.validateFields((error, value) => {
      let payload = {ciNumber: value.bankCard.replace(' ', '')}
      getCiBankCardInfo(payload).then(res => {
        if (res.data.data.code === 200) {
          this.setState({
            bankName: res.data.data.msg,
          })
        } else {
          Toast.fail(res.data.data.msg)
        }
      })
    })
  }

  render() {

    const {getFieldProps} = this.props.form;

    return (
      <div className={styles['animate-route']}>
        <Header/>
        <WingBlank size="lg">
          <WhiteSpace size="lg"/>
          <Card className={styles["agreement-card"]}>
            <Card.Header title='银行卡信息'
                         extra={<PlaceHolder className={`${styles["sign-font"]} ${this.state.display}`} content={'编辑'}
                                             onClick={() => {
                                               this.edit()
                                             }}/>}/>
            <Card.Body className={styles["agreement-card-body"]}>
              <PlaceHolder className={this.state.display}
                           content={this.state.bankCard?.replace(/(\d{4})(?=\d)/g, "$1 ")}/>
              <InputItem {...getFieldProps('bankCard')}
                         className={`${this.state.editDisplay} ${styles["info-input"]}`}
                         type={'bankCard'}
                         placeholder={this.state.bankCard?.replace(/(\d{4})(?=\d)/g, "$1 ")}
                         onBlur={() => this.onBlurBankName()}/>
            </Card.Body>
            <Card.Footer content={this.state.bankName} extra={<PlaceHolder/>}/>
          </Card>

          <WhiteSpace size="lg"/>
          <Card className={styles.card}>
            <Card.Header title="身份证号"/>
            <Card.Body className={styles["card-body"]}>
              <PlaceHolder className={this.state.display} content={this.state.cardNum}/>
              <InputItem {...getFieldProps('cardNum')}
                         className={`${this.state.editDisplay}  ${styles["info-input"]}`}
                         type={'number'}
                         placeholder={this.state.cardNum}/>
            </Card.Body>
          </Card>

          <WhiteSpace/>
          <Button className={this.state.editDisplay} onClick={() => {
            this.submit()
          }}>提交</Button>
          <WhiteSpace/>
          <Button className={this.state.editDisplay} onClick={() => {
            this.cancel()
          }}>取消</Button>


          {/*<WhiteSpace size={"xl"}/>*/}
          {/*<Picker className={styles.font14}*/}
          {/*data={genders}*/}
          {/*value={this.state.gender}*/}
          {/*cols={1}*/}
          {/*onChange={this.onChangeGender}*/}
          {/*>*/}
          {/*<List.Item className={styles.font14} arrow="horizontal">性别</List.Item>*/}
          {/*</Picker>*/}
        </WingBlank>
      </div>
    )
  }
}

export default connect()(createForm()(infoPage))
