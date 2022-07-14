import { Backdrop, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { fetchProducts } from '../api/products-api';
import { Proizvod } from '../types/model';
import { Page } from '../types/page';

type State = Page<Proizvod>;

export const ProductsPage = () => {

    const [page,setPage] = useState<number>(1);
    const [state,setState] = useState<State | null>(null);
    const [loading,setLoading] = useState<boolean>(true);

    React.useEffect(() => {
        fetch(page);
    }, [page])

    async function fetch(pageNumber: number) {
        setLoading(true);
        console.log("Calling fetchProducts")
        const page:State | false = await fetchProducts({
            page: pageNumber
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

    if (loading) return (
        <>
            <p>Loading...</p>
        </>
    )
 
    return (
        <div className='products-page'>
            <div className='wrapper-div'>
                <div className='products-table-container'>
                    <p>Here you can view products that are available</p>
                </div>
                <div className='products-settings'>
                    <h5>Choose desired page settings</h5>
                </div>
            </div>
        </div>
    )

}