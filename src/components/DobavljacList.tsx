import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Dobavljac } from '../types/model';

const DOBAVLJAC_COLUMNS = ["Naziv dobavljaca","Maticni broj","Maticni broj","PIB",
                        "Ziro racun","Website"];

type DobavljacListProps = {
    dobavljaci: Array<Dobavljac>
}

export const DobavljacList = ({ dobavljaci }: DobavljacListProps) => {

    return (
        <React.Fragment>
        <div className='product-container-h'>
            <div className='product-id-div'>
                ID
            </div>
            {DOBAVLJAC_COLUMNS.map(column => {
                return (
                    <div className='product-column-h'>
                        {column}
                    </div>
                )
            })}
        </div>
        <List
            itemCount={dobavljaci.length}
            height={400}
            width={"100%"}
            itemSize={60}
            itemData={dobavljaci}
            className="virtualized-list"
            layout="vertical"
            overscanCount={4}
            style={{border: "2px solid grey"}}
        >
            {({ index, data, style }: any) => {
                return (
                    <></>
                );
            }}
        </List>
        </React.Fragment>
    )

}