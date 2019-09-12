import React, { Fragment, useState, useEffect } from 'react'
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
const MARKER_OFFSET = -30;

const markers = [
    { markerOffset: MARKER_OFFSET, name: "Jakarta Raya", coordinates: [106.8456, -6.2088], zoom: 3 },
]

const IndonesiaMap = () => {
    const [center, setCenter] = useState(INDONESIA_COORDINATE)
    const [zoom, setZoom] = useState(DEFAULT_ZOOM)
    const [marker, selectMarker] = useState()
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
        selectMarker(undefined)
    }

    const handleSelectProvince = selectedProvince => {
        const newMarker = markers.find(province => province.name === selectedProvince)

        if (!isNullOrUndefined(newMarker)) {
            setCenter(newMarker.coordinates)
            setZoom(newMarker.zoom)
            selectMarker(newMarker)
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
                                <Button variant="light" onClick={() => setZoom(zoom + 0.5)} disabled={zoom > 10}>
                                    <i className="fas fa-search-plus" />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 9 }}>
                                <Button variant="light" onClick={() => setZoom(zoom - 0.5)} disabled={zoom <= 0.5}>
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

                            <Graticule />

                            {
                                !isNullOrUndefined(marker) ? (
                                    <Markers>
                                        <Marker
                                            marker={marker}
                                            style={{
                                                default: { stroke: "#455A64" },
                                                hover: { stroke: "#FF5722" },
                                                pressed: { stroke: "#FF5722" },
                                            }}
                                        >
                                            <g transform="translate(-12, -24)">
                                                <path
                                                    fill="none"
                                                    strokeWidth="2"
                                                    strokeLinecap="square"
                                                    strokeMiterlimit="10"
                                                    strokeLinejoin="miter"
                                                    d="M20,9c0,4.9-8,13-8,13S4,13.9,4,9c0-5.1,4.1-8,8-8S20,3.9,20,9z"
                                                />
                                                <circle
                                                    fill="none"
                                                    strokeWidth="2"
                                                    strokeLinecap="square"
                                                    strokeMiterlimit="10"
                                                    strokeLinejoin="miter"
                                                    cx="12"
                                                    cy="9"
                                                    r="3"
                                                />
                                            </g>
                                            <text
                                                textAnchor="middle"
                                                y={marker.markerOffset}
                                                style={{
                                                    fontFamily: "Roboto, sans-serif",
                                                    fill: "#607D8B",
                                                    stroke: "none",
                                                }}
                                            >
                                                {marker.name}
                                            </text>
                                        </Marker>
                                    </Markers>       
                                ) : null
                            }
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