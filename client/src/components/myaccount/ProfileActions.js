import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div>
      <Link to="/edit-profile" className="btn btn-light">
        <i className="far fa-edit fa-2x text-success mr-1" /> Edit My Profile
      </Link>
      <hr />
    </div>
  );
};

export default ProfileActions;