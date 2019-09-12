import React, { Fragment, useState, useEffect, useRef } from 'react'
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Graticule,
    Markers,
    Marker,
} from "react-simple-maps"
import { Motion, spring } from "react-motion"

import ReactTooltip from "react-tooltip"
import {
    Alert,
    Button,
    Row,
    Col,
} from 'react-bootstrap'

import TopoJson from './topo.json'
import './style.scss'
import { isNullOrUndefined } from 'util'

const INDONESIA_COORDINATE = [118, -3]
const DEFAULT_ZOOM = 0.5

const provinces = [
    { name: "Jakarta Raya", coordinates: [107, -7], zoom: 3 },
]

const IndonesiaMap = () => {
    const [center, setCenter] = useState(INDONESIA_COORDINATE)
    const [zoom, setZoom] = useState(DEFAULT_ZOOM)
    const [currentProvince, selectProvince] = useState()
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => { // componentDidUpdate
        
    })

    useEffect(() => { // componentDidMount

        return () => ( // componentWillUnmount
            null
        )
    }, [])

    const handleResetMap = () => {
        setCenter(INDONESIA_COORDINATE)
        setZoom(DEFAULT_ZOOM)
        selectProvince(undefined)
    }

    const handleSelectProvince = selectedProvince => {
        const newProvince = provinces.find(province => province.name === selectedProvince)

        if (!isNullOrUndefined(newProvince)) {
            setCenter(newProvince.coordinates)
            setZoom(newProvince.zoom)
            selectProvince(newProvince.name)
        } else {
            handleShowAlert()
        }
    }

    const handleShowAlert = () => {
        setShowAlert(true)

        setTimeout(() => {
            setShowAlert(false)
        }, 3000)
    }

    return (
        <Fragment>
            <div className="map-alert">
                <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    Corresponding province data is unavailable.
                </Alert>
            </div>

            <div className="map-option">
                <Row>
                    <Col/>
                    <Col lg={1}>
                        <Row>
                            <Col lg={{ span: 9 }}>
                                <Button variant="light">
                                    <i className="fas fa-search-plus" />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 9 }}>
                                <Button variant="light" >
                                    <i className="fas fa-search-minus" />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 9 }}>
                                <Button variant="light" onClick={handleResetMap}>
                                    <i className="fas fa-undo-alt" />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <Motion
                style={{
                    zoom: spring(zoom, { stiffness: 50, damping: 15 }),
                    x: spring(center[0], { stiffness: 50, damping: 15 }),
                    y: spring(center[1], { stiffness: 50, damping: 15 }),
                }}
            >
                {({ zoom, x, y }) => (
                    <ComposableMap
                        projection={'mercator'}
                        projectionConfig={{
                            scale: 2000,
                        }}
                    >
                        <ZoomableGroup
                            center={[x,y]}
                            zoom={zoom}
                            onMoveStart={e => [x, y] = e}
                            onMoveEnd={e => {
                                setCenter(e)
                            }}
                        >
                            <Geographies geography={TopoJson} >
                                {(geographies, projection) =>
                                    geographies.map((geography, i) =>
                                        <Geography
                                            key={i}
                                            data-for="geography-info"
                                            data-tip={geography.properties.NAME_1}
                                            geography={geography}
                                            projection={projection}
                                            onClick={() => handleSelectProvince(geography.properties.NAME_1)}
                                            style={{
                                                default: {
                                                    fill: geography.properties.NAME_1 === currentProvince ? "#FF5722" : "#ECEFF1",
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

                            <Graticule />

                            {/* {
                                !isNullOrUndefined(currentProvince) ? (
                                    <Markers>
                                        {markers.map((marker, i) => (
                                            <Marker
                                                key={i}
                                                marker={marker}
                                                style={{
                                                    default: { fill: "#FF5722" },
                                                    hover: { fill: "#FFFFFF" },
                                                    pressed: { fill: "#FF5722" },
                                                }}
                                            >
                                                <circle
                                                    cx={0}
                                                    cy={0}
                                                    r={10}
                                                    style={{
                                                        stroke: "#FF5722",
                                                        strokeWidth: 3,
                                                        opacity: 0.9,
                                                    }}
                                                />
                                                <text
                                                    textAnchor="middle"
                                                    y={marker.markerOffset}
                                                    style={{
                                                        fontFamily: "Roboto, sans-serif",
                                                        fill: "#607D8B",
                                                    }}
                                                >
                                                    {marker.name}
                                                </text>
                                            </Marker>
                                        ))}
                                    </Markers>       
                                ) : null
                            } */}
                        </ ZoomableGroup>
                    </ ComposableMap>
                )}
            </Motion>

            <ReactTooltip 
                id="geography-info"
                type="info"
                getContent={region =>
                    <div>
                        {region}
                    </div>
                }
            />
        </Fragment>
    )
}

export default IndonesiaMap