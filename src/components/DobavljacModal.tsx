import { Box, Modal } from '@mui/material';
import React from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type DobavljacModalProps = {
    open: boolean,
    handleClose: () => void
}

export const DobavljacModal = ({ open, handleClose }: DobavljacModalProps) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-dobavljac"
            aria-describedby="modal-modal-choose-dobavljac"
        >
            <Box sx={style}>
                
            </Box>
      </Modal>
    )

}