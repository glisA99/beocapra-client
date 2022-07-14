import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Proizvod } from '../types/model';
import ProductComponent from './ProductComponent';

const DISPLAY_COUNT = 30;

const JEDINICA_MERE = "Jedinica Mere";
const TIP_PROIZVODA = "Tip Proizvoda";
const PRODUCT_COLUMNS = ["Naziv Proizvoda","Datum proizvodnje","Cena","Vrsta proizvoda",
                        "Stanje Zaliha",JEDINICA_MERE,TIP_PROIZVODA];

type ProductsListProps = {
    products: Array<Proizvod>
}

export const ProductsList = ({ products }: ProductsListProps) => {

    return (
        <React.Fragment>
        <div className='product-container'>
            <div className='product-id-div'>
                ID
            </div>
            {PRODUCT_COLUMNS.map(column => {
                return (
                    <div className='product-column'>
                        {column}
                    </div>
                )
            })}
        </div>
        <List
            itemCount={DISPLAY_COUNT}
            height={400}
            width={"100%"}
            itemSize={80}
            itemData={products}
            className="virtualized-list"
            layout="vertical"
            overscanCount={4}
        >
            {({ index, data, style }: any) => {
                return (
                    <ProductComponent
                        product={data[index]}
                        key={index}
                        style={style}
                    />
                );
            }}
        </List>
        </React.Fragment>
    )

}

export default ProductsList;