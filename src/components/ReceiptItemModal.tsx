import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { fetchProducts } from '../api/products-api';
import { Proizvod, StavkaPrijemnicaDobavljaca } from '../types/model';
import { Page } from '../types/page';
import { ExtendedStavka } from './CreateReceiptPage';
import { PaginationFooter } from './PaginationFooter';
import ProductsList from './ProductList';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    bgcolor: 'background.paper',
    border: '1px solid grey',
    boxShadow: 24,
    p: 4,
};

type ReceiptItemModalProps = {
    open: boolean,
    handleClose: () => void,
    dodajStavku: (stavka: ExtendedStavka) => void
}

export const ReceiptItemModal = ({ open, handleClose, dodajStavku }: ReceiptItemModalProps) => {

    const [products,setProducts] = useState<Page<Proizvod> | undefined>(undefined);
    const [page,setPage] = useState<number>(1);
    const [loading,setLoading] = useState<boolean>(true);

    const [proizvod,setProizvod] = useState<Proizvod | undefined>(undefined);
    const [kolicina,setKolicina] = useState<string>("");
    const [error,setError] = useState<string>("");

    React.useEffect(() => {
        fetch();
    },[page]);

    async function fetch() {
        setLoading(true);
        var _page:Page<Proizvod> | false = await fetchProducts({
            page
        }); 
        if (_page === false) {
            console.log("Error ocurred during fetching. Please refresh the page")
            setLoading(false);
            return;
        }
        setProducts(_page);
        setLoading(false);
    }

    const changePage = (pageNumber: number) => {
        setPage(pageNumber);
    }

    const dodaj = () => {
        if (!proizvod) {
            setError("Niste izabrali proizvod");
            return;
        }
        if (Number.parseFloat(kolicina) === NaN) {
            setError("Kolicina mora biti numericka vrednost");
            return;
        }
        if (Number.parseFloat(kolicina) <= 0) {
            setError("Kolicina mora biti pozitivna numericka vrednost");
            return;
        }
        console.log("Kolicina: " + kolicina);
        console.log("Proizvod ID:" + (proizvod as any).proizvodId);
        console.log("Vrednost: " + Number.parseFloat(kolicina) * proizvod.cena);
        const stavka_to_add = {
            kolicina: Number.parseFloat(kolicina),
            proizvodId: (proizvod as any).proizvodId,
            vrednost: Number.parseFloat(kolicina) * proizvod.cena,
            nazivProizvoda: proizvod.nazivProizvoda
        } as ExtendedStavka; 
        console.log(stavka_to_add)
        dodajStavku(stavka_to_add);
        handleClose();
    }

    const selectProizvod = (product: Proizvod) => {
        setProizvod(product);
    }

    const onKolicinaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKolicina(event.target.value);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-dobavljac"
            aria-describedby="modal-modal-choose-dobavljac"
        >
            <Box sx={style} style={{textAlign: "center"}}>
                <div className='products-page' style={{
                    margin: "0",
                    padding: "0"
                }}>
                    <div className='wrapper-div'>
                        <div className='products-table-container'>
                            <p>Here you can view products that are available</p>
                            {loading ? <p>Loading...</p> : 
                            <>
                                <ProductsList 
                                    page={page}
                                    per_page={30}
                                    products={(products as Page<Proizvod>).content}
                                    total_elements={(products as Page<Proizvod>).totalElements}
                                    total_pages={(products as Page<Proizvod>).totalPages}
                                    onSelect={selectProizvod}
                                />
                                <PaginationFooter 
                                    current={page}
                                    isFirst={(products as Page<Proizvod>).first}
                                    isLast={(products as Page<Proizvod>).last}
                                    last={(products as Page<Proizvod>).totalPages}
                                    changePage={changePage}
                                />
                            </>}
                        </div>
                        <div 
                            className='products-settings'
                            style={{borderLeft: "1px solid grey"}}
                        >
                            <h3>Kreiranje nove stavke dobavljaca:</h3>
                            {proizvod ? 
                            <>
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Izabrani proizvod:"
                                    defaultValue={proizvod.nazivProizvoda}
                                    value={proizvod.nazivProizvoda}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    style={{ width: "100%" }}
                                    className="receipt-text-field"
                                />
                            </> : 
                            <>
                                <p style={{color: "grey"}}>Niste izabrali nijedan proizvod</p>
                            </>}
                            <p>Kolicina:</p>
                            <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={onKolicinaChange}/>
                            <br></br><br></br>
                            <Button
                                type='button'
                                variant="contained"
                                color="success"
                                onClick={dodaj}
                            >
                                    Dodaj stavku
                            </Button>
                            <br></br>
                            {error && <p style={{color: "red"}}>{error}</p>}
                                    </div>
                                </div>
                </div>
            </Box>
      </Modal>
    )

}
