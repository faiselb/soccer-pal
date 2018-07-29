import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './MeetupHeader';
import MeetupInfo from './MeetupInfo';
import Spinner from '../common/Spinner';
import { getProfileByHandle, getMeetupsByHandle, joinMeetupById, leaveMeetupById } from '../../actions/profileActions';

class Meetup extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
      this.props.getMeetupsByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading, meetups } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-sm-10 col-sm offset-1">
              <Link to="/meetups" className="btn btn-light mb-3 float-left">
              <i className="fas fa-arrow-left fa-1x text-success mr-1" />
                Back To All Meetups
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          { profile && profile.user ? <ProfileHeader profile={profile} /> : null }
          <MeetupInfo
          createdmeetup={meetups}
          currentUser={this.props.currentUser}
          joinMeetupById={this.props.joinMeetupById}
          leaveMeetupById={this.props.leaveMeetupById}
          />
          
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Meetup.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  currentUser: state.auth.user
});

export default connect(mapStateToProps, { getProfileByHandle, getMeetupsByHandle, joinMeetupById, leaveMeetupById })(Meetup);