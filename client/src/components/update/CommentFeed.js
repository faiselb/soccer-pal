import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
  render() {
    const { comments, updateId } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} updateId={updateId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  updateId: PropTypes.string.isRequired
};

export default CommentFeed;
