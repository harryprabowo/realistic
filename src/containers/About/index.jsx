import React from 'react'

import {
    Row,
    Col
} from 'react-bootstrap'

import './styles.scss'

const About = () => {
    return (
        <div className="paragraph-container">
            <Row>
                <Col />
                <Col sm={8} className="text-container">
                    <p className="text-body">
                        <h1>
                            Latar Belakang
                        </h1>

                        <hr/>

                        Kementerian Pendidikan dan Kebudayaan (Kemendikbud) telah menyerahkan hasil ujian nasional (UN)
                        untuk Sekolah Menengah Kejuruan (SMK), Sekolah Menengah Atas (SMA), Madrasah Aliyah (MA), dan program kesetaraan Paket C kepada pemerintah daerah pada tanggal 3 Mei 2019.
                        Sedangkan hasil Ujian Nasional untuk SMP dan MTs diumumkan pada 28 Mei 2019.
                        Hasil nilai Ujian Nasional juga secara terbuka dapat diakses melalui
                        situs Pusat Penilaian Pendidikan Kementerian Pendidikan dan Kebudayaan.

                        <br /><br />

                        Ujian nasional tahun 2019 diikuti 8,3 juta peserta didik dengan 103 ribu satuan pendidikan.
                        Sebanyak 91 persen atau lebih dari 7,5 juta peserta didik dan warga belajar mengikuti UNBK. Jumlah peserta UNBK meningkat 19 persen dari jumlah peserta UNBK tahun 2018 (<i><a href="https://edukasi.kompas.com/read/2019/06/06/11094601/hasil-un-2019-berikut-10-smp-swasta-terbaik-nilai-un-di-yogyakarta?page=all)">sumber</a></i>).

                        <br /><br />

                        Ujian Nasional adalah salah satu elemen penentu kelulusan bagi siswa untuk dapat melanjutkan jenjang pendidikan selanjutnya.
                        Hingga saat ini, Ujian Nasional masih menjadi perbincangan hangat. Salah satunya mengenai penghapusan Ujian Nasional.
                        Meski masih pro dan kontra, namun Ujian Nasional saat ini masih berfungsi sebagai summative evaluation, diagnostic evaluation, maupun placement test.

                        <br /><br />

                        Kita tentu dapat ambil andil membantu pemerintah dalam menganalisa hasil Ujian Nasional ini
                        agar pelaksanaannya dapat diperbaiki dan dijadikan sebagai acuan yang lebih baik pada pelaksanaan tahun selanjutnya.
                        Oleh karena itu, berdasarkan data dari hasil nilai Ujian Nasional tahun 2019 yang dapat diakses pada <a href="https://hasilun.puspendik.kemdikbud.go.id/#2019!smp!capaian!99&99&999!T&T&T&T&1&!1!&">laman ini</a>.
                    </p>
                </Col>
                <Col />
            </Row>
        </div>
    )
}

export default About