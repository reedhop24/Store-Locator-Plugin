import React, {useEffect} from 'react'
import MapView from './components/mapView';
import TextView from './components/textView';
import exportScript from './helper';
import exportTextArea from './textAreaHelp';
import {Row, Container} from 'react-bootstrap';
import env from "react-dotenv";

const Edit = ():JSX.Element => {

    const authToken = window.sessionStorage.getItem('token');
    const email = window.sessionStorage.getItem('email');
    const company = window.sessionStorage.getItem('companyID');
    let renderedFunction;
    
    useEffect(() => {
        const footer = document.getElementById('foot') as HTMLElement;
        const script = document.createElement('script') as HTMLScriptElement;

        renderedFunction = exportScript(company, email, authToken);
        script.innerHTML = renderedFunction;
        footer?.appendChild(script);

        const googleScript = document.createElement('script') as HTMLScriptElement;
        googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${env.GOOGLE_API_KEY}&callback=myMap`;

        footer?.appendChild(googleScript);

        return () => {
            footer.innerHTML = '';
        }
    }, []);

    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <MapView/>
                </Row>
                <Row className="justify-content-md-center">
                    <TextView viewFunct={exportTextArea(company, email, authToken)}/>
                </Row>
            </Container>
        </>
    )
}

export default Edit;