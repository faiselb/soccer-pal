import React, { Component } from 'react';
import * as actionCreators from '../../actions/placesActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Place extends Component {
  visitClicked() {
    window.open(this.props.place.website, '_blank');
  }

  savePlace() {
    this.props.actions.savePlace(this.props.place);
  }

  render() {
    const {name, rating, img} = this.props.place;
    return (
      <section id="two">
        <img className="image" src={img} alt={name} /> 
            <h3>{name}</h3>
            <h3>Rating: {rating}</h3>
            <button className="btn" onClick={this.visitClicked.bind(this)}>Visit Website</button>
            <button className="btn" onClick={this.savePlace.bind(this)}>Save Venue</button>
      </section>
    );
  }
}

const mapStateToProps = state => ({
});

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Place);
