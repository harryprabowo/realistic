import React, { useState, useEffect } from 'react'
import Picker from 'react-picker'
import {
    Row,
    Col,
    Form,
    Button,
    Dropdown,
    DropdownButton
} from 'react-bootstrap'

import Map from './components/IndonesiaMap'
import {
    Card,
} from '../../components'

import './style.scss'
import { isNullOrUndefined } from 'util'

const data = [
    {
        jenjang: "SMA MA",
        data: [
            {
                tahun: 2016,
                data: [
                    {
                        wilayah: "Jakarta Raya",
                        data: [
                            {
                                kotaKab: "Jakarta Selatan",
                                data: [
                                    {
                                        jurusan: "IPA",
                                        data: [
                                            {
                                                mataUjian: "Matematika",
                                                nilai: 100
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
        ]
    },
]

const Dashboard = () => {
    const [currentData, setCurrentData] = useState(data)
    const [searchFilter, setSearchFilter] = useState({})

    const {
        jenjang,
        tahun,
        wilayah,
        kota,
        mataUjian,
    } = searchFilter;

    const jenjangOptions = currentData.map(val => ({
        label: val.jenjang,
        value: val.jenjang,
    }));

    const tahunOptions = jenjang && currentData.find(el => el.jenjang === jenjang).map(val => ({
        label: val.tahun,
        value: val.tahun,
    }));

    const woa = tahun && currentData.map(val => ({
        label: val.jenjang,
        value: val.jenjang,
    }));

    const jenjangOptions = wilayah && currentData.map(val => ({
        label: val.jenjang,
        value: val.jenjang,
    }));

    return (
        <div id="Dashboard">
            <div className="filter-card">
                {console.log(data)}
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
                                                    <Picker
                                                        selectedValue={jenjang}
                                                        style={{ height: 50, width: 100 }}
                                                        onValueChange={value =>
                                                            {
                                                                setSearchFilter({
                                                                    ...searchFilter,
                                                                    jenjang: value,
                                                                })
                                                            }
                                                        }>
                                                        <Picker.Item label="SMA MA" value="SMA MA" />
                                                        <Picker.Item label="SMK" value="SMK" />
                                                        <Picker.Item label="Paket C" value="Paket C" />
                                                    </Picker>
                                                </Col>
                                                <Col>
                                                </Col>
                                            </Row>

                                        </div>
                                    </Card.Content>
                                </Card.Container>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <div className="map-container">
                <Map />
            </div>
        </div>
    )
}

export default Dashboard