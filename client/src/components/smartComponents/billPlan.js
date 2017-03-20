import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as billPlanActions from '../../actions/billPlanActions';

class BillPlan extends Component {
  componentWillMount() {
    console.log('will mount');
    this.props.billPlanShow();
  }
  render() {
    return (
      <div>
        BillPlan<br />
        <Link to={'/admin/setting/billplan/add'}>
          AddBillPlan
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  billPlanData : state.billPlanReducer.data,
});

const mapDispatchToProps = dispatch => ({
  billPlanShow: () => { dispatch(billPlanActions.billPlanShow()); },
});


export default connect(mapStateToProps, mapDispatchToProps)(BillPlan);
