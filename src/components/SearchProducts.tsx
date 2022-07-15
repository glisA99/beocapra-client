import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Proizvod } from '../types/model';
import ProductsList from './ProductList';

export const SearchProducts = () => {

    const [idPart,setIdPart] = useState<string>("");
    const [namePart,setNamePart] = useState<string>("");
    const [products,setProducts] = useState<Array<Proizvod>>([]);

    return (
        <div className='products-page'>
            <div className='wrapper-div'>
                <div className='products-table-container'>
                    <p>Here you can view products that satisfy search criteria</p>
                    <hr></hr>
                    <ProductsList 
                        products={products}
                        page={1}
                        per_page={products.length}
                        total_pages={100}
                        total_elements={products.length}
                    />
                </div>
                <div 
                    className='products-settings'
                    style={{borderLeft: "1px solid grey"}}
                >
                    <h4>Enter search params:</h4>
                    <p>Product ID:</p>
                    <TextField 
                        id="product_id_input"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                        style={{textAlign: "center"}}
                    /><br></br><br></br>
                    <p>Product name:</p>
                    <TextField 
                        id="product_name_input"
                        style={{textAlign: "center"}}
                    /><br></br><br></br>
                    <Button
                        variant='contained'
                    >
                        Search
                    </Button>
                </div>
            </div>
        </div>
    )

}