import React, { useEffect } from "react";


var details = {
  "pointsListStr": "45.70846176147461-9.313352584838867",
  "carb": "1-0",
  "ordPrice": "asc"
}

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

const App = () => {
   useEffect(async ()=>{
    const string = "https://fathomless-chamber-48058.herokuapp.com/"+"https://carburanti.mise.gov.it/OssPrezziSearch/ricerca/position?" + formBody
    console.log(string);
    const response = await fetch(string,{
      method:'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',    
      }
    });
    const data = await response.json();
    console.log(data);
    
    // const [stations] = data.results;
    // console.log(data.results);
  }, []);
  return (
    <div className="App">
      <p>wasd</p>
    </div>
  );
};

export default App;





// 'Access-Control-Allow-Origin':'*',
// 'Access-Control-Allow-Headers' : 'true',
// 'Access-Control-Allow-Methods' : 'true',
// 'Access-Control-Allow-Credentials': 'false'