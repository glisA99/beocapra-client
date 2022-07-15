import { Button, Paper, TextareaAutosize } from '@mui/material';
import React, { useState } from 'react';
import { Dobavljac, StavkaPrijemnicaDobavljaca } from '../types/model';
import DobavljacPaper from './DobavljacPaper';
import { RadnikPaper } from './RadnikPaper';
import { ReceiptItemList } from './ReceiptItemList';

export const CreateReceiptPage = () => {

    const [dobavljac,setDobavljac] = useState<undefined | Dobavljac>(undefined);
    const [stavke,setStavke] = useState<Array<StavkaPrijemnicaDobavljaca>>([]);

    const selectDobavljac = (dobavljac: Dobavljac) => {
        setDobavljac(dobavljac);
    }

    return (
        <div className='products-page'>
            <div className='wrapper-div'>
                <div 
                    className='receipt-settings'
                    style={{borderRight: "1px solid grey"}}
                >
                    <h4>Kreiranje nove prijemnice dobavljaca</h4>
                    <Paper
                        style={{
                            width: "100%", 
                            height: "auto", 
                            padding: "2%",
                            backgroundColor: "rgba(128, 128, 128, 0.18)"
                        }}
                    >
                        <p>Radnik:</p>
                        <RadnikPaper />
                    </Paper><br></br>
                    <Paper
                        style={{width: "100%", height: "auto", padding: "2%", marginTop: "5px"}}
                    >
                        <p>Dobavljac:</p>
                        <DobavljacPaper 
                            dobavljac={dobavljac}
                            selectDobavljac={selectDobavljac}
                        />
                    </Paper><br></br><br></br>
                    <span>Napomena:</span>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={5}
                        placeholder="Napomena..."
                        style={{ width: "100%" }}
                    />
                </div>
                <div className='receipt-item-table-container'>
                    <p>Stavke prijemnice dobavljaca: </p>
                    <ReceiptItemList 
                        stavke={stavke}
                    />
                    <br></br>
                    <Button
                        type='button'
                        variant="contained"
                        className='paper-button'
                    >
                        Dodaj stavku
                    </Button>
                </div>
            </div>
        </div>
    )

}