import React from 'react';
import { StavkaPrijemnicaDobavljaca } from "../types/model";
import { FixedSizeList as List } from 'react-window';
import { ReceiptItemComponent } from './ReceiptItemComponent';
import { ExtendedStavka } from './CreateReceiptPage';

const STAVKA_COLUMNS = ["PROIZVOD_ID","NAZIV PROIZVODA","KOLICINA","VREDNOST"];

type ReceiptItemListProps = {
    stavke: Array<ExtendedStavka>
}

export const ReceiptItemList = ({ stavke }: ReceiptItemListProps) => {

    return (
        <React.Fragment>
        <div className='product-container-h'>
            {STAVKA_COLUMNS.map(column => {
                return (
                    <div className='product-column-h' style={{width: "25%"}}>
                        {column}
                    </div>
                )
            })}
        </div>
        <List
            itemCount={stavke.length}
            height={300}
            width={"100%"}
            itemSize={60}
            itemData={stavke}
            className="virtualized-list"
            layout="vertical"
            overscanCount={4}
            style={{border: "2px solid grey"}}
        >
            {({ index, data, style }: any) => {
                return (
                    <ReceiptItemComponent
                        stavka={data[index]}
                        index={index}
                        style={style}
                    />
                );
            }}
        </List>
        </React.Fragment>
    )
}