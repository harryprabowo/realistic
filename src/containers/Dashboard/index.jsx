import React, { useState } from "react";
import Select from "react-select";
import {
    Row,
    Col,
} from "react-bootstrap";

import { getOptions } from "../../api/utils";
import Map from "./components/IndonesiaMap";
import { Card } from "../../components";

import data from '../../api/data2.json'

import "./style.scss";

const Dashboard = () => {
    const [searchFilter, setSearchFilter] = useState({});
    const [currentData, setCurrentData] = useState({});

    const { jenjang, tahun, jurusan, mataUjian } = searchFilter;

    const options = getOptions(searchFilter, data);

    return (
        <div id="Dashboard">
            <div className="filter-card">
                <Row>
                    <Col />
                    <Col lg={3}>
                        <Row>
                            <Col lg={{ span: 11 }}>
                                <Card.Container>
                                    <Card.Content>
                                        <div className="filter-container">
                                            <Row>
                                                <Col>
                                                    <label>Jenjang</label>
                                                    <Select
                                                        isDisabled={!options.jenjang.length}
                                                        value={{ label: jenjang, value: jenjang }}
                                                        onChange={({ value }) => {
                                                            setSearchFilter({
                                                                jenjang: value
                                                            });
                                                            setCurrentData({});
                                                        }}
                                                        options={options.jenjang}
                                                    />
                                                </Col>
                                                <Col>
                                                    <label>Tahun</label>
                                                    <Select
                                                        isDisabled={!options.tahun.length}
                                                        value={{ label: tahun, value: tahun }}
                                                        onChange={({ value }) => {
                                                            setSearchFilter({
                                                                jenjang: searchFilter.jenjang,
                                                                tahun: value
                                                            });
                                                            setCurrentData({});
                                                        }}
                                                        options={options.tahun}
                                                    />
                                                </Col>
                                            </Row>

                                            <br />

                                            <label>Jurusan</label>
                                            <Select
                                                isDisabled={!options.jurusan.length}
                                                value={{ label: jurusan, value: jurusan }}
                                                onChange={({ value }) => {
                                                    setSearchFilter({
                                                        jenjang: searchFilter.jenjang,
                                                        tahun: searchFilter.tahun,
                                                        jurusan: value
                                                    });
                                                }}
                                                options={options.jurusan}
                                            />

                                            <br/>

                                            <label>Mata Ujian</label>
                                            <Select
                                                isDisabled={!options.mataUjian.length}
                                                value={{ label: mataUjian, value: mataUjian }}
                                                onChange={({ value }) => {
                                                    setSearchFilter({
                                                        jenjang: searchFilter.jenjang,
                                                        tahun: searchFilter.tahun,
                                                        jurusan: searchFilter.jurusan,
                                                        mataUjian: value
                                                    });
                                                    const {
                                                        [jenjang]: {
                                                            [tahun]: {
                                                                [jurusan]: { [value]: nextData }
                                                            }
                                                        }
                                                    } = data;
                                                    setCurrentData(nextData);
                                                }}
                                                options={options.mataUjian}
                                            />
                                        </div>
                                    </Card.Content>
                                </Card.Container>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <div className="map-container">
                <Map 
                    data={currentData}
                    average={
                        Object.entries(data).length === 0 && data.constructor === Object
                            ? null
                            : (Object.values(currentData).reduce((total, value) => total + value, 0)) / Object.keys(currentData).length
                    }
                    ranking={
                        Object.entries(data).length === 0 && data.constructor === Object
                            ? null
                            : Object.keys(currentData).sort((a, b) => currentData[b] - currentData[a])
                    }
                />
            </div>
        </div>
    );
};

export default Dashboard;
