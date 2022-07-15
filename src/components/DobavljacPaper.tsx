import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Dobavljac } from '../types/model';
import { DobavljacModal } from './DobavljacModal';

type DobavljacPaperProps = {
    dobavljac: Dobavljac | undefined
}

const DobavljacPaper = ({ dobavljac }: DobavljacPaperProps) => {

    const [open,setOpen] = useState<boolean>(false);

    const onIzaberi = () => setOpen(true);

    const handleClose = () => setOpen(false);

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
            {open && <DobavljacModal open={open} handleClose={handleClose} />}
        </React.Fragment>
    )
    
    return (
        <div className='receipt-paper-component'>

        </div>
    )

}

export default React.memo(DobavljacPaper);