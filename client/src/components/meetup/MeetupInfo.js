import React, { Component } from 'react';
import Moment from 'react-moment';

class MeetupInfo extends Component {
  render() {
    const { createdmeetup, joinMeetupById, leaveMeetupById, currentUser } = this.props;

    const cmeetupItems = createdmeetup.map(cmeetup => (
      <li key={cmeetup._id} className="list-group-item">
        <h4>{cmeetup.title}</h4>
        <p>
          <Moment format="MM/DD/YYYY">{cmeetup.date}</Moment> 
          
        </p>
        <p>
          <strong>Created By:</strong> {cmeetup.createdby}
        </p>
        <p>
          {cmeetup.location === '' ? null : (
            <span>
              <strong>Location: </strong> {cmeetup.location}
            </span>
          )}
        </p>
        <p>
          {cmeetup.description === '' ? null : (
            <span>
              <strong>Description: </strong> {cmeetup.description}
            </span>
          )}
        </p>

        <div>
          { cmeetup.joinedUserNames.length === 0 ? null : <div>
            <hr/>
            <div className=" fas fa-users text-success mr-1"/><strong>Joined Users:</strong><hr/>
            { cmeetup.joinedUserNames.map((name, i)=> {
            return <div key={"name" + i}>
            <div className=" fas fa-user-plus text-success mr-1"/>
              {name}
            </div>
            }) }
            </div>
          }          
          
        </div>

      {
        cmeetup.joinedUsers.indexOf(currentUser.id) !== -1 ?
          <div onClick={()=> { 
            leaveMeetupById(cmeetup._id)
          }} className="btn btn-light">
          <i className="fas fa-futbol text-success mr-1" />
          Leave Meetup
        </div>
        :
        <div onClick={()=> { 
          joinMeetupById(cmeetup._id)
        }} className="btn btn-light">
        <i className="fas fa-futbol text-success mr-1" />
        Join Meetup
      </div>
      }

      
      </li>
    ));

    return (
      <div className="row">
        <div className="col-sm-10 col-sm offset-1">
          
          {cmeetupItems.length > 0 ? (

            <ul className="list-group">{cmeetupItems}</ul>
          ) : (
            <p className="text-center">No Created Meetup Found</p>
          )}

        </div>
  
      </div>
    );
  }
}

export default MeetupInfo;