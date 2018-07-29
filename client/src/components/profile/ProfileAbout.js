import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    
    const firstName = profile.user.name.trim().split(' ')[0];

    
    const interests = profile.interests.map((interest, index) => (
      <div key={index} className="p-3">
        <i className="fas fa-futbol text-success" /> {interest}
      </div>

      
    ));

    return (
      <div className="row">
        <div className="col-sm-10 col-sm offset-1">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-success">About Me</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-success"> Interests</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {interests}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;