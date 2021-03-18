import React from 'react';
import { JsxElement } from 'typescript';

const MapView = ():JSX.Element => {
    return (
        <>
            <div id="googleMap" style={{width:"100%",height:"400px"}}></div>
        </>
    )
}

export default MapView;