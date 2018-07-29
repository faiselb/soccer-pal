import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import MeetupItem from './MeetupItem';
import { getProfiles } from '../../actions/profileActions';

class Meetups extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <MeetupItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No Meetups found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-sm offset-1">
              <h3 className="display-8 text-center">Join Other Meetups</h3>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Meetups.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Meetups);