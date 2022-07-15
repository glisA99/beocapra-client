import { Button, ButtonGroup } from '@mui/material';
import React from 'react';

type PaginationProps = {
    current: number,
    isFirst: boolean,
    last: number,
    isLast: boolean,
    changePage: (pageNumber: number) => void
}

export const PaginationFooter = ({ current, changePage, isFirst, isLast, last }: PaginationProps) => {

    return (
        <div className='pagination-footer'>
            <div className='content-footer-pagination'>
                <ButtonGroup size="small" aria-label="large button group">
                    <Button 
                        onClick={() => changePage(1)}
                        disabled={isFirst}
                    >
                        FIRST
                    </Button>
                    <Button 
                        disabled={isFirst}
                        onClick={() => changePage(current - 1)}
                    >
                        PREV
                    </Button>
                    <Button 
                        style={{color: "grey"}}
                        color="primary"
                    >
                        {current}
                    </Button>
                    <Button 
                        disabled={isLast}
                        onClick={() => changePage(current + 1)}
                    >
                        NEXT
                    </Button>
                    <Button 
                        onClick={() => changePage(last)}
                        disabled={isLast}
                    >
                        LAST
                    </Button>
                </ButtonGroup>
            </div>   
        </div>
    )

}