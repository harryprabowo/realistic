import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleNotch,
} from '@fortawesome/free-solid-svg-icons'

import PDF from './tim_realistic.pdf'

import './styles.scss'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Analysis = () => {
    const [numPages, setNumPages] = useState()

    const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages)

    const Loading = () => <FontAwesomeIcon icon={faCircleNotch} spin style={{ marginTop: '40vh', color: 'darkcyan', fontSize: '60pt' }} />

return (
    <div className="pdf-container">
        <Document
            file={PDF}
            loading={<Loading />}
            onLoadSuccess={onDocumentLoadSuccess}
        >
            {Array.from(
                new Array(numPages),
                (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        loading={null}
                        scale={1.5}
                    />
                ),
            )}
        </Document>
    </div>
)
}

export default Analysis