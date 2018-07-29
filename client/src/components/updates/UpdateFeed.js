import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UpdateItem from './UpdateItem';

class UpdateFeed extends Component {
  render() {
    const { updates } = this.props;

    return updates.map(update => <UpdateItem key={update._id} update={update} />);
  }
}

UpdateFeed.propTypes = {
  updates: PropTypes.array.isRequired
};

export default UpdateFeed;
