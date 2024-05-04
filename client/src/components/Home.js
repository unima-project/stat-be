import React from 'react';
import Box from "@mui/system/Box";
import minahasa from './image/minahasa.png';
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
            <h1>Korpus Bahasa Tonsea</h1>
            <Box sx={{textAlign: 'justify'}}>
                Ankorsea merupakan singkatan dari Analisis Korpus Bahasa Tonsea. Ankorsea adalah korpus digital yang dapat menganalisis bahasa. Apa itu Korpus? Korpus adalah sekumpulan kata yang diambil dari teks ataupun lisan dalam jumlah besar yang dapat diolah secara elektronik untuk mengetahui penggunaan suatu bahasa. Ankorsea memiliki 6 fitur Analisis Korpus yaitu Daftar Kata, Frekuensi Kata, Token, Konkordansi, Kolokasi dan Ngram. Salah satunya adalah bahasa Tonsea. Bahasa Tonsea merupakan bahasa daerah dari Sulawesi Utara.
                <Box sx={{width: '100%', textAlign: 'center', m: 1.5, p: 1.5}}>
                    <img src={minahasa} alt='minahasa'/>
                </Box>

      Ankorsea hadir untuk membantu para pekamus dalam penyusunan kamus karena dilengkapi dengan fitur analisis korpus dan pengguna juga dapat mengunduh Token korpus.
               
                <p />
                <strong>contact person</strong>
                <br /><a href="mailto:Sheriaamaria24@gmail.com">Sheriaamaria24@gmail.com</a>
                <br/>089502947701
                <br />Sherly Maria Conggresco
            </Box>
        </Box>
    )
}