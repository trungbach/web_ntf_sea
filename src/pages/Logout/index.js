import React, { useState, useCallback, useEffect } from 'react';
import { Menu, Dropdown, Select, Modal, Button, Form, Input,Icon } from 'antd';
import styles from './styles.scss';
import Cookies from 'js-cookie';
import Temple from '../../assets/Temple.png';
import { router, Link } from 'umi';
import Message from '../../assets/messager2.svg';
import Notifi from '../../assets/Vector.svg';
import AVTAR from '../../assets/avatar.png';
import ChagePassword from './ChangPassword';
import { connect } from 'dva';
import cookie from 'js-cookie';

const { Option } = Select;

function Logout(props) {
  let { masterDataStore, dispatch,logoutStore } = props;
  let { schools, schoolId,countUnread, updateAdmin, hideSchools } = masterDataStore;
  const [isModalVisible, setIsModalVisible] = useState(false);
  var admin = JSON.parse(localStorage.getItem('Admin'));
  const { getFieldDecorator } = props.form;

  const updateSchool = useCallback(payload => {
    dispatch({ type: 'MASTERDATA/updateSchool', payload });
    },
    [dispatch],
  );

  const getCountUnread = useCallback(payload => {
    dispatch({ type: 'MASTERDATA/getCountUnread', payload });
  })

  const editStudent = useCallback(
    payload => {
      dispatch({ type: 'MASTERDATA/editUserAdmin', payload });
    },
    [dispatch],
  );

  useEffect(() => {
    admin = JSON.parse(localStorage.getItem('Admin'));
  }, [updateAdmin]);

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleOk = () => {
    setIsModalVisible(false);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };


  function handleChange(value) {
    updateSchool({id: value})
    if(schoolId != undefined && schoolId > 0){
      getCountUnread({schoolId})
    }
  }

  const notifi = () => {
    router.push({pathname:`/admin/notification-manage`})
  }

  const mesege = () => {
    router.push({pathname:`/admin/message-manage`})
  }

  const logout = () => {
    const loginUrl = '/login';
    router.push({ pathname: loginUrl });
    Cookies.remove('token');
    localStorage.removeItem("schoolId")
  };

  const onFinish = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        values.id = admin.id
        editStudent(values);
        handleCancel()
      }
    });
  };

  return (
    <div className={styles.headerUser}>
      <div></div>
      <div className="center-vertical">
          <div style={{ position: 'relative', width: 31, height: 33, alignItems: 'flex-end', display: 'flex', margin: 24 }}>
          <img onClick={notifi} src={Notifi} alt="notification" />
          </div>
          <div  style={{ position: 'relative', width: 35, height: 33, alignItems: 'flex-end', display: 'flex', margin: 24 }}>
          <img onClick={mesege} src={Message} alt="message" />
            {(countUnread.count) == 0? undefined :
            <div className={styles.titleHeaderUserrr}>
              {(countUnread.count) > 9? '9+' : (countUnread.count)}
              </div>}
          </div>
          <div onClick={showModal} className={styles.adButton}>
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                  <img src={AVTAR} alt="avatar" />
                </div>
                <div style={{ margin: 'auto', marginLeft: '1rem' }}>
                  <span>{admin.name}</span>
                </div>
              </div>
            </div>
        </div>

      <Modal
        title="THÔNG TIN"
        visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        footer={[ <div style={{display:'flex',justifyContent:'flex-end'}}>
          <Button key="save" onClick={onFinish}>
            Lưu
          </Button>
          <div style={{marginRight:'1rem', marginLeft: '1rem'}}>
          <ChagePassword/></div>
          <Button key="logout" onClick={logout}>
            Đăng xuất
          </Button>
          <Button key="back" onClick={handleCancel}>
            Huỷ
          </Button></div>]} >
        <Form>
          <Form.Item label="Name">

            {getFieldDecorator("name", {
              initialValue: admin.name,
              rules: [{ required: true, message: 'Bạn chưa nhập tên tài khoản!' }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Phone">

            {getFieldDecorator("phone", {
              initialValue: admin.phone,
              rules: [{ required: true, message: 'Bạn chưa nhập tên tài khoản!' }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Email">

            {getFieldDecorator("email", {
              initialValue: admin.email,
              rules: [{ required: true, message: 'Bạn chưa nhập tên tài khoản!' }]
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default connect(({ LOGOUT_SERVICE, MASTERDATA }) => ({
  logoutStore: LOGOUT_SERVICE,
  masterDataStore: MASTERDATA
}))(Form.create({})(Logout));