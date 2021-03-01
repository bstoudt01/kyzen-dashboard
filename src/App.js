import './App.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
// import DataView from './components/DataView';
// import numpad from './components/numpad.js';
function App() {

  //Example data set used for inital view
  const [currentData, setCurrentData] = useState({
    conc: 52,
    temp: 38,
    tempLimit: {
      upper: 75,
      lower: 35
    },
    concLimit: {
      upper: 60,
      lower: 10
    }
  });

  //Temperature Scale boolean-state Celcius / Fahrenheit
  const [currentTempScale, setCurrentTempScale] = useState(false)

  //Temperature Display
  const [currentTempDisplay, setCurrentTempDisplay] = useState(currentData.temp)

  //selected input to be changed includes id and value
  const [currentOnScreenInput, setCurrentOnScreenInput] = useState({})

  //state to hold onto historical data
  // const [currentDataLog, setCurrentDataLog] = useState([{
  //   conc: "",
  //   temp: "",
  //   tempLimit: {
  //     upper: "",
  //     lower: ""
  //   },
  //   concLimit: {
  //     upper: "",
  //     lower: ""
  //   },
  //   time: Date.now(),
  //   tempScale: ""
  // }])



  //template array for historical data to be charted
  const dataSetLog = [
    {
      conc: 15,
      temp: 38,
      tempLimit: {
        upper: 75,
        lower: 35
      },
      concLimit: {
        upper: 20,
        lower: 10
      },
      time: Date.now(),
    },
    {
      conc: 16,
      temp: 39,
      tempLimit: {
        upper: 75,
        lower: 35
      },
      concLimit: {
        upper: 20,
        lower: 10
      },
      time: Date.now(),
    }
  ]

  //main display values
  let concentrationDisplay = currentData.conc;
  let temperatureDisplay = currentData.temp;

  //limit ranges
  let concentrationRangeValue = (currentData.concLimit.upper - concentrationDisplay);
  let concentrationRangeValueLower = (currentData.concLimit.lower - concentrationDisplay);
  let temperatureRangeValue = (currentData.tempLimit.upper - temperatureDisplay);
  let temperatureRangeValueLower = (currentData.tempLimit.lower - temperatureDisplay);

  //Concentration and Temperature input field changes
  //direct manipulation only, this is not for the onscreen numpad input
  const handleFieldChange = (evt) => {

    //test if value string contains only numbers
    let isnum = /^\d+$/.test(evt.target.value);

    //previous state
    let stateToChange = { ...currentData };

    //"concLimit_upper"
    const targetId = evt.target.id;

    //"concLimit" / "tempLimit"
    const typeId = targetId.split("_")[0];

    //"upper" / "lower"
    const limitId = targetId.split("_")[1];

    //alert if not all chars were digits
    if (isnum === false) {

      alert("Numbers Only, Try Again.");
    }

    //alert if upper limit is set below lower
    else if (limitId === "upper" && evt.target.value < currentData[typeId].lower) {

      alert(`This limit must be set above ${currentData[typeId].lower}... reset the lower limit first`)
    }

    //alert if lower limit is set above upper
    else if (limitId === "lower" && evt.target.value > currentData[typeId].lower) {

      alert(`This limit must be set below ${currentData[typeId].upper}... reset the upper limit first`)
    }

    else {

      //update currentData to include the newly defined limit
      stateToChange[typeId][limitId] = parseInt(evt.target.value);

      setCurrentData(stateToChange);

      concentrationStatus();
    }
  };

  //reasign concentration range value based on if a range-limit condition was not met
  const concentrationRange = () => {

    if (concentrationRangeValue < 0) {

      return `+ ${Math.abs(concentrationRangeValue)}`
    }

    else if (concentrationRangeValueLower < 0) {

      return "In Spec"
    }

    else {

      return `- ${Math.abs(concentrationRangeValueLower)}`
    }
  }

  //reasign temperature range value based on if a range-limit condition was not met
  const temperatureRange = () => {

    if (temperatureRangeValue < 0) {

      return `+ ${Math.abs(temperatureRangeValue)}`
    }

    else if (temperatureRangeValueLower < 0) {

      return "In Spec"
    }

    else {

      return `- ${Math.abs(temperatureRangeValueLower)}`
    }
  }

  //concentration styling based on concentration range
  const concentrationStatus = () => {

    if (concentrationDisplay !== currentData.conc) {

      concentrationDisplay = currentData.conc;
    }

    if (concentrationDisplay > currentData.concLimit.upper || concentrationDisplay < currentData.concLimit.lower) {

      document.getElementById("concentrationDisplayId").style.color = "red";

      document.getElementById("concentrationRangeId").style.color = "red";
    }

    else {

      document.getElementById("concentrationDisplayId").style.color = "black";

      document.getElementById("concentrationRangeId").style.color = "black";
    }
  };

  //temperature styling base on concentration range
  const temperatureStatus = () => {

    if (currentTempDisplay !== currentData.temp) {

      currentTempDisplay = currentData.temp;
    }

    if (currentTempDisplay > currentData.tempLimit.upper || currentTempDisplay < currentData.tempLimit.lower) {

      document.getElementById("temperatureDisplayId").style.color = "red";

      document.getElementById("temperatureRangeId").style.color = "red";
    }

    else {

      document.getElementById("temperatureDisplayId").style.color = "black";

      document.getElementById("temperatureRangeId").style.color = "black";
    }
  };


  //temperature display adjustment C to F
  const temperatureScale = () => {

    const tempF = (currentData.temp * 1.8) + 32;

    if (currentTempScale === true) {

      setCurrentTempDisplay(tempF)

    } else {

      setCurrentTempDisplay(temperatureDisplay)
    }
  }

  //Select Options for Celcius or Farenheiht
  const handleOptionChange = () => {

    let stateToChange = { ...currentTempScale }

    stateToChange = !currentTempScale;

    setCurrentTempScale(stateToChange);

  }

  //Select limiting input to be changed via the onScreen numpad
  const getInputOnScreen = (evt) => {

    let inputValue = evt.target.value;

    let inputId = evt.target.id;

    //place input value and id into state
    setCurrentOnScreenInput({ "value": inputValue, "inputId": inputId })

    //place input value into numpad input field
    document.getElementById('code').value = evt.target.value;

  }

  //Submit limiting input to be changed from the onScreeen numpad
  const postInputOnScreen = (value) => {

    let isnum = /^\d+$/.test(value);

    let stateToChange = { ...currentData };

    const targetId = currentOnScreenInput.inputId

    const typeId = targetId.split("_")[0];

    const limitId = targetId.split("_")[1];

    if (isnum === false) {

      alert("Numbers Only, Try Again.");

      document.getElementById('code').value = "";

      setCurrentOnScreenInput({});
    }

    //alert if upper limit is set below lower
    else if (limitId === "upper" && value < currentData[typeId].lower) {

      alert(`This limit must be set above ${currentData[typeId].lower}... reset the lower limit first`)

      //clear numpad input and temp state
      document.getElementById('code').value = "";

      setCurrentOnScreenInput({});
    }

    //alert if upper limit is set below lower
    else if (limitId === "lower" && value > currentData[typeId].upper) {

      alert(`This limit must be set below ${currentData[typeId].upper}... reset the upper limit first`)

      document.getElementById('code').value = "";

      setCurrentOnScreenInput({})
    }
    else {

      //update state with new value submited
      stateToChange[typeId][limitId] = parseInt(value);

      setCurrentData(stateToChange);

      //move new number to limit input field
      //should probbably be reset by the state change above, but it wasnt refreshing
      document.getElementById(targetId).value = value;

      document.getElementById('code').value = "";

      setCurrentOnScreenInput({})
    }
  }

  useEffect(() => {

    temperatureScale();

  }, [currentTempScale]);

  useEffect(() => {

    temperatureStatus();

    concentrationStatus();

  }, [currentData]);

  return (
    <>
      <Container className="App" fluid>

        <Header />

        {/*Current Data User View */}
        <Row className=" custom-border">

          {/* Current Concentration Range */}
          <Col sm={3} className="controllerMainView">
            <h4>Current Concentration</h4>

            <p>Concentration +/-</p>
            <p id="concentrationRangeId">{concentrationRange()}</p>
          </Col>

          {/* Current Concentration */}
          <Col sm={6} className="custom-border">
            <h1>Current Concentration</h1>
            <p id="concentrationDisplayId"> {concentrationDisplay}</p>
          </Col>

          {/* Current Temperature & Range */}
          <Col sm={3} className="custom-border">
            <h4>Current Temperature</h4>
            <p id="temperatureDisplayId">{currentTempDisplay}</p>
            <p>Temperature +/-</p>
            <p id="temperatureRangeId">{temperatureRange()}</p>
          </Col>
        </Row>

        {/* Controls and Log */}
        <Row>
          {/* Historical Data Log */}
          <Col sm={6} className="custom-border historicalData">
            <h2>Historical Data</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Concentration</th>
                  <th>Temperature</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{dataSetLog[0].conc}</td>
                  <td>{dataSetLog[0].temp}</td>
                  <td>{dataSetLog[0].time}</td>
                </tr>
                <tr>
                  <td>{dataSetLog[1].conc}</td>
                  <td>{dataSetLog[1].temp}</td>
                  <td>{dataSetLog[1].time}</td>
                </tr>
              </tbody>
            </Table>
          </Col>

          {/* numpad */}
          <Col sm={3} className="custom-border">

            <div className="btn-group-vertical ml-4 mt-4" role="group" aria-label="Basic example">
              <div className="btn-group">
                <input className="text-center form-control-sm mb-2" id="code" />
              </div>
              <div className="btn-group">

                <button type="button" id="button1" className="btn btn-outline-secondary py-3" onClick={() => { document.getElementById('code').value = document.getElementById('code').value + 1 }}>1</button>
                <button type="button" id="button2" className="btn btn-outline-secondary py-3" onClick={() => { document.getElementById('code').value = document.getElementById('code').value + 2 }}>2</button>
                <button type="button" id="button3" className="btn btn-outline-secondary py-3" onClick={() => { document.getElementById('code').value = document.getElementById('code').value + 3 }}>3</button>
              </div>
              <div className="btn-group">
                <button type="button" id="button4" className="btn btn-outline-secondary py-3" onClick={() => { document.getElementById('code').value = document.getElementById('code').value + 4 }}>4</button>
                <button type="button" id="button5" className="btn btn-outline-secondary py-3" onClick={() => { document.getElementById('code').value = document.getElementById('code').value + 5 }}>5</button>
                <button type="button" id="button6" className="btn btn-outline-secondary py-3" onClick={() => { document.getElementById('code').value = document.getElementById('code').value + 6 }}>6</button>
              </div>
              <div className="btn-group">
                <button type="button" id="button7" className="btn btn-outline-secondary py-3" onClick={() => { document.getElementById('code').value = document.getElementById('code').value + 7 }}>7</button>
                <button type="button" id="button8" className="btn btn-outline-secondary py-3" onClick={() => { document.getElementById('code').value = document.getElementById('code').value + 8 }}>8</button>
                <button type="button" id="button9" className="btn btn-outline-secondary py-3" onClick={() => { document.getElementById('code').value = document.getElementById('code').value + 9 }}>9</button>
              </div>
              <div className="btn-group">
                <button type="button" id="buttonRemove" className="btn btn-outline-secondary py-3" onClick={() => { document.getElementById('code').value = document.getElementById('code').value.slice(0, -1) }}>&lt;</button>
                <button type="button" id="button0" className="btn btn-outline-secondary py-3" onClick={() => { document.getElementById('code').value = document.getElementById('code').value + 0 }}>0</button>
                <button type="button" id="buttonGo" className="btn btn-primary py-3" onClick={(evt) => postInputOnScreen(document.getElementById('code').value)}> Go</button>
              </div>
            </div>
          </Col>

          {/* Concentraion & Temperature Limit inputs */}
          <Col sm={3} className="custom-border">
            <div>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Concentration (+)</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="concLimit_upper" aria-label="Small" defaultValue={currentData.concLimit.upper} onChange={handleFieldChange} onClick={(evt) => getInputOnScreen(evt)} aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              <br />
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Concentration (-)</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="concLimit_lower" aria-label="Small" defaultValue={currentData.concLimit.lower} onChange={handleFieldChange} onClick={(evt) => getInputOnScreen(evt)} aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              <br />
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Temperature (+)</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="tempLimit_upper" aria-label="Small" defaultValue={currentData.tempLimit.upper} onChange={handleFieldChange} onClick={(evt) => getInputOnScreen(evt)} aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              <br />
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Temperature (-)</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="tempLimit_lower" aria-label="Small" defaultValue={currentData.tempLimit.lower} onChange={handleFieldChange} onClick={(evt) => getInputOnScreen(evt)} aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              <br />
            </div>

            {/* Celcius & Farenheit Radio Selections, default Celcius */}
            <div className="container">
              <div className="row mt-5">
                <div className="col-sm-12">
                  <form>
                    <Row>
                      <Col className="form-check">
                        <label>
                          <input
                            type="radio"
                            name="react-tips"
                            value="c"
                            checked={currentTempScale === false}
                            className="form-check-input"
                            onChange={handleOptionChange}
                          />
                          Celcius
                        </label>
                      </Col>

                      <Col className="form-check">
                        <label>
                          <input
                            type="radio"
                            name="react-tips"
                            value="f"
                            className="form-check-input"
                            checked={currentTempScale === true}
                            onChange={handleOptionChange}
                          />
                          Fahrenheit
                        </label>
                      </Col>
                    </Row>
                  </form>
                </div>
              </div>
            </div>

          </Col>
        </Row>


      </Container>


    </>
  );
}

export default App;
