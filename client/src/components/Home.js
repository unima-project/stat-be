import React from 'react';
import Box from "@mui/system/Box";
import simalungun from './image/minahasa.jpg';
import {useNavigate} from "react-router-dom";
import {UserProfile} from "../Helpers/userProfile";

export const Home = () => {
    const navigate = useNavigate();
    const {isAdmin} = UserProfile();

    React.useEffect(() => {
        if (isAdmin) {
            navigate("/users")
        }
    }, [isAdmin])

    return (
        <Box sx={{p: 2, m: 3, border: '1px dashed lightGrey', textAlign: 'center', marginTop: 10}}>
            <h1>Selamat Datang Di ACTOU</h1>
            <Box sx={{textAlign: 'justify'}}>
            <h3>Bahasa Toulour</h3>
            Bahasa Toulour merupakan salah satu Bahasa dari suku Minahasa, Toulour juga merupakan salah satu dari Sembilan suku keturunan “Toar dan Lumimuut”. Toulour yaitu orang yang tinggal di dekat air. Masyarakat Toulour diantaranya wilayah Tondano, Kombi, Lembean Timur, Remboken, Kakas dan Eris.
                <p/>
                Bahasa Toulour  terdiri dari tiga dialek yaitu Tondano, Kakas, dan Remboken. Menurut pemakainya Bahasa Toulour yaitu bahasa umum, bahasa yang dipakai dalam percakapan keseharian, kemudian bahasa sasaraha atau yang disebut bahasa Samaran, biasanya digunakan pada acara-acara adat untuk menolak malapetaka dan terakhir bahasa sastra.
                <p/>
                Dalam bahasa Toundano kata “toulour” lebih tepat tou-lour berarti “orang danau” (tou=orang, lour-danau). Dalam bahasa tounsea, Toumbulu, kata lour berarti air; sedangkan dalam bahasa Toundano, Tountemboan kata lour berarti danau, dan untuk air disebutnya rano atau en dano.

                <Box sx={{width: '100%', textAlign: 'center', m: 1.5, p: 1.5}}>
                    <img src={simalungun} alt='minahasa'/>
                </Box>

                Korpus merupakan kumpulan potongan text bahasa berbentuk elektronik dipilih berdasarkan kriteria tertentu sehingga dapat mewakili, suatu bahasa atau ragam bahasa untuk dijadikan sumber data pada penelitian linguistik.
                <p/>
                ACTOU atau Analisis Korpus Bahasa Toulour merupakan website analisis korpus bahasa Toulour untuk menambah sumber daya Bahasa Toulour yang nantinya dapat dipakai oleh para peneliti linguistic dalam mengembangkan sebuah penelitian menggunakan Bahasa Toulour.

                <p />
                <strong>contact person</strong>
                <br /><a href="mailto:kezialipan45@gmail.com">kezialipan45@gmail.com</a>
                <br/>0822 5903 2537
                <br />Kezia Lipan
            </Box>
        </Box>
    )
}