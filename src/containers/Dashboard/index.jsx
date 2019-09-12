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

const data = {
  "SMA MA": {
    "2019": {
      "JAWA TENGAH": {
        BAHASA: {
          "BAHASA INDONESIA": 62.59106666666674
        }
      }
    },
    "2018": {
      "JAWA BARAT": {
        IPS: {
          "BAHASA INDONESIA": 62.59106666666674
        }
      }
    }
  }
};

const Dashboard = () => {
  const [searchFilter, setSearchFilter] = useState({});
  const [currentData, setCurrentData] = useState(data);

  const { jenjang, tahun, wilayah, jurusan, mataUjian } = searchFilter;
  const options = getOptions(searchFilter, currentData);

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
                            }}
                            options={options.tahun}
                          />
                        </Col>
                      </Row>
                      <h7>Wilayah</h7>
                      <Select
                        isDisabled={!options.wilayah.length}
                        value={{ label: wilayah, value: wilayah }}
                        onChange={({ value }) => {
                          setSearchFilter({
                            jenjang: searchFilter.jenjang,
                            tahun: searchFilter.tahun,
                            wilayah: value
                          });
                        }}
                        options={options.wilayah}
                      />
                      <h7>Jurusan</h7>
                      <Select
                        isDisabled={!options.jurusan.length}
                        value={{ label: jurusan, value: jurusan }}
                        onChange={({ value }) => {
                          setSearchFilter({
                            jenjang: searchFilter.jenjang,
                            tahun: searchFilter.tahun,
                            wilayah: searchFilter.wilayah,
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
                            wilayah: searchFilter.wilayah,
                            jurusan: searchFilter.jurusan,
                            mataUjian: value
                          });
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
        <Map />
      </div>
    </div>
  );
};

export default Dashboard;
