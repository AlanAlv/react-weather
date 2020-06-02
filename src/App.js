import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import Error from './components/Error';

function App() {

  // Search state
  const [ search, saveSearch ] = useState({
    city: '',
    country: ''
  });

  const [ query, saveQuery ] = useState(false);
  const [ result, saveResult ] = useState({});
  const [ error, saveError ] = useState(false);

  // Destructure city and country
  const { city, country } = search;

  useEffect(() => {
    const callAPI = async () => {

      if(query){
        const appID = 'ad1f966a4fa2b3e95a923d034c0e17ba';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appID}`;
      
        const answer = await fetch(url);
        const result = await answer.json();
  
        saveResult(result);
        saveQuery(false);

        // Checks if result was found on the query
        if(result.cod === "404"){
          saveError(true);
        } else {
          saveError(false);
        }
      }
    } 
    callAPI();
  }, [query]);

  let component;

  if(error) {
    component = <Error message="There are no results"/>
  } else {
    component = <Weather result={result}/>
  }

  return (
    <Fragment>
      <Header
        title='React Weather'
      />

      <div className="container-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form 
                search={search}
                saveSearch={saveSearch}
                saveQuery={saveQuery}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
