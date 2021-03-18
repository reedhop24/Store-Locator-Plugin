import React, {useState, useEffect} from 'react'
import EditStore from './components/editStore';
import NewStore from './components/newStore';
import {Container, Row, Col} from 'react-bootstrap';
import LocationsList from './components/companyList';
import ErrorModal from '../modal/errorModal';
import axios from 'axios';

const Edit = ():JSX.Element => {

    const [locations, setLocations] = useState<Array<any>>([]);
    const [companyName, setCompanyName] = useState<String>('');

    const [newStoreName, setNewStoreName] = useState<String>('');
    const [newStoreQuant, setNewStoreQuant] = useState<String>('');
    const [newStoreZip, setNewStoreZip] = useState<String>('');
    const [newStoreCity, setNewStoreCity] = useState<String>('');
    const [newStoreState, setNewStoreState] = useState<String>('');
    const [newStoreAddress, setNewStoreAddress] = useState<String>('');

    const [editStoreNum, setEditStoreNum] = useState<number>();
    const [editStoreQuan, setEditStoreQuan] = useState<string>('');
    const [shouldDelete, setShouldDelete] = useState<boolean>(false);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalMsg, setModalMsg] = useState<string>('');

    const authToken = window.sessionStorage.getItem('token');
    const email = window.sessionStorage.getItem('email');
    const company = window.sessionStorage.getItem('companyID');

    useEffect(() => {
            (async ():Promise<void> => {
                try {
                    const getCompany = await axios.get(`http://localhost:4000/getCompany?companyID=${company}&email=${email}`, {headers: {token:authToken}});
                    setCompanyName(getCompany.data.currCompany.CompanyName);
                    setLocations(getCompany.data.currCompany.Locations);
                } catch(err) {
                    setModalMsg(err.toString())
                    setShowModal(true);
                }
            })();
    }, [authToken, company, email]);

    const updateStore = async (loc):Promise<void> => {
        try {
            const addStore = await axios.post(`http://localhost:4000/addStore?companyID=${company}`, {
                newLocations: loc}, 
                {
                    headers: {token:authToken}
                }
            );

            if(addStore.data.updatedLocations) {
                setLocations(addStore.data.updatedLocations)
            } else {
                setModalMsg(addStore.data.message);
                setShowModal(true);
            }
        } catch(err) {
            setModalMsg(err.toString());
            setShowModal(true);
        }
    }

    const postNewStore = async ():Promise<void> => {
        let max:Array<any> = [...locations];
        let maxNum:number = max.length > 0 ? max.sort((x, y) => y.storeNumber - x.storeNumber)[0].storeNumber : 0;

        if(newStoreName === '' || newStoreZip === '' || newStoreQuant === '' || newStoreAddress === '' || newStoreCity === '' || newStoreState === '') {
            setModalMsg('Fill in all fields');
            setShowModal(true);
        } else {
            const googleAPI = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newStoreAddress}+${newStoreCity}+${newStoreState}+${newStoreZip}&key=AIzaSyADdj9xWYY1tupqN99bmGflliFF3cv6kRM`)
            const {lat, lng} = googleAPI.data.results[0].geometry.location;

            updateStore([...locations, {
                storeNumber: maxNum+1,
                quantity: newStoreQuant,
                zipCode: newStoreZip,
                storeName: newStoreName,
                lat: lat,
                lng: lng
            }]);
        }
    }

    const editStore = async ():Promise<void> => {
        let newLoc:Array<any> = [];

        for(let i = 0; i < locations.length; i++) {
            if(locations[i].storeNumber == editStoreNum) {
                if(!shouldDelete) {
                    locations[i].quantity = editStoreQuan;
                    newLoc.push(locations[i]);
                } 
            } else {
                newLoc.push(locations[i]);
            }
        }

        updateStore(newLoc);
    }

    return (
        <Container>
            {showModal ? <ErrorModal shown={showModal} setIsShown={setShowModal} modalMsg={modalMsg} modalHead={'Error'}/> : null}
            <Row className="justify-content-md-center">
                <Col className="centered-col"><h4 className="company-name">{companyName}</h4></Col>
            </Row>
            <Row>
                <Col/>
                <Col xs={4}>
                    <EditStore editStoreNum={setEditStoreNum} editStoreQuan={setEditStoreQuan} editStore={editStore} setShouldDelete={setShouldDelete}/>
                </Col>
                <Col xs={5}>
                    <NewStore setName={setNewStoreName} setQuant={setNewStoreQuant} setZip={setNewStoreZip} sendStore={postNewStore} setCity={setNewStoreCity} setNState={setNewStoreState} setAddress={setNewStoreAddress}/>
                </Col>
                <Col/>
            </Row>
            <Row className="justify-content-md-center">
                <LocationsList locations={locations}/>
            </Row>
        </Container>
    )
}

export default Edit;