import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/updateActions';

class CommentItem extends Component {
  onDeleteClick(updateId, commentId) {
    this.props.deleteComment(updateId, commentId);
  }

  render() {
    const { comment, updateId, auth } = this.props;

    return (
      <div className="col-sm-10 col-sm offset-2">
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            <a href="profile.html">
            </a>
            <br />
            <i className="fas fa-comment fa-2x text-success mr-1"/>{comment.name}'s Comment
            <hr/>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, updateId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                Delete Comment
              </button>
            ) : null}
          </div>
        </div>
      </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  updateId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
