import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteCreatedmeetup } from '../../actions/profileActions';

class Createdmeetup extends Component {
  onDeleteClick(id) {
    this.props.deleteCreatedmeetup(id);
  }

  render() {
    const createdmeetup = this.props.createdmeetup.map(cmeetup => (
      <tr key={cmeetup._id}>
        <td>{cmeetup.title}</td>
        <td>
          <Moment format="MM/DD/YYYY">{cmeetup.date}</Moment> 
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, cmeetup._id)}
            className="btn btn-danger"
          >
            Delete Meetup
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">My Created Meetups</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Meetup Title</th>
              <th>Meetup Date</th>
              <th />
            </tr>
            {createdmeetup}
          </thead>
        </table>
      </div>
    );
  }
}

Createdmeetup.propTypes = {
  deleteCreatedmeetup: PropTypes.func.isRequired
};

export default connect(null, { deleteCreatedmeetup })(Createdmeetup);