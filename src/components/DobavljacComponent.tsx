import React from 'react';
import { Dobavljac } from '../types/model';

const DOBAVLJAC_COLUMNS:Array<string> = ["nazivDobavljaca","maticniBroj","email","pib","ziroRacun","website"];

type DobavljacProps = {
    dobavljac: Dobavljac,
    style: any,
    index: number,
    selectDobavljac: (dobavljac: Dobavljac) => void
}

export const DobavljacComponent = ({ dobavljac,index,style, selectDobavljac }: DobavljacProps) => {

    return (
        <div 
            className={`product-container ${index % 2 == 0 && "odd-column"} selectable`} 
            style={style}
        >
            <div className='product-id-div'>
                {dobavljac.dobavljacId}
            </div>
            {DOBAVLJAC_COLUMNS.map(property => {
                const value = dobavljac[property as keyof Dobavljac];
                return (
                    <div 
                        className='product-column' 
                        key={value + `${index}`}
                        onDoubleClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            console.log("Calling selectDobavljac");
                            console.log(dobavljac);
                            selectDobavljac(dobavljac);
                        }}
                    >
                        {value}
                    </div>
                )
            })}
        </div>
    )

}