import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  DropdownButton
} from "react-bootstrap";

import { getOptions } from "../../api/utils";
import Map from "./components/IndonesiaMap";
import { Card } from "../../components";

import "./style.scss";
import DataJson from "../../api/data2.json";

const data = {
  "SMA MA": {
    "2019": {
      BAHASA: {
        "BAHASA INDONESIA": {
          "JAWA TENGAH": 65,
          "JAWA BARAT": 30
        }
      }
    },
    "2018": {
      IPS: {
        "BAHASA INDONESIA": {
          "JAWA BARAT": 65
        }
      }
    }
  }
};

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
                          <h7>Jenjang</h7>
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
                          <h7>Tahun</h7>
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
                      <h7>Jurusan</h7>
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
                      <h7>Mata Ujian</h7>
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
        <Map data={currentData} />
      </div>
    </div>
  );
};

export default Dashboard;
