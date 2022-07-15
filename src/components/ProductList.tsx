import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Proizvod } from '../types/model';
import ProductComponent from './ProductComponent';

const JEDINICA_MERE = "Jedinica Mere";
const TIP_PROIZVODA = "Tip Proizvoda";
const PRODUCT_COLUMNS = ["Naziv Proizvoda","Datum proizvodnje","Cena","Vrsta proizvoda",
                        "Stanje Zaliha",JEDINICA_MERE,TIP_PROIZVODA];

type ProductsListProps = {
    products: Array<Proizvod>,
    display_count: number
}

export const ProductsList = ({ products, display_count }: ProductsListProps) => {

    return (
        <React.Fragment>
        <div className='product-container-h'>
            <div className='product-id-div'>
                ID
            </div>
            {PRODUCT_COLUMNS.map(column => {
                return (
                    <div className='product-column-h'>
                        {column}
                    </div>
                )
            })}
        </div>
        <List
            itemCount={display_count}
            height={400}
            width={"100%"}
            itemSize={60}
            itemData={products}
            className="virtualized-list"
            layout="vertical"
            overscanCount={4}
            style={{border: "2px solid grey"}}
        >
            {({ index, data, style }: any) => {
                return (
                    <ProductComponent
                        product={data[index]}
                        key={index}
                        style={style}
                        index={index}
                    />
                );
            }}
        </List>
        </React.Fragment>
    )

}

export default ProductsList;