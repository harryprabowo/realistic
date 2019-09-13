import React, { Fragment, useState, useEffect } from "react";
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Graticule,
    Markers,
    Marker
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Motion, spring } from "react-motion";

import ReactTooltip from "react-tooltip";
import { Alert, Button, Row, Col } from "react-bootstrap";

import TopoJson from "./topo.json";
import ProvinsiJson from "./provinsi.json"

import "./style.scss";
import { isNullOrUndefined } from "util";

const INDONESIA_COORDINATE = [118, -3];
const DEFAULT_ZOOM = 0.5;
const MARKER_OFFSET = -30;
const PROVINCE_ZOOM = 2;

const popScale = scaleLinear()
    .domain([0, 50, 100])
    .range(["red", "yellow", "green"]);

const IndonesiaMap = ({ data, ranking }) => {
    const [center, setCenter] = useState(INDONESIA_COORDINATE);
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);
    const [hoveredGeography, setHoveredGeography] = useState();
    const [selectedGeography, setSelectedGeography] = useState();
    const [marker, selectMarker] = useState();
    const [showAlert, setShowAlert] = useState(false);
    
    useEffect(() => {
        // componentDidUpdate
    });

    useEffect(() => {
        // componentDidMount
        ProvinsiJson.map(province => province.coordinates.reverse())

        return () =>
            // componentWillUnmount
            ProvinsiJson.map(province => province.coordinates.reverse())
    }, []);

    const handleResetMap = () => {
        setCenter(INDONESIA_COORDINATE);
        setZoom(DEFAULT_ZOOM);
        selectMarker(undefined);
        setSelectedGeography(undefined);
    };

    const handleGeographyMouseMove = e => {
        setHoveredGeography(e.properties.NAME_1)
    }

    const handleGeographyMouseLeave = e => {
        setHoveredGeography(undefined)
    }

    const handleSelectGeography = e => {
        const newMarker = ProvinsiJson.find(
            province => province.name === e.properties.NAME_1
        );

        if (!isNullOrUndefined(newMarker)) {
            newMarker.markerOffset = MARKER_OFFSET
            newMarker.zoom = PROVINCE_ZOOM

            setCenter(newMarker.coordinates);
            setZoom(newMarker.zoom);
            selectMarker(newMarker);
            setSelectedGeography(newMarker.name);
        } else {
            handleShowAlert();
        }
    };

    const handleShowAlert = () => {
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    return (
        <Fragment>
            <div className="map-alert">
                <Alert
                    show={showAlert}
                    variant="warning"
                    onClose={() => setShowAlert(false)}
                    dismissible
                >
                    Corresponding province data is unavailable.
                </Alert>
            </div>

            <div className="map-option">
                <Row>
                    <Col />
                    <Col lg={1}>
                        <Row>
                            <Col lg={{ span: 9 }}>
                                <Button
                                    variant="light"
                                    onClick={() => setZoom(zoom * 2)}
                                    disabled={zoom > 10}
                                >
                                    <i className="fas fa-search-plus" />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 9 }}>
                                <Button
                                    variant="light"
                                    onClick={() => setZoom(zoom / 2)}
                                    disabled={zoom <= 0.5}
                                >
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
                defaultStyle={{
                    zoom: DEFAULT_ZOOM,
                    x: INDONESIA_COORDINATE[0],
                    y: INDONESIA_COORDINATE[1],
                }}
                style={{
                    zoom: spring(zoom, { stiffness: 50, damping: 15 }),
                    x: spring(center[0], { stiffness: 50, damping: 15 }),
                    y: spring(center[1], { stiffness: 50, damping: 15 })
                }}
            >
                {({ zoom, x, y }) => (
                    <ComposableMap
                        projection={"mercator"}
                        projectionConfig={{ scale: 2000 }}
                    >
                        <ZoomableGroup
                            center={[x, y]}
                            zoom={zoom}
                            disablePanning
                        >
                            <Geographies
                                geography={TopoJson}
                                disableOptimization
                            >
                                {(geographies, projection) =>
                                    geographies.map(geography => (
                                        <Geography
                                            key={`${geography.properties.CC_1}`}
                                            cacheId={`${geography.properties.CC_1}`}
                                            data-for="geography-info"
                                            data-tip={geography.properties.NAME_1}
                                            geography={geography}
                                            projection={projection}
                                            onClick={handleSelectGeography}
                                            onMouseMove={handleGeographyMouseMove}
                                            onMouseLeave={handleGeographyMouseLeave}
                                            style={{
                                                default: {
                                                    fill: Object.entries(data).length === 0 && data.constructor === Object
                                                        ? "#ECEFF1"
                                                        : popScale(data[geography.properties.NAME_1.toUpperCase()]),
                                                    stroke: "#607D8B",
                                                    strokeWidth: 0.75 * 1 / zoom,
                                                    outline: "none"
                                                },
                                                hover: {
                                                    fill: Object.entries(data).length === 0 && data.constructor === Object
                                                        ? "#CFD8DC"
                                                        : popScale(data[geography.properties.NAME_1.toUpperCase()]),
                                                    stroke: Object.entries(data).length === 0 && data.constructor === Object
                                                        ? "#607D8B"
                                                        : "#0e0e0e",
                                                    strokeWidth: Object.entries(data).length === 0 && data.constructor === Object
                                                        ? 0.75 * 1 / zoom
                                                        : 1 * 1 / zoom,
                                                    outline: "none"
                                                },
                                                pressed: {
                                                    fill: Object.entries(data).length === 0 && data.constructor === Object
                                                        ? "#FF5722"
                                                        : popScale(data[geography.properties.NAME_1.toUpperCase()]),
                                                    stroke: "#607D8B",
                                                    strokeWidth: 1 / zoom,
                                                    outline: "none"
                                                }
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>

                            <Graticule />

                            {!isNullOrUndefined(marker) ? (
                                <Markers>
                                    <Marker
                                        marker={marker}
                                        style={{
                                            default: { stroke: "#455A64" },
                                            hover: { stroke: "#FF5722" },
                                            pressed: { stroke: "#FF5722" }
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
                                                stroke: "none"
                                            }}
                                        >
                                            {marker.name}
                                        </text>
                                    </Marker>
                                </Markers>
                            ) : null}
                        </ZoomableGroup>
                    </ComposableMap>
                )}
            </Motion>

            <ReactTooltip
                id="geography-info"
                getContent={region => (
                    <div className="map-tooltip">
                        <strong>{region}</strong>
                        {
                            isNullOrUndefined(region) ? null : (
                                isNullOrUndefined(data[region.toUpperCase()]) ? null : (
                                    <Fragment>
                                        <br />
                                        <span>Peringkat: {ranking.indexOf(region.toUpperCase()) + 1}/{ranking.length}</span> <br />
                                        <span>Skor: {data[region.toUpperCase()].toFixed(2)}/100</span>
                                    </Fragment>
                                )
                            )
                        }
                    </div>
                )}
            />
        </Fragment>
    );
};

export default IndonesiaMap;
