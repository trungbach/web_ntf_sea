import React, { useState, useEffect,useCallback } from 'react';
import styles from './styles.scss';
import './style.css';
import { Form, Input, Button,message } from 'antd';
import { connect } from 'dva';
import BUS from '../../assets/buslogo.svg'
import { Link } from 'react-router-dom';
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

function Login(props) {
  const { form, dispatch, loginStore } = props;
  const { getFieldDecorator } = form;
  let { loginLoading } = loginStore;
  const [name, setName] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'LOGIN/login',
          payload: values,
        });
      }else{
        message.error('This is an error message');
      }

    });
  };

  const updateSchool = useCallback(payload => {
    dispatch({ type: 'MASTERDATA/updateSchool', payload });
    },
    [dispatch],
  );

  useEffect(() => {
    updateSchool({id : 0})
  }, []);

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit(e)
    }
  }

  return (
    <div className={styles.content_login}>
      <div className={styles.content}>
        <div className={`${styles.logo} container`}>
          <div className={styles.boxContent}>
            <div className={styles.headerLogin}>
              <div className={styles.titleLogin}>               
                <div className={styles.text}><img className={styles.textBus} src={BUS}/></div>               
              </div>
            </div>

            <div className={styles.login}>
              <div className={styles.header__box}>
                <h2 className={styles.title__box}>Đăng Nhập</h2>
              </div>
              <div className={styles.contentBox__login}>
                <Form name="basic" {...layout} onSubmit={onSubmit}>
                  <Form.Item label="Tài khoản">
                    <Form.Item className={styles.item} name="email">
                      {getFieldDecorator('email', {
                        rules: [
                          {
                            required: false,

                          },
                        ],
                      })(<Input onKeyDown={_handleKeyDown}/>)}
                    </Form.Item>
                  </Form.Item>
                  <Form.Item label="Mật khẩu">
                    <Form.Item className={styles.item2} name="password">
                      {getFieldDecorator('password', {
                        rules: [
                          {
                            required: false,
                          },
                        ],
                      })(<Input.Password onKeyDown={_handleKeyDown}/>)}
                    </Form.Item>
                  </Form.Item>
                  <div className="form-group col text-right">
                    <Link to="forgot-password" className="btn btn-link pr-0" >Quên mật khẩu?</Link>
                  </div>
                  <div className={styles.btnForm}>
                    <Button style={{width:'100%'}}
                      loading={loginLoading}
                      type="primary"
                      onClick={e => onSubmit(e)}
                      className="btn btn-primary btn_submit"
                    >
                      Đăng nhập
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(({ LOGIN,MASTERDATA }) => ({
  loginStore: LOGIN,
  masterDataStore: MASTERDATA,
}))(Form.create()(Login));
