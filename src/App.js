import './App.css';
import locations from './database/locations.json';
import React, { useState } from 'react';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  return (
    <div className="App">
      {!selectedLocation ?
          <LocationList loc={locations} />
       : <div>
          ...INSERT SELECTED LOCATION DATA HERE...
        </div>}
      {!!selectedLocation &&  <div onClick={()=>setSelectedLocation(null)}>{"<- BACK"}</div>}
    </div>
  );
}

export default App;

class LocationList extends React.Component {
  render() {
    const loc = this.props.loc;
    const listItems = loc.map((item) =>
      <div key={item.id} class="item">
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
      <div class="listItems">
        {listItems}
      </div>
    );
  }
}