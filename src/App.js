import logo from './logo.svg';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import React, { useState, useEffect } from 'react';
// import numpad from './components/numpad.js';
function App() {

  //Data on the GUI
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

  const [currentTempScale, setCurrentTempScale] = useState(false)

  const [currentTempDisplay, setCurrentTempDisplay] = useState(currentData.temp)


  //Date Time Setup
  // const timeElapsed = Date.now();
  // const today = new Date(timeElapsed).toTimeString;

  // predefined data points
  const dataSet = [
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
      }

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
      }

    }
  ]
  //template for data being recorded for historical
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
      time: Date.now()

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
      time: Date.now()

    }
  ]

  // const handleNumpad = (evt) => {
  //   numpad.numpad.attach(evt)

  // }

  //Concentration +/- field changes
  const handleFieldChange = (evt) => {
    //previous state
    let stateToChange = { ...currentData };
    //"concLimit_upper"
    const targetId = evt.target.id;
    //"concLimit" / "tempLimit"
    const typeId = targetId.split("_")[0];
    //"upper" / "lower"
    const limitId = targetId.split("_")[1];

    stateToChange[typeId][limitId] = parseInt(evt.target.value);

    setCurrentData(stateToChange);

    concentrationStatus();
  };

  //reasign +/- based on range limit that was condition was not met
  const concentrationRange = () => {

    if (concentrationRangeValue < 0) {

      return `+ ${Math.abs(concentrationRangeValue)}`
    }

    else if (concentrationRangeValueLower < 0) {

      return "inSpec"
    }

    else {

      return `- ${Math.abs(concentrationRangeValueLower)}`
    }
  }


  const temperatureRange = () => {

    if (temperatureRangeValue < 0) {

      return `+ ${Math.abs(temperatureRangeValue)}`
    }

    else if (temperatureRangeValueLower < 0) {

      return "inSpec"
    }

    else {

      return `- ${Math.abs(temperatureRangeValueLower)}`
    }
  }

  //
  const concentrationDisplay = currentData.conc;
  const temperatureDisplay = currentData.temp;
  let concentrationRangeValue = (currentData.concLimit.upper - concentrationDisplay);
  let concentrationRangeValueLower = (currentData.concLimit.lower - concentrationDisplay);

  let temperatureRangeValue = (currentData.tempLimit.upper - temperatureDisplay);
  let temperatureRangeValueLower = (currentData.tempLimit.lower - temperatureDisplay);

  //concentration styling based on concentration range
  const concentrationStatus = () => {

    if (concentrationDisplay !== currentData.conc) {

      concentrationDisplay = currentData.conc;
    }

    if (concentrationDisplay > currentData.concLimit.upper || concentrationDisplay < currentData.concLimit.lower) {

      document.getElementById("concentrationDisplayId").style.color = "red";
    }
    else {

      document.getElementById("concentrationDisplayId").style.color = "black";
    }
  };

  //temperature styling base on concentration range
  const temperatureStatus = () => {

    if (temperatureDisplay !== currentData.temp) {

      temperatureDisplay = currentData.temp;

    }

    if (temperatureDisplay > currentData.tempLimit.upper || temperatureDisplay < currentData.tempLimit.lower) {

      document.getElementById("temperatureDisplayId").style.color = "red";

    }
    else {

      document.getElementById("temperatureDisplayId").style.color = "black";

    }
  };


  //temperature C to F
  const temperatureScale = () => {

    const tempF = (currentData.temp * 1.8) + 32;
    if (currentTempScale === true) {
      setCurrentTempDisplay(tempF)
    } else
      setCurrentTempDisplay(temperatureDisplay)
    // currentTempScale ? setCurrentTempDisplay(tempF) : setCurrentTempDisplay(temperatureDisplay);

  }

  const handleOptionChange = () => {

    let stateToChange = { ...currentTempScale }
    stateToChange = !currentTempScale;
    setCurrentTempScale(stateToChange);

  }


  useEffect(() => {

    temperatureStatus();

    concentrationStatus();

  }, [currentData]);


  useEffect(() => {

    temperatureScale();

  }, [currentTempScale]);



  // window.addEventListener("load", function () {
  //   // BASIC
  //   numpad.attach({ target: "concLimit_upper" });
  //   // WITH OPTIONS
  //   // numpad.attach({
  //   //   target: "demoB",
  //   //   max: 10, // 10 DIGITS
  //   //   decimal: false
  //   // });
  // });

  return (
    <>
      {/* <link rel="stylesheet" href="numpad-dark.css" />
      <script src="numpad.js"></script> */}
      <Container className="App" fluid>

        {/* Header */}
        <Row className="App-header">
          <Col xs={2}>
            <Image src="./logo.jpg" alt="Kyzen Logo" />
            {/* <Image src={require(logo)} alt="Kyzen Logo" /> */}

          </Col>
          <Col xs={8}>AQUANOX A4651US</Col>
          <Col xs={2}>Right Header</Col>
        </Row>

        {/*Current Data User View */}
        <Row className=" custom-border">

          {/* Concentration Range */}
          <Col sm={3} className="controllerMainView">
            <p>Concentration +/-</p>
            <p>{concentrationRange()}</p>
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
            <p>{temperatureRange()}</p>
          </Col>
        </Row>

        {/* Controls and Log */}
        <Row>
          <Col sm={6} className="custom-border historicalData">
            <h2>Historical Data</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Concentration</th>
                  <th>Temperature</th>
                  <th>ADDON: Timestamp? Ref Point</th>
                  <th>+Set Uppers & Lowers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{dataSetLog[0].conc}</td>
                  <td>{dataSetLog[0].temp}</td>
                  <td>{dataSetLog[0].time}</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>{dataSetLog[1].conc}</td>
                  <td>{dataSetLog[1].temp}</td>
                  <td>{dataSetLog[1].time}</td>
                  <td>@fat</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col sm={3} className="custom-border">

            <div className="btn-group-vertical ml-4 mt-4" role="group" aria-label="Basic example">
              <div className="btn-group">
                <input className="text-center form-control-sm mb-2" id="code" />
              </div>
              <div className="btn-group">

                <button type="button" className="btn btn-outline-secondary py-3" onclick="document.getElementById('code').value=document.getElementById('code').value + '1';">1</button>
                <button type="button" className="btn btn-outline-secondary py-3" onclick="document.getElementById('code').value=document.getElementById('code').value + '2';">2</button>
                <button type="button" className="btn btn-outline-secondary py-3" onclick="document.getElementById('code').value=document.getElementById('code').value + '3';">3</button>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-outline-secondary py-3" onclick="document.getElementById('code').value=document.getElementById('code').value + '4';">4</button>
                <button type="button" className="btn btn-outline-secondary py-3" onclick="document.getElementById('code').value=document.getElementById('code').value + '5';">5</button>
                <button type="button" className="btn btn-outline-secondary py-3" onclick="document.getElementById('code').value=document.getElementById('code').value + '6';">6</button>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-outline-secondary py-3" onclick="document.getElementById('code').value=document.getElementById('code').value + '7';">7</button>
                <button type="button" className="btn btn-outline-secondary py-3" onclick="document.getElementById('code').value=document.getElementById('code').value + '8';">8</button>
                <button type="button" className="btn btn-outline-secondary py-3" onclick="document.getElementById('code').value=document.getElementById('code').value + '9';">9</button>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-outline-secondary py-3" onclick="document.getElementById('code').value=document.getElementById('code').value.slice(0, -1);">&lt;</button>
                <button type="button" className="btn btn-outline-secondary py-3" onclick="document.getElementById('code').value=document.getElementById('code').value + '0';">0</button>
                <button type="button" className="btn btn-primary py-3" onclick="">Go</button>
              </div>
            </div>


          </Col>
          <Col sm={3} className="custom-border">
            <div>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Concentration (+)</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="concLimit_upper" aria-label="Small" defaultValue={currentData.concLimit.upper} onChange={handleFieldChange} aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              <br />
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Concentration (-)</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="concLimit_lower" aria-label="Small" defaultValue={currentData.concLimit.lower} onChange={handleFieldChange} aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              <br />
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Temperature (+)</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="tempLimit_upper" aria-label="Small" defaultValue={currentData.tempLimit.upper} onChange={handleFieldChange} aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              <br />
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Temperature (-)</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="tempLimit_lower" aria-label="Small" defaultValue={currentData.tempLimit.lower} onChange={handleFieldChange} aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              <br />
            </div>
            <div className="container">
              <div className="row mt-5">
                <div className="col-sm-12">

                  <form>

                    <div className="form-check">
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
                    </div>

                    <div className="form-check">
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
                    </div>

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
