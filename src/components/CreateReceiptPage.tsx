import { Button, Paper, TextareaAutosize } from '@mui/material';
import React, { useState } from 'react';
import { Dobavljac, StavkaPrijemnicaDobavljaca } from '../types/model';
import DobavljacPaper from './DobavljacPaper';
import { RadnikPaper } from './RadnikPaper';
import { ReceiptItemList } from './ReceiptItemList';
import { ReceiptItemModal } from './ReceiptItemModal';

export type ExtendedStavka = StavkaPrijemnicaDobavljaca & { nazivProizvoda: string };

export const CreateReceiptPage = () => {

    const [dobavljac,setDobavljac] = useState<undefined | Dobavljac>(undefined);
    const [stavke,setStavke] = useState<Array<ExtendedStavka>>([]);
    const [openDodajStavku,setOpenDodajStavku] = useState<boolean>(false);
    const [napomena,setNapomena] = useState<string>("");

    const selectDobavljac = (dobavljac: Dobavljac) => {
        setDobavljac(dobavljac);
    }

    const dodajStavku = (stavka: ExtendedStavka) => {
        var index = stavke.map(element => element.proizvodId).findIndex(element => element === stavka.proizvodId);
        if (index !== -1) {
            const newArr = [...stavke];
            newArr[index] = {
                ...stavke[index],
                kolicina: stavke[index].kolicina + stavka.kolicina,
                vrednost: stavke[index].vrednost + stavka.vrednost
            }
            setStavke(newArr);
        } else {
            setStavke(prev => [...prev,stavka]);
        }
    }

    const calculateTotal = () => {
        return stavke.reduce((aggr,stavka) => aggr + stavka.vrednost, 0);
    }

    const onNapomenaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNapomena(event.target.value);
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
                        onChange={onNapomenaChange}
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
                        onClick={() => setOpenDodajStavku(true)}
                    >
                        Dodaj stavku
                    </Button>
                    <br></br>
                    <p>Ukupna vrednost prijemnice dobavljaca: <b>{calculateTotal()}</b></p>
                </div>
            </div>
            {openDodajStavku && 
            <ReceiptItemModal 
                open={openDodajStavku}
                handleClose={() => setOpenDodajStavku(false)}
                dodajStavku={dodajStavku}
            />}
        </div>
    )

}