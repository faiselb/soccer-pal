import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Soccer Social</h1>
                <p className="lead">
                  {' '}
                  Create a user profile, get connected
                  to others and plan or join soccer meetups!
                </p>
                <hr />
              </div>
            </div>
          </div>
        </div>
       
      </div>
    );
  }
}

export default Landing;