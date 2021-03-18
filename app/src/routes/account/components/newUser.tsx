import React from 'react';
import {Form, Col, Button} from 'react-bootstrap';

const NewUser = ({setEmail, setPassword, handleUser, placeholder, isHidden}):JSX.Element => {
    return (
        <Form>
            <Form.Row style={isHidden ? {display: ''} : {display: 'none'}}>
                <Col>
                    <Form.Control placeholder={placeholder.field1} onChange={(ev) => setEmail(ev.target.value)}/>
                </Col>
                <Col style={{marginLeft:"10px"}}>
                    <Form.Control placeholder={placeholder.field2} onChange={(ev) => setPassword(ev.target.value)} />
                </Col>
                <Col style={{marginLeft:"10px"}}>
                    <Button onClick={() => handleUser()}>{placeholder.field3}</Button>
                </Col>
            </Form.Row>
        </Form>
    )
}

export default NewUser;

