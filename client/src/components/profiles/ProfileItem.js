import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div class="col-sm-3 col-sm offset-1">
            <img src={require('./images/avatar.jpg')} alt="" className="rounded" />
          </div>

          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <h4>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </h4>
            
          </div>

        </div>
        <div class="col-sm-3 col-sm offset-5">
        <Link to={`/profile/${profile.handle}`} className="btn btn-success">
              View Profile
            </Link>
          </div>
      </div>

    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;