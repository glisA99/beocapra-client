import React from 'react';
import { StavkaPrijemnicaDobavljaca } from '../types/model';
import { ExtendedStavka } from './CreateReceiptPage';

const STAVKA_COLUMNS:Array<string> = ["proizvodId","nazivProizvoda","kolicina","vrednost"];

type ReceiptItemComponentProps = {
    stavka: ExtendedStavka,
    style: any,
    index: number
}

export const ReceiptItemComponent = ({ stavka,index,style }: ReceiptItemComponentProps) => {

    return (
        <div 
            className={`product-container ${index % 2 == 0 && "odd-column"} selectable`} 
            style={{ ...style}}
        >
            {STAVKA_COLUMNS.map(property => {
                const value = stavka[property as keyof StavkaPrijemnicaDobavljaca];
                return (
                    <div 
                        className='product-column' 
                        style={{width: "25%"}}
                        key={value + `${index}`}
                    >
                        {value}
                    </div>
                )
            })}
        </div>
    )

}