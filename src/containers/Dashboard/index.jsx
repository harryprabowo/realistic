import React from 'react'

import {
    Row,
    Col
} from 'react-bootstrap'

import {
    Card,
    IndonesiaMap
} from '../../components'

import './style.scss'

const Dashboard = () => {
    return (
        <div id="Dashboard">
            <div className="filter-card">
                <Row>
                    <Col sm={3}/>
                    <Col sm={{span: 6}}>
                        <Row>
                            <Col sm={1}/>
                            <Col sm={{span: 10}}>
                                <Card.Container>
                                    <Card.Title>A Card Title</Card.Title>
                                    <Card.Content>This is a card.</Card.Content>
                                </Card.Container>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <IndonesiaMap/>
        </div>
    )
}

export default Dashboard