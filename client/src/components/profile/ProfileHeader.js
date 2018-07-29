import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
       <div className="col-sm-10 col-sm offset-1">
          <div className="card card-body bg-light text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded"
                  src={require('./images/avatar.jpg')}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center text-success">{profile.user.name}</h1>
              {isEmpty(profile.location) ? null : <h3 className="text-success dispaly-6">{profile.location}</h3>}
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;