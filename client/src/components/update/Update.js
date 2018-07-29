import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UpdateItem from '../updates/UpdateItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import { getUpdate } from '../../actions/updateActions';

class Update extends Component {
  componentDidMount() {
    this.props.getUpdate(this.props.match.params.id);
  }

  render() {
    const { update, loading } = this.props.update;
    let updateContent;

    if (update === null || loading || Object.keys(update).length === 0) {
      updateContent = <Spinner />;
    } else {
      updateContent = (
        <div>
          <UpdateItem update={update} showActions={false} />
          <CommentForm updateId={update._id} />
          <CommentFeed updateId={update._id} comments={update.comments} />
        </div>
      );
    }

    return (
      <div className="update">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
            <div className="col-sm-10 col-sm offset-2">
              <Link to="/updates" className="btn btn-light mb-3">
              <i className="fas fa-arrow-left fa-1x text-success mr-1" />
                Back To Updates
              </Link>
              </div>
              {updateContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Update.propTypes = {
  getUpdate: PropTypes.func.isRequired,
  update: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  update: state.update
});

export default connect(mapStateToProps, { getUpdate })(Update);
