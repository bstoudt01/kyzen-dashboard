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
import NumPad from 'react-numpad';
import React, { useState, useEffect } from 'react'

function App() {
  const [currentData, setCurrentData] = useState({
    conc: 13,
    temp: 38,
    tempLimit: {
      upper: 75,
      lower: 35
    },
    concLimit: {
      upper: 20,
      lower: 10
    }
  });

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

  const concentrationDisplay = currentData.conc;
  const temperatureDisplay = currentData.temp;
  //concentration styling based on under/over
  const concentrationStatus = () => {
    if (concentrationDisplay !== currentData.conc) {
      concentrationDisplay = currentData.conc
    }
    if (concentrationDisplay > currentData.concLimit.upper || concentrationDisplay < currentData.concLimit.lower) {
      document.getElementById("concentrationDisplayId").style.color = "red";
    }
  }
  useEffect(() => {

    concentrationStatus()
  }, [])


  return (
    <>
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

        {/* Focus */}
        <Row className=" custom-border">
          <Col sm={3} className="controllerMainView">
            <p>Concentration +/-</p>
          </Col>
          <Col sm={6} className="custom-border">
            <h1>Current Concentration</h1>
            <p id="concentrationDisplayId"> {concentrationDisplay}</p>
          </Col>
          <Col sm={3} className="custom-border">
            <h4>Current Temperature</h4>
            <p>{temperatureDisplay}</p>
            <p>Temperature +/-</p>
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

            {/* <div className="btn-group-vertical ml-4 mt-4" role="group" aria-label="Basic example">
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
            </div> */}
          </Col>
          <Col sm={3} className="custom-border">
            <div>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Concentration (+)</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Small" defaultValue={dataSet[1].concLimit.upper} aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              <br />
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Concentration (-)</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Small" defaultValue={dataSet[1].concLimit.lower} aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              <br />
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Temperature (+)</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Small" defaultValue={dataSet[1].tempLimit.upper} aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              <br />
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Temperature (-)</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Small" defaultValue={dataSet[1].tempLimit.lower} aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              <br />
            </div>
          </Col>
        </Row>

      </Container>


    </>
  );
}

export default App;
