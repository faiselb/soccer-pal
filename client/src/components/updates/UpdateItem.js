import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUpdate} from '../../actions/updateActions';

class UpdateItem extends Component {
  onDeleteClick(id) {
    this.props.deleteUpdate(id);
  }


  render() {
    const { update, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            <a href="profile.html">
           
            </a>
            <br />
            <i className="fa fa-bullhorn fa-2x text-success mr-1"/>{update.name}'s Update 
            <hr/>
          </div>
          <div className="col-md-10">
            <p className="lead">{update.text}</p>
            {showActions ? (
              <span>
                <Link to={`/update/${update._id}`} className="btn btn-success mr-1">
                  Add Comments
                </Link>
                <Link to={`/update/${update._id}`} className="btn btn-success mr-1">
                  View Comments
                </Link>
                {update.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, update._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    Delete Update
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

UpdateItem.defaultProps = {
  showActions: true
};

UpdateItem.propTypes = {
  deleteUpdate: PropTypes.func.isRequired,
  update: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteUpdate})(
  UpdateItem
);
