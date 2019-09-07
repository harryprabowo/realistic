import React from 'react'
import './style.scss'

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
            <div className="sidebar-button">{props.children}</div>
        </li>
    )
}

export default { ButtonPrototype, Container, Button }