import React from 'react'

import { Card } from '../../components'

import './style.scss'


const Dashboard = () => {
    return (
        <div id="Dashboard">
            <div className="filter-card">
                <Card.Container>
                    <Card.Title>A Card Title</Card.Title>
                    <Card.Content>This is a card.</Card.Content>
                </Card.Container>
            </div>
        </div>
    )
}

export default Dashboard