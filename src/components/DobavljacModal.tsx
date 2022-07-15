import { Box, Modal } from '@mui/material';
import React from 'react';
import { fetchDobavljaci } from '../api/dobavljac-api';
import { Dobavljac } from '../types/model';
import { DobavljacList } from './DobavljacList';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid grey',
    boxShadow: 24,
    p: 4,
};

type DobavljacModalProps = {
    open: boolean,
    handleClose: () => void
}

export const DobavljacModal = ({ open, handleClose }: DobavljacModalProps) => {

    const [dobavljaci,setDobavljaci] = React.useState<Array<Dobavljac> | null>(null)

    React.useEffect(() => {
        fetch();
    }, [])

    async function fetch() {
        var result = await fetchDobavljaci();
        if (result === false) return;
        setDobavljaci(result);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-dobavljac"
            aria-describedby="modal-modal-choose-dobavljac"
        >
            <Box sx={style}>
                <p>Izaberite dobavljaca:</p>
                {dobavljaci ? <>
                    <DobavljacList 
                        dobavljaci={dobavljaci}
                    />
                </> : <p>Loading...</p>}
            </Box>
      </Modal>
    )

}