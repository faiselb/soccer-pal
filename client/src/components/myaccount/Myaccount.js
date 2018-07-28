import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Myaccount extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div className="myaccount">
        <div className="container">
          This is my account page
        </div>
      </div>
    );
  }
}

Myaccount.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {})(Myaccount);