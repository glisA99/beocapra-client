import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Dobavljac } from '../types/model';

type DobavljacPaperProps = {
    dobavljac: Dobavljac | undefined
}

const DobavljacPaper = ({ dobavljac }: DobavljacPaperProps) => {

    const [open,setOpen] = useState<boolean>(false);

    const onIzaberi = () => setOpen(true);

    if (!dobavljac) return (
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
    )
    
    return (
        <div className='receipt-paper-component'>

        </div>
    )

}

export default React.memo(DobavljacPaper);