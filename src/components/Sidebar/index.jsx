import React from 'react'
import './style.scss'

import {
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap'

// SidebarButton object prototype
class ButtonPrototype {
    constructor(link, name, icon, component) {
        this.link = link;
        this.name = name;
        this.icon = icon;
        this.component = component;
    }
}

// Sidebar container component
const Container = props => {
    return (
        <div id="Sidebar">
            <ul>
                {props.children}
            </ul>
        </div>
    )
}

// Sidebar button component
const Button = props => {
    return (
        <li>
            <OverlayTrigger
                placement="right"
                delay={{
                    show: 600,
                    hide: 200
                }}
                overlay={
                    <Tooltip>{props.overlay}</Tooltip>
                }
            >
                <div className="sidebar-button">{props.children}</div>
            </OverlayTrigger>
        </li>
    )
}

export default { ButtonPrototype, Container, Button }