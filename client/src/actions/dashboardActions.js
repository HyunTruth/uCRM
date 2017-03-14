import axios from 'axios';
// import { browserHistory } from 'react-router';
import * as types from './types';
import data from '../../data.json';

export const dashboardAllMember = allMember => ({
  type: types.DASHBOARD_ALLMEMBER_SHOW,
  allMember,
});

export const dashboardCurrentMember = currentMember => ({
  type: types.DASHBOARD_CURRENTMEMBER_SHOW,
  currentMember,
});

export const dashboardLatestActivity = latestActivity => ({
  type: types.DASHBOARD_LATESTACTIVITY_SHOW,
  latestActivity,
});

export const dashboarRoomReservation = roomReservation => ({
  type: types.DASHBOARD_ROOMRESERVE_SHOW,
  roomReservation,
});

export const dashboardIsChangeDashboard = isChangeDashboard => ({
  type: types.IS_DASHBOARD_SHOW,
  isChangeDashboard,
});

export function dashboardShow() {
  return (dispatch, getState) => {
    console.log('come in dashboardShow');
    const { allMember, currentMember, latestActivity, roomReservation } = getState().dashboardReducer;
    const API_URL = 'http://localhost:4000/api';
    const instance = {
      headers: {
        token: localStorage.getItem('userToken'),
      },
    };
    return axios.get(`${API_URL}/dashboard`, {
      instance,
    })
    .then((res) => {
      console.log(res);
    });


    // function Dashboard Current Member
    // const dataMemberList = data.memberList;
    // let countCurrentMember = 0;
    // for (let i = 0; i < dataMemberList.length; i += 1) {
    //   if (dataMemberList[i].end_date === null) {
    //     countCurrentMember += 1;
    //   }
    // }
    // dispatch(dashboardAllMember(data.memberList.length));
    // dispatch(dashboardCurrentMember(countCurrentMember));
    // dispatch(dashboardLatestActivity(data.latestActivity));
    // dispatch(dashboarRoomReservation(data.reservedList));
  };
}
