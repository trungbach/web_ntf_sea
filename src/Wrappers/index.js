import React, { useEffect } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import LoadingComponent from '@/components/Loading';
import PageHeader from '@/components/PageHeader';
import Logout from '@/pages/Logout';
import { withRouter } from 'umi';
import styles from './styles.scss';
function AppWrappers(props) {
  let { dispatch, masterDataStore } = props;
  let { schools,countUnread,schoolId } = masterDataStore;
  useEffect(() => {
    if(schoolId == undefined || schoolId.length <0){
      dispatch({ type: 'MASTERDATA/getListSchool', payload: {name: ''} });
    }
    else{
      if(schoolId !== 0){
        dispatch({type: 'MASTERDATA/getCountUnread', payload: {schoolId: schoolId}})
      }}
  }, [schools]);
  // if (_.isEmpty(schools)) return <LoadingComponent />;
  return <div style={{display: 'contents'}}>
    {<PageHeader />}
    <div className={styles.fullScreen}>
      <div className={styles.fullSpace}>
        <Logout/>
        {props.children}
      </div>
      <div className={styles.footer}>Copyright 2020 vannguyen.vn All Rights Reserved</div>
    </div>
  </div>;
}

export default connect(({ MASTERDATA }) => ({
  masterDataStore: MASTERDATA,
}))(withRouter(AppWrappers));
