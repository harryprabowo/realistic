import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';

import {
    Row,
    Col,
} from 'react-bootstrap'

import PDF from './tim_realistic.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Analytics = () => {
    const [numPages, setNumPages] = useState(null)

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages( numPages )
    }

    return (
        <div style={{ marginLeft: '3em', textAlign: 'center',overflowX: 'hidden' }}>
            <Row>
                <Col sm={3}/>
                <Col>
                    <Row>
                        <Col sm={1}/>
                        <Col>
                            <Document
                                file={PDF}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                {/* <Page pageNumber={pageNumber} /> */}
                                {Array.from(
                                    new Array(numPages),
                                    (el, index) => (
                                        <Page
                                            key={`page_${index + 1}`}
                                            pageNumber={index + 1}
                                        />
                                    ),
                                )}
                            </Document>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Analytics