import React from 'react';
import {Table} from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';

const UserList = ({users}):JSX.Element => {
    return (
        <Table responsive="sm" className="form">
            <thead>
            <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Image</th>
            </tr>
            </thead>
            <tbody>
            {users.map((x) => {
                return (
                    <tr key={uuidv4()}>
                        <td>{x.id}</td>
                        <td className="user-email">{x.Email}</td>
                        <td className="user-image-container">{x.Picture ? <img src={x.Picture} alt='' className="user-image-list"></img> : <i className='far fa-user-circle'></i>}</td>
                    </tr>)
            })}
            </tbody>
        </Table>
    )
}

export default UserList;