import React from 'react';
import {Table} from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';

const LocationsList = ({locations}):JSX.Element => {
    return (
        <>
            <Table responsive="sm" className="form">
                <thead>
                    <tr>
                        <th>Store Number</th>
                        <th>Store Name</th>
                        <th>Quantity</th>
                        <th>Zip Code</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </tr>
                </thead>
                <tbody>
                {locations.map((x) => {
                    return (
                        <tr key={uuidv4()}>
                            <td>{x.storeNumber}</td>
                            <td className="store-name">{x.storeName}</td>
                            <td className="store-quantity">{x.quantity}</td>
                            <td>{x.zipCode}</td>
                            <td>{x.lat}</td>
                            <td>{x.lng}</td>
                        </tr>)
                })}
                </tbody>
            </Table>
        </>
    )
}

export default LocationsList;