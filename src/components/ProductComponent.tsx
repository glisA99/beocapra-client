import React from 'react';
import { Proizvod } from '../types/model';

const JEDINICA_MERE = "jedinicaMere";
const TIP_PROIZVODA = "tipProizvoda";
const PRODUCT_COLUMNS = ["nazivProizvoda","datumProizvodnje","cena","vrstaProizvoda",
                        "trenutnoStanjeZaliha",JEDINICA_MERE,TIP_PROIZVODA];

type ProductProps = {
    product: Proizvod,
    style: any,
    index: number
}

export const ProductComponent = ({ product, style, index }: ProductProps) => {

    return (
        <div 
            className={`product-container ${index % 2 == 0 && "odd-column"}`} 
            style={style}
        >
            <div className='product-id-div'>
                {product.proizvodID}
            </div>
            {PRODUCT_COLUMNS.map(property => {
                let value;
                if (![JEDINICA_MERE,TIP_PROIZVODA].includes(property)) value = product[property as keyof Proizvod];
                else {
                    //@ts-ignore
                    if (property === JEDINICA_MERE) value = product[property]["jedinicaMereId"];
                    //@ts-ignore
                    else value = product[property]["nazivTipaProizvoda"];
                }
                return (
                    <div className='product-column' key={value + `${index}`}>
                        {value}
                    </div>
                )
            })}
        </div>
    )

}

export default ProductComponent;