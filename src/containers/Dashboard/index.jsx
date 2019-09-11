import React from 'react'

import {
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap'

import {
    Card,
} from '../../components'

import Map from './components/IndonesiaMap'

import './style.scss'

const Dashboard = () => {
    return (
        <div id="Dashboard">
            <div className="filter-card">
                <Row>
                    <Col />
                    <Col sm={3}>
                        <Row>
                            <Col sm={{span: 9}}>
                                <Card.Container>
                                    <Card.Content>
                                        <div className="filter-container">
                                            <Form>
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control size="sm" type="email" placeholder="Enter email" />
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="formGridPassword">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control size="sm"  type="password" placeholder="Password" />
                                                    </Form.Group>
                                                </Form.Row>

                                                <Form.Group controlId="formGridAddress1">
                                                    <Form.Label>Address</Form.Label>
                                                    <Form.Control size="sm" placeholder="1234 Main St" />
                                                </Form.Group>

                                                <Form.Group controlId="formGridAddress2">
                                                    <Form.Label>Address 2</Form.Label>
                                                    <Form.Control size="sm" placeholder="Apartment, studio, or floor" />
                                                </Form.Group>

                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="formGridCity">
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Control size="sm" />
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="formGridState">
                                                        <Form.Label>State</Form.Label>
                                                        <Form.Control size="sm" as="select">
                                                            <option>Choose...</option>
                                                            <option>...</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="formGridZip">
                                                        <Form.Label>Zip</Form.Label>
                                                        <Form.Control size="sm" />
                                                    </Form.Group>
                                                </Form.Row>

                                                <Form.Group id="formGridCheckbox">
                                                    <Form.Check size="sm" type="checkbox" label="Check me out" />
                                                </Form.Group>

                                                <Button size="sm" variant="light" type="submit" block>
                                                    Submit
                                                </Button>
                                            </Form>
                                        </div>
                                    </Card.Content>
                                </Card.Container>
                            </Col>
                            <Col />                            
                        </Row>
                    </Col>
                </Row>
            </div>

            <div className="map-container">
                <Map/>
            </div>
        </div>
    )
}

export default Dashboard