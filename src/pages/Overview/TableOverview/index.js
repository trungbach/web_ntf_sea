import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'dva';
import styles from './styles.scss';
import { Select, Row, Col } from 'antd';
import moment from 'moment';
import { router } from 'umi';
import {
  Chart,
  Tooltip,
  Interval
} from "bizcharts";



const { Option } = Select;

function OverView(props) {

  let { masterDataStore, dispatch, overviewStore } = props;
  let { schoolId } = masterDataStore;
  let { childrenResponse,summaryResponse,completedResponse} = overviewStore;
  const [month, setMonth] = useState(moment().format('MM'));
  const [year, setYear] = useState(moment().format('YYYY'));
  const [dateType, setDateType] = useState('MONTH');

  const overviewChildren = useCallback(payload => {
      dispatch({ type: 'OVERVIEW/overviewChildren', payload });
    },
    [dispatch],
  );

  const overviewSummary = useCallback(payload => {
    dispatch({ type: 'OVERVIEW/overviewSummary', payload });
  },
  [dispatch],
  );

  const overviewCompleted = useCallback(payload => {
    dispatch({ type: 'OVERVIEW/overviewCompleted', payload });
  },
  [dispatch],
  );

  const convertData = (input)  =>{
    var output=[];
    input.map((childrenResponse) =>{
  output.push({name: 'Lên Xe', date: childrenResponse.date, value: childrenResponse.value})
  output.push({name: 'Tất cả', date: childrenResponse.date, value: childrenResponse.total})
    })
  return output
  }

  const convertCompleted = (journey) => {
    var  out =[];
    journey.map((completedResponse) => {
      out.push({date:completedResponse.date, value: completedResponse.value})
    })

    return out
  }

  useEffect(() => {

    if(schoolId !== 0 && schoolId != undefined){
    overviewChildren({schoolId});
    overviewSummary({schoolId});
    overviewCompleted({ 
      schoolId})
      ;}else{
        dispatch({
          type: 'MASTERDATA/getListSchool',
          payload: {name:''},
        })
      }

  }, [schoolId]);

  const goSchedule =() =>{
    router.push({ pathname: '/admin/schedule-manage' });
  }

  const goCar =() =>{
    router.push({ pathname: '/admin/car-manage' });
  }

  const goJourney =() =>{
    router.push({ pathname: '/admin/journey-manage' });
  }

  const goChildren =() =>{
    router.push({ pathname: '/admin/student-manage' });
  }


  return (
    <div style={{width:'100%'}} className={styles.managerAccout}>
      <div className={styles.content}>
        abc
      </div>
    </div>
  )
}

export default connect(({ MASTERDATA, OVERVIEW }) => ({
  masterDataStore: MASTERDATA,
  overviewStore: OVERVIEW,
}))(OverView);
