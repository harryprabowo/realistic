import React from 'react'

import './style.scss'

const Container = props => {
    return (
        <div className="card">{props.children}</div>
    )
}

const Title = props => {
    return (
        <h5 className="card-title">{props.children}</h5>
    )
}

const Content = props => {
    return (
        <span>{props.children}</span>
    )
}


export default {
    Container,
    Title,
    Content
}