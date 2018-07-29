import React, { Component } from 'react';
import * as actionCreators from '../../actions/placesActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SavedPlaces extends Component {
    visitClicked(website) {
        window.open(website, '_blank');
    }

    componentWillMount(){
        this.props.actions.getSavedPlaces();
    }

    deleteVenue(place) {
        this.props.actions.deletePlaceAsync(place);
    }

  render() {
    const savedPlacesEls = this.props.savedPlaces.map((place, idx) => {
        return <div key={place.type + idx} className="mainsecond">
   
      <Link to="/places" className="btn btn-light">
        <i className=" fas fa-map fa-2x text-success mr-1" />
                        Back to Search Venues
      </Link>
      
       <Link to="/myaccount" className="btn btn-light">
        <i className="fas fa-arrow-left fa-2x text-success mr-1" />
                        Back to My Account
      </Link>
      <hr/>
  
        <section id="two">
         <div className="row">
         <article className="col-6 col-10-large work-item">
            <img className="img" src={place.img} alt={place.name} /> 
            <div className="name" >{place.name}</div>
            <div className="type" >Type: {place.type}</div>
            <div className="rating">Rating: {place.rating}</div>
            <button className="btn" onClick={this.visitClicked.bind(this, place.website)}>Visit Website</button>
            <button className="btn" onClick={this.deleteVenue.bind(this, place)}>Delete Venue</button>
        </article>
        </div>
        </section>
      </div>
    });
    return(<div>
        {savedPlacesEls.length > 0 ? savedPlacesEls : 'No saved places' }
    </div>);
  }
}

const mapStateToProps = state => ({
    savedPlaces: state.places.savedPlaces
});

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SavedPlaces);
