import React from 'react';
import {Form, Button, Col} from 'react-bootstrap';

const NewStore = ({setName, setQuant, setZip, sendStore, setNState, setCity, setAddress}):JSX.Element => {
    return(
        <>
            <Form className="form">
                <h6>Create new Store</h6>
                <Form.Group>
                    <Form.Label htmlFor="new-store">New Store Name</Form.Label>
                    <Form.Control id="new-store" type="string" onChange={(ev) => setName(ev.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>New Store Address</Form.Label>
                    <Form.Control onChange={(ev) => setAddress(ev.target.value)}/>
                </Form.Group>
                <Form.Group>
                        <Form.Label htmlFor="new-zip">New Store City</Form.Label>
                        <Form.Control id="new-zip" type="string" onChange={(ev) => setCity(ev.target.value)}/>
                    </Form.Group>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="new-zip">New Store State</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." onChange={(ev) => setNState(ev.target.value)} >
                            <option value=""></option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="new-zip">New Store Zip</Form.Label>
                        <Form.Control id="new-zip" type="number" onChange={(ev) => setZip(ev.target.value)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Label htmlFor="new-quant">New Store Quantity</Form.Label>
                    <Form.Control id="new-quant" type="number" onChange={(ev) => setQuant(ev.target.value)}/>
                </Form.Group>
                <div className="centered-button">
                    <Button onClick={() => sendStore()}>Create</Button>
                </div>
            </Form>
        </>
    )
}

export default NewStore;