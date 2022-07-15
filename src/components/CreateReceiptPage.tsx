import { Paper } from '@mui/material';
import React, { useState } from 'react';
import { Dobavljac } from '../types/model';
import DobavljacPaper from './DobavljacPaper';
import { RadnikPaper } from './RadnikPaper';

export const CreateReceiptPage = () => {

    const [dobavljac,setDobavljac] = useState<undefined | Dobavljac>(undefined);

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
                            height: "25%", 
                            padding: "2%",
                            backgroundColor: "rgba(128, 128, 128, 0.18)"
                        }}
                    >
                        <p>Radnik:</p>
                        <RadnikPaper />
                    </Paper>
                    <Paper
                        style={{width: "100%", height: "25%", padding: "2%", marginTop: "5px"}}
                    >
                        <p>Dobavljac:</p>
                        <DobavljacPaper 
                            dobavljac={dobavljac}
                        />
                    </Paper>
                    <Paper
                        style={{width: "100%", height: "25%", padding: "2%", marginTop: "5px"}}
                    >
                        <p>Tovarni list:</p>
                        
                    </Paper>
                </div>
                <div className='receipt-item-table-container'>
                        <p>Receipt items:</p>
                </div>
            </div>
        </div>
    )

}