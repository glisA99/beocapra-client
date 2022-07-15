import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { fetchProducts } from '../api/products-api';
import { Proizvod } from '../types/model';
import { Page } from '../types/page';
import { PaginationFooter } from './PaginationFooter';
import ProductsList from './ProductList';

type State = Page<Proizvod>;

export const ProductsPage = () => {

    const [page,setPage] = useState<number>(1);
    const [state,setState] = useState<State | null>(null);
    const [loading,setLoading] = useState<boolean>(true);
    const [perPage,setPerPage] = useState<number>(30);

    React.useEffect(() => {
        fetch(page, perPage);
    }, [page,perPage])

    async function fetch(pageNumber: number, perPage = 30) {
        setLoading(true);
        const page:State | false = await fetchProducts({
            page: pageNumber,
            per_page: perPage
        }); 
        if (page === false) {
            console.log("Error ocurred during fetching. Please refresh the page")
            setLoading(false);
            return;
        }
        setState(page);
        setLoading(false);
    }

    const changePage = (pageNumber: number) => {
        setPage(pageNumber);
    }

    const onApplyClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        //@ts-ignore
        var count = document.getElementById("per_page_input").value;
        try {
            count = Number.parseInt(count);
            if (count > 10 && count <= 50) {
                setPerPage(count);
            }
        } catch (ex) {}
    }

    if (loading || !state) return (
        <>
            <p>Loading...</p>
        </>
    )
 
    return (
        <div className='products-page'>
            <div className='wrapper-div'>
                <div className='products-table-container'>
                    <p>Here you can view products that are available</p>
                    <hr></hr>
                    <ProductsList 
                        products={state.content}
                        display_count={perPage}
                    />
                    <PaginationFooter 
                        current={state.number + 1}
                        changePage={changePage}
                        isFirst={state.first}
                        isLast={state.last}
                        last={state.totalPages}
                    />
                </div>
                <div className='products-settings'>
                    <h5>Choose desired page settings</h5>
                    <p>Choose number of products per page: </p>
                    <TextField 
                        id="per_page_input"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                        style={{textAlign: "center"}}
                    /><br></br><br></br>
                    <Button 
                        variant="contained"
                        onClick={onApplyClick}
                    >
                        Apply
                    </Button>
                    <hr></hr>
                    <p>Parameters:</p>
                    <p>PER PAGE: {perPage}</p>
                    <p>TOTAL PRODUCTS: {state.totalElements}</p>
                    <p>PAGES: {state.totalPages}</p>
                </div>
            </div>
        </div>
    )

}