import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount, getCurrentMeetups } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Createdmeetup from './Createdmeetup';


class Myaccount extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getCurrentMeetups();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let myaccountContent;

    if (profile === null || loading) {
      myaccountContent = <Spinner />;
    } else {
      
      if (Object.keys(profile).length > 0) {
        myaccountContent = (
          <div className="col-sm-10 col-sm offset-2">
          <Link to={`/profile/${profile.handle}`} className="btn btn-light">
        <i className="far fa-address-card fa-2x text-success mr-1" /> View My Profile
      </Link>
      <hr />

            <ProfileActions />
            <Createdmeetup createdmeetup={this.props.meetups} />
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        myaccountContent = (
          <div>
            <p>Please Create Your Profile</p>
            <Link to="/create-profile" className="btn btn-lg btn-success">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="myaccount">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4"> My Account</h1>
              <h2 className="display-6 text-success"> {user.name}</h2>
              <hr/>
              {myaccountContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Myaccount.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  meetups: state.profile.meetups,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, getCurrentMeetups })(
  Myaccount
);