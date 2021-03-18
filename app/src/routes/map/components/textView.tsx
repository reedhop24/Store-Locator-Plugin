import React from 'react';

const TextView = ({viewFunct}):JSX.Element => {
    return (
        <>
            <textarea rows={15} cols={100} defaultValue={viewFunct}></textarea>
        </>
    )
}

export default TextView;