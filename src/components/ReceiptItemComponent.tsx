import React from 'react';
import { StavkaPrijemnicaDobavljaca } from '../types/model';

const STAVKA_COLUMNS:Array<string> = ["proizvodId","kolicina","vrednost"];

type ReceiptItemComponentProps = {
    stavka: StavkaPrijemnicaDobavljaca,
    style: any,
    index: number
}

export const ReceiptItemComponent = ({ stavka,index,style }: ReceiptItemComponentProps) => {

    return (
        <div 
            className={`product-container ${index % 2 == 0 && "odd-column"} selectable`} 
            style={style}
        >
            {STAVKA_COLUMNS.map(property => {
                const value = stavka[property as keyof StavkaPrijemnicaDobavljaca];
                return (
                    <div 
                        className='product-column' 
                        key={value + `${index}`}
                    >
                        {value}
                    </div>
                )
            })}
        </div>
    )

}