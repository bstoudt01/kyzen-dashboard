import '.././App.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import React from 'react';

function Header() {
    return (
        <>
            {/* Header */}
            <Row className="App-header">
                <Col xs={2}>
                    <Image src="./logo.jpg" alt="Kyzen Logo" />
                </Col>

                <Col xs={8}>
                    AQUANOX A4651US
                </Col>

                <Col xs={2}></Col>
            </Row>



        </>
    );
}

export default Header;
