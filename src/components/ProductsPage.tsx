import { Backdrop, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { fetchProducts, ProductSortField } from '../api/products-api';
import { Proizvod } from '../types/model';
import { Page } from '../types/page';
import { PaginationFooter } from './PaginationFooter';
import ProductsList from './ProductList';

const SortMap:Map<string,ProductSortField> = new Map([
    ["ID","proizvodId"],
    ["Datum proizvodnje","datumProizvodnje"],
    ["Cena","cena"],
    ["Naziv","nazivProizvoda"],
    ["Stanje na zalihama","trenutnoStanjeZaliha"]
])

type State = Page<Proizvod>;

export const ProductsPage = () => {

    const [page,setPage] = useState<number>(1);
    const [state,setState] = useState<State | null>(null);
    const [loading,setLoading] = useState<boolean>(true);
    const [perPage,setPerPage] = useState<number>(30);
    const [sortBy,setSortBy] = useState<string>("ID");
    const [mockSort,setMockSort] = useState<string>("ID");

    React.useEffect(() => {
        if (sortBy == "ID") fetch(page, perPage);
        else fetch(page,perPage,SortMap.get(sortBy));
    }, [page,perPage,sortBy])

    async function fetch(pageNumber: number, perPage = 30, sortBy?: ProductSortField) {
        setLoading(true);
        const page:State | false = await fetchProducts({
            page: pageNumber,
            per_page: perPage,
            sortBy
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
            if (mockSort != "ID") setSortBy(mockSort);
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
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="sortBy-select-label">Sort by</InputLabel>
                            <Select
                                labelId="sortBy-select-label"
                                id="sortBy-select"
                                label="SORT"
                                value={mockSort}
                                onChange={(event) => setMockSort(event.target.value as string)}
                            >
                                <MenuItem value={"ID"}>ID</MenuItem>
                                <MenuItem value={"Datum proizvodnje"}>Datum proizvodnje</MenuItem>
                                <MenuItem value={"Cena"}>Cena</MenuItem>
                                <MenuItem value={"Naziv"}>Naziv</MenuItem>
                                <MenuItem value={"Stanje na zalihama"}>Stanje na zalihama</MenuItem>
                            </Select>
                        </FormControl>
                    </Box><br></br>
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