import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCreatedmeetup } from '../../actions/profileActions';

class AddCreatedmeetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetuptitle: '',
      createdby: '',
      location: '',
      meetupdate: '',
      meetuptime: '',
      description: '',
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const cmeetupData = {
      title: this.state.meetuptitle,
      location: this.state.location,
      date: this.state.meetupdate,
      time: this.state.meetuptime,
      description: this.state.description
    };

    this.props.addCreatedmeetup(cmeetupData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-createdmeetup">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/myaccount" className="btn btn-light">
               <i className="fas fa-arrow-left fa-1x text-success mr-1" />
                Back to My Account
              </Link>
              <h1 className="display-4 text-center">Create Soccer Meetup</h1>
              <p className="lead text-center">
                Create soccer meetup for your network to join
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Meetup Title"
                  name="meetuptitle"
                  value={this.state.meetuptitle}
                  onChange={this.onChange}
                  error={errors.meetuptitle}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <h6> * Date </h6>
                <TextFieldGroup
                  name="meetupdate"
                  type="date"
                  value={this.state.meetupdate}
                  onChange={this.onChange}
                  error={errors.meetupdate}
                />
                <h6> Time </h6>
                <TextFieldGroup
                  placeholder="meetuptime"
                  name="meetuptime"
                  value={this.state.meetuptime}
                  onChange={this.onChange}
                  error={errors.meetuptime}
                />
                
                <TextAreaFieldGroup
                  placeholder="Short Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the the meetup"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddCreatedmeetup.propTypes = {
  addCreatedmeetup: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addCreatedmeetup })(
  withRouter(AddCreatedmeetup)
);