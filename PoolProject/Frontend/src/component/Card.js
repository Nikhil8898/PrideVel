
import React from "react"
import { useState } from "react";
import Invest from "./Invest";
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export default function Card(props){

    //dialog
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [position, setPosition] = useState('center');
    
    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayPosition': setDisplayPosition,
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="invest" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }

        return (
            <div className="card  ">
                <div>
                    {props.t0} / {props.t1}
                </div>
                <div>
                    <p>xyz</p>
                </div>
                <div>
                    <p>xyz</p>
                </div>
                <div>
                    {props.name}
                </div>
                <div>
                    <Button className="p-1	" label="Invest" icon="pi pi-check-circle" onClick={() => onClick('displayBasic')} />
                    <Dialog header="Add Liquidity" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                        <div>
                            < Invest 
                                t0={props.t0}
                                t1={props.t1}
                            />
                        </div>
                    </Dialog>
                </div>

            </div>
        )
}
 