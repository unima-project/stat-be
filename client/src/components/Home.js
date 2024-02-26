import React from 'react';
import Box from "@mui/system/Box";
import simalungun from './image/simalungun.png';

export const Home = () => {
    return (
        <Box sx={{p: 2, m: 3, border: '1px dashed lightGrey', textAlign: 'center', marginTop: 10}}>
            <h1>Title</h1>
            <Box sx={{textAlign: 'justify'}}>
                Bahasa Batak Simalungun atau sahap Simalungun (dalam bahasa Batak Simalungun) adalah salah satu bahasa dalam rumpun bahasa Batak yang dituturkan oleh masyarakat Batak Simalungun yang mendiami Kabupaten Simalungun, Serdang Bedagai, Deli Serdang, Karo, Dairi, dan Kota Pematangsiantar di Sumatera Utara, Indonesia.
                <p/>
                Menurut P. Voorhoeve (seorang ahli bahasa Belanda, pernah menjabat sebagai taalambtenaar Simalungun tahun 1937), bahasa Batak Simalungun berada pada posisi menengah antara rumpun Batak utara dan rumpun Batak selatan.[1] Penelitian lain yang dilakukan oleh A. Adelaar menunjukkan bahwa bahasa Batak Simalungun merupakan cabang dari rumpun Batak selatan yang terpisah dari bahasa-bahasa Batak selatan sebelum terbentuknya bahasa Batak Toba atau Mandailing yang sekarang.
                <p/>
                Pandangan umum mengkategorikan bahasa Batak Simalungun sebagai bagian dari rumpun bahasa Batak, tetapi Uli Kozok (filolog) mengatakan bahwa secara sejarah bahasa ini merupakan cabang dari rumpun selatan yang berbeda/terpisah dari bahasa-bahasa Batak Selatan sebelum terbentuknya bahasa Batak Toba atau Mandailing. Beberapa kata dalam bahasa Batak Simalungun memang memiliki persamaan dengan bahasa Batak Toba atau Karo yang ada di sekitar wilayah tinggalnya masyarakat Batak Simalungun, tetapi Pdt. Djaulung Wismar Saragih menerangkan bahwa ada banyak kata yang penulisannya sama dalam bahasa Batak Simalungun dan Batak Toba namun memiliki makna yang berlainan.

                <Box sx={{width: '100%', textAlign: 'center', m: 1.5, p: 1.5}}>
                    <img src={simalungun} alt='simalungun'/>
                </Box>

                Korpus teks adalah sumber daya bahasa yang terdiri dari kumpulan teks yang besar. Pada linguistik, korpus teks juga dikenal dengan sebutan jamak korpora yang saat ini biasanya disimpan dan diproses secara elektronik
                <p/>
                Penggunaan korpus dalam penelitian bahasa termasuk pendekatan yang cukup baru. Linguistik korpus muncul pada era 1960-an, bersamaan ketika Noam Chomsky memberi dampak yang besar terhadap kajian bahasa modern. Bukunya yang berjudul Syntactic Structures muncul pada tahun 1957 dengan cepat menjadi teks yang banyak dibahas. Buku kedua,  Aspects of Theory of Syntax yang terbit pada 1965 memicu revisi standar paradigma dalam linguistik teoretis. Namun, ketika teori bahasa menjadi semakin berfokus pada bahasa sebagai fenomena universal, ahli bahasa lain semakin tidak puas dengan deskripsi yang mereka temukan untuk berbagai bahasa mereka kaji. Beberapa aturan tata bahasa dalam deskripsi tersebut tidak selaras dalam teks-teks tertulis. Oleh karena itu, data bahasa alami diperlukan.

                <h3>Peran korpus dalam penyusunan kamus</h3>

                Dalam penyusunan kamus, korpus sangat membantu dalam mengerjakan mikrostruktur kamus yang meliputi lema/sublema, kelas kata, definisi, dan penulisan contoh pemakaian. Pekamus menggunakan program komputer untuk mengekstrak informasi dari korpus bahasa. Berikut ini adalah hal yang dapat dilakukan korpus dalam penyusunan kamus.

                <p />
                <strong>contact person</strong>
                <br /><a href="mailto:stevennanda38@gmail.com">stevennanda38@gmail.com</a>
                <br/>0821 9677 4572
                <br />Agus Sipayung
            </Box>
        </Box>
    )
}