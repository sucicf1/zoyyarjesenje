import './App.css';
import locations from './database/locations.json';
import React, { useState } from 'react';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  return (
    <div className="App">
      {!selectedLocation ?
          <LocationList loc={locations} setLoc={setSelectedLocation} />
       : <div>
          <LocationDetails loc={selectedLocation} /><br /><br />
          <div id="back-button" onClick={() => setSelectedLocation(null)}>{"<- BACK"}</div>
        </div>}
    </div>
  );
}

export default App;

class LocationDetails extends React.Component {
  render() {
    const loc = this.props.loc;

    let workHours = [{day: "Monday", hours:""},
                     {day: "Tuesday", hours:""},
                     {day: "Wednesday", hours:""},
                     {day: "Thursday", hours:""},
                     {day: "Friday", hours:""},
                     {day: "Saturday", hours:""},
                     {day: "Sunday", hours:""}]; //array which contains workHours for all shifts for a given day
    loc.workShifts.forEach(wS => {
      wS.openHours.forEach(oH => {
        if(oH.dayOff === false)
          workHours[oH.day].hours += oH.startTime + ' - ' + oH.endTime + " "; 
      });
    });
    let workHoursTableContent = workHours.map((wH) =>
      <tr key={wH.day}>
        <td>{wH.day}</td>
        {(wH.hours === null || wH.hours.match(/^ *$/) !== null)?
          <td>not working</td>:
          <td>{wH.hours}</td>
        }
      </tr>
    );

    let teamMembers = loc.teamMembers.map((tM) =>
      <div key={tM.id} class="team-member">
        <img src={tM.user.avatarUrl} /><br />
        {tM.user.firstName}
      </div>
    );

    return (
      <div class="details">
        <div class="row">
          <div class="name-address">
            <h2>{loc.name}</h2>
            {loc.address}
          </div>
          <div class="image">
            <img src={loc.imageUrl} />
          </div>
        </div>
        <div class="row">
          <div class="desc-contact">
            <h3>About us</h3>
            <p>{loc.description}</p>
            <h3>Contact</h3>
            <b>E-mail: </b>{loc.email} <br />
            <b>Cell: </b>{loc.phone}
          </div>
          <div class="workHours">
            <h3>Working hours</h3>
            <table>
              <tbody>
                {workHoursTableContent}
              </tbody>
            </table>
          </div>
        </div>
        <div class="row" id="team-members-container">
          <h3>Our team</h3>
          <div class="team-members">
            {teamMembers}
          </div>
        </div>
      </div>
    );
  }
}

class LocationList extends React.Component {
  render() {
    const loc = this.props.loc;
    const listItems = loc.map((item) =>
      <div key={item.id} onClick={() => this.props.setLoc(item)} class="item">
        <img src={item.imageUrl} />
        <div class="itemInfo">
          <div class="category">
            {item.category}
          </div>
          <h5>{item.name}</h5>
          <div class="address">
            {item.address}
          </div>
          <div class="seeLoc">
            -> SEE LOCATION
          </div>
        </div>
      </div>
    );
    return (
      <div class="listContainer">
        <h2>Featured partners</h2>
        <div class="listItems">
          {listItems}
        </div>
      </div>
    );
  }
}