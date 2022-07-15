import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { searchProducts } from '../api/products-api';
import { Proizvod } from '../types/model';
import ProductsList from './ProductList';

export const SearchProducts = () => {

    const [idPart,setIdPart] = useState<string>("");
    const [namePart,setNamePart] = useState<string>("");
    const [products,setProducts] = useState<Array<Proizvod>>([]);
    const [error,setError] = useState<string>("");

    const onIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        var value = event.target.value;
        if (value.length > 5) return;
        setIdPart(event.target.value);
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        var value = event.target.value;
        if (value.length > 20) return;
        setNamePart(event.target.value);
    }

    const onSearch = async (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        const id_part = Number.parseInt(idPart);
        if (id_part === NaN) {
            setError("ID part must be number");
            return;
        }
        var products = await searchProducts(idPart,namePart);
        console.log(products);
        //@ts-ignore
        if (products.error) {
            //@ts-ignore
            if (products.status == 404) setError("There are no products that satisfy criteria");
            else setError("Error occured during connection with server. Try again")
            return;
        }   
        setProducts(products as Array<Proizvod>);
    }

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
                        overwrite={products.length}
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
                        value={idPart}
                        onChange={onIdChange}
                    /><br></br><br></br>
                    <p>Product name:</p>
                    <TextField 
                        id="product_name_input"
                        style={{textAlign: "center"}}
                        value={namePart}
                        onChange={onNameChange}
                    /><br></br><br></br>
                    <Button
                        variant='contained'
                        onClick={onSearch}
                    >
                        Search
                    </Button>
                    <br></br>
                    {error && <p style={{color: "red"}}>{error}</p>}
                </div>
            </div>
        </div>
    )

}