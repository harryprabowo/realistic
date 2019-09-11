import React, { useEffect } from 'react'

import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker,
} from "react-simple-maps"

import ReactTooltip from "react-tooltip"

import TopoJson from './topo.json'

import './style.scss'

const IndonesiaMap = () => {
    useEffect(() => {
        setTimeout(() => {
            ReactTooltip.rebuild()
        }, 100)
    })

    return (
        <div className="map-container">
            <ComposableMap
                projection={'mercator'}
                projectionConfig={{
                    scale: 1000,
                }}
            >
                <ZoomableGroup
                    center={[118, -3]}
                    disablePanning
                >
                    <Geographies geography={TopoJson} >
                        {(geographies, projection) =>
                            geographies.map((geography, i) =>
                                <Geography
                                    key={i}
                                    data-tip={geography.properties.NAME_1}
                                    geography={geography}
                                    projection={projection}
                                    style={{
                                        default: {
                                            fill: "#ECEFF1",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                        },
                                        hover: {
                                            fill: "#CFD8DC",
                                            stroke: "#607D8B",
                                            strokeWidth: 1,
                                            outline: "none",
                                        },
                                        pressed: {
                                            fill: "#FF5722",
                                            stroke: "#607D8B",
                                            strokeWidth: 1,
                                            outline: "none",
                                        }
                                    }}
                                />
                            )
                        }
                    </Geographies>
                </ ZoomableGroup>
            </ ComposableMap>
            <ReactTooltip />
        </div>
    )
}

export default IndonesiaMap