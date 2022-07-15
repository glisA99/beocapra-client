import { Box, TextField } from '@mui/material';
import React from 'react';
import { fetchRadnik } from '../api/radnik-api';
import { Radnik, User } from '../types/model';
import { AppContext } from './withAppContext';

export const RadnikPaper = () => {

    const [radnik,setRadnik] = React.useState<Radnik | undefined>(undefined);
    
    const appContext = React.useContext(AppContext);

    React.useEffect(() => {
        fetch();
    },[])

    async function fetch() {
        const _radnik = await fetchRadnik((appContext.user as User).username);
        if (!_radnik) return;
        setRadnik(_radnik);
    }

    if (!radnik) return <p>Loading...</p>

    return (
        <div className='receipt-paper-component'>
            <TextField
                id="outlined-read-only-input"
                label="Ime i prezime"
                defaultValue={radnik.imePrezime}
                value={radnik.imePrezime}
                InputProps={{
                    readOnly: true,
                }}
                className="receipt-text-field"
            />
            <TextField
                id="outlined-read-only-input"
                label="Broj radne knjizice"
                defaultValue={radnik.brojRadneKnjizice}
                value={radnik.brojRadneKnjizice}
                InputProps={{
                    readOnly: true,
                }}
                className="receipt-text-field"
            />
            <TextField
                id="outlined-read-only-input"
                label="JMBG"
                defaultValue={radnik.jmbg}
                value={radnik.jmbg}
                InputProps={{
                    readOnly: true,
                }}
                className="receipt-text-field"
            />
        </div>
    )

}