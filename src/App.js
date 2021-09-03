import React from "react";
import ApiCall from "./ApiCall";

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pos:null
    };
  }
   componentDidMount(){
    if (navigator.geolocation){
      navigator.geolocation.watchPosition((position)=>{
         //console.log("lat: ", position);
        // console.log("long: ", position.coords.longitude);
        this.setState({pos:position});
      })
    }else{
      console.log("devi darmi la posizione");
    }
  }
  render (){
    return (
      <div className="App">
        <ApiCall props={this.state}/>
      </div>
    );
  }
};

export default App;





// 'Access-Control-Allow-Origin':'*',
// 'Access-Control-Allow-Headers' : 'true',
// 'Access-Control-Allow-Methods' : 'true',
// 'Access-Control-Allow-Credentials': 'false'