import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/myaccount');
        }
    }
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                            <hr  />
                            <hr  />
                            <hr  />
                            <hr  />
                                <h1 className="display-3 mb-4">Soccer Social</h1>
                                <p className="lead">
                                    {' '}
                                    Create a user profile, get connected
                                    to others and plan or join soccer meetups!
                </p>
                                <hr />
                                <Link to="/register" className="btn btn-lg btn-success mr-2">
                                    Sign Up
                </Link>
                                <Link to="/login" className="btn btn-lg btn-light">
                                    Login
                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);