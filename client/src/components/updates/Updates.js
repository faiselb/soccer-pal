import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UpdateForm from './UpdateForm';
import UpdateFeed from './UpdateFeed';
import Spinner from '../common/Spinner';
import { getUpdates } from '../../actions/updateActions';

class Updates extends Component {
  componentDidMount() {
    this.props.getUpdates();
  }

  render() {
    const { updates, loading } = this.props.update;
    let updateContent;

    if (updates === null || loading) {
      updateContent = <Spinner />;
    } else {
      updateContent = <UpdateFeed updates={updates} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-sm offset-2">
              <UpdateForm />
              {updateContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Updates.propTypes = {
  getUpdates: PropTypes.func.isRequired,
  update: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  update: state.update
});

export default connect(mapStateToProps, { getUpdates })(Updates);
