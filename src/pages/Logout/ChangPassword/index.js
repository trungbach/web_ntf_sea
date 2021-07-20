import React, { useState,useCallback, useEffect } from 'react';
import { Modal, Button, Form ,Input, message} from 'antd';
import { connect } from 'dva';

function ChangePassword(props) {
    let {dispatch, logoutStore , form} = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { getFieldDecorator } = props.form;
    const [password, setPassword] = useState();
    const [oldpassword, setOldPassword] = useState();
    const [newpassword, setNewPassword] = useState();
    const [enternewpassword, setEnterNewPassword] = useState();

    // const changeUserPassword = useCallback(payload => {
    //     dispatch({ type: 'MASTERDATA/changeUserPassword', payload });
    //     },
    //     [dispatch],
    //   );

    //   useEffect(() => {
    //     let payload = {
    //       oldPass: oldpassword,
    //       newPass: newpassword
    //     };
    //     changeUserPassword(payload);
    // }, [changeUserPassword, oldpassword, newpassword]);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };


  const OldPassword = value =>{
    setOldPassword(value.target.value)
  }

  const NewPassword = value =>{
    setNewPassword(value.target.value)
  }

  const EnterNewPassword = value =>{
    setEnterNewPassword(value.target.value)
  }

  const changePassword = e =>{
    e.preventDefault();
    if(oldpassword == ""){
        message.error('mật khẩu chưa được nhập')
    }
    else if(newpassword == "" || newpassword == undefined){
        message.error('mật khẩu chưa được nhập')
    }else if(enternewpassword == "" || enternewpassword == undefined){
        message.error('mật khẩu chưa được nhập')
    }else if(newpassword != enternewpassword){
        message.error('mật khẩu không trùng khớp')
    }else{
        dispatch({
            type: 'MASTERDATA/changeUserPassword',
            payload: {'oldPass':oldpassword,'newPass':newpassword},
        });
    }
  
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    props.form.resetFields()
  };

  return (
    <>
      <Button  onClick={showModal}>
        Đổi mật khẩu
      </Button>
      <Modal 
        title="Đổi mật khẩu" 
        visible={isModalVisible}  
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      footer={[
              <Button key="back" onClick={handleCancel}>
                Huỷ
              </Button>,
              <Button key="submit" type="primary" onClick={changePassword}>
                Đổi mật khẩu
              </Button>,
            ]}>
      <Form>
          <Form.Item label="Mật khẩu cũ">

        <Input.Password onChange={OldPassword} value={oldpassword}/>
          </Form.Item>
          <Form.Item label="Mật khẩu mới">

        <Input.Password onChange={NewPassword} value={newpassword}/>
          </Form.Item>
          <Form.Item label="Nhập lại mật khẩu mới">

            <Input.Password onChange={EnterNewPassword} value={enternewpassword}/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default connect(({ LOGOUT_SERVICES, MASTERDATA }) => ({
    masterDataStore: MASTERDATA,
    logoutStore: LOGOUT_SERVICES
  }))(Form.create({})(ChangePassword));
