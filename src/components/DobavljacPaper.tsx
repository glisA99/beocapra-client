import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Dobavljac } from '../types/model';
import { DobavljacModal } from './DobavljacModal';

type DobavljacPaperProps = {
    dobavljac: Dobavljac | undefined,
    selectDobavljac: (dobavljac: Dobavljac) => void
}

const DobavljacPaper = ({ dobavljac, selectDobavljac }: DobavljacPaperProps) => {

    const [open,setOpen] = useState<boolean>(false);

    const onIzaberi = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const _selectDobavljac = (dobavljac: Dobavljac) => {
        selectDobavljac(dobavljac);
        handleClose();
    }

    if (!dobavljac) return (
        <React.Fragment>
            <div>
                <p style={{color: "grey"}}>Trenutno nema izabranog dobavljaca</p>
                <Button 
                    type='button'
                    variant="contained"
                    className='paper-button'
                    onClick={onIzaberi}
                >
                    Izaberi dobavljaca
                </Button>
            </div>
            {open && <DobavljacModal open={open} handleClose={handleClose} selectDobavljac={_selectDobavljac}/>}
        </React.Fragment>
    )
    
    return (
        <div className='receipt-paper-component'>
            <TextField
                id="outlined-read-only-input"
                label="Naziv"
                defaultValue={dobavljac.nazivDobavljaca}
                value={dobavljac.nazivDobavljaca}
                InputProps={{
                    readOnly: true,
                }}
                className="receipt-text-field"
            />
            <TextField
                id="outlined-read-only-input"
                label="Email"
                defaultValue={dobavljac.email}
                value={dobavljac.email}
                InputProps={{
                    readOnly: true,
                }}
                className="receipt-text-field"
            />
            <TextField
                id="outlined-read-only-input"
                label="PIB"
                defaultValue={dobavljac.pib}
                value={dobavljac.pib}
                InputProps={{
                    readOnly: true,
                }}
                className="receipt-text-field"
            /><br></br><br></br>
            <Button
                type='button'
                variant="contained"
                className='paper-button'
                onClick={onIzaberi}
            >
                Promeni dobavljaca
            </Button>
            {open && <DobavljacModal open={open} handleClose={handleClose} selectDobavljac={_selectDobavljac}/>}
        </div>
    )

}

export default React.memo(DobavljacPaper);