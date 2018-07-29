import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleMapsContainer from './GoogleMapsContainer';
import * as actionCreators from '../../actions/placesActions';
import { bindActionCreators } from 'redux';
import Place from './Place';
import './map.css';

class Places extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    }
    this.searchPlaces = this.searchPlaces.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  searchPlaces() {
    this.props.actions.getPlaces(this.state.query);
  };

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit(event) {
    this.searchPlaces();
    event.preventDefault();
  }

  render() {
    let barsEls = [];
    let parksEls = [];
    let gymsEls = [];
    if (this.props.places.length > 0) {
      barsEls = this.props.places.filter((place) => place.type === 'bar').map((place, idx) => {
        return <Place key={place.type + idx}  place={place}/>;
      });
      parksEls = this.props.places.filter((place) => place.type === 'park').map((place, idx) => {
        return <Place key={place.type + idx}  place={place}/>;
      });
      gymsEls = this.props.places.filter((place) => place.type === 'gym').map((place, idx) => {
        return <Place key={place.type + idx}  place={place}/>;
      });
    }
    return (
      <div className="is-preload">

      <div id="sidebar">
            <div className="inner">
                <div className="alt">
                  <GoogleMapsContainer />
                </div>
            </div>
      </div>

      <div id="main">

      <Link to="/myaccount" className="btn btn-light">
        <i className="fas fa-arrow-left fa-2x text-success mr-1" />
                        Back to My Account
      </Link>

      <Link to="/saved-places" className="btn btn-light">
        <i className="fas fa-map-marker fa-2x text-success mr-1" />
                        Saved Venues
      </Link>

           
          <section id="three">
            <h2>Search For Venues to Plan Your Next Meet</h2>
              <section id="search" className="alt">

                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="query" value={this.state.query} onChange={this.handleChange} placeholder="Enter City or Zip Code" />
                </form>
              </section>
          </section>
          <button onClick={this.searchPlaces}>Search</button>

          <section id="two">
            <h2> Parks </h2>
            <div className="row">
            <article className="col-6 col-12-large work-item">
            <div>
            {parksEls.length > 0 ? parksEls : 'None to display at this time'}
            </div>
            </article>
            </div>
          </section>

          <section id="two">
            <h2> Sports Bars</h2>
            <div className="row">
            <article className="col-6 col-12-large work-item">
             <div>
            {barsEls.length > 0 ? barsEls : 'None to display at this time'}
            </div>
            </article>
            </div>
          </section>

            <section id="two">
            <h2> Fitness Clubs</h2>
            <div className="row">
            <article className="col-6 col-12-large work-item">
             <div>
            {gymsEls.length > 0 ? gymsEls : 'None to display at this time'}
            </div>
            </article>
            </div>
          </section>
          
        </div>

  </div>
    );
  }
}


const mapStateToProps = state => ({
  places: state.places.places
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
};

export default connect(mapStateToProps, mapDispatchToProps)(Places);
