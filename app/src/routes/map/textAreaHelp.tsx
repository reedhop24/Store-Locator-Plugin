const exportTextArea = (companyID, email, token):string => {
    return `            
            CSS.
            <style>
                #googleMap {
                    width:50%;
                    height: 400px;
                }
            </style>

            HTML body.
            <body>
                <div id="googleMap"></div>
            </body>

            HTML footer. Replace YOUR_API_KEY with your Google API Key.
                <script>
                    function myMap(){let o=47.6338616,e=-117.421531,n=4;const t=t=>{o=t.coords.latitude,e=t.coords.longitude,n=10;var a={center:new google.maps.LatLng(o,e),zoom:n},i=new google.maps.Map(document.getElementById("googleMap"),a);fetch("http://localhost:4000/getCompany?companyID=${companyID}&email=${email}",{headers:{token:"${token}"}}).then(o=>o.json()).then(o=>{o.currCompany.Locations.map(o=>{const{lat:e,lng:n}=o;var t=new google.maps.Marker({position:{lat:e,lng:n},map:i}),a=new google.maps.InfoWindow;google.maps.event.addListener(t,"click",function(o,e){return function(){a.setContent("<h4>"+e.storeName+"</h4><p>Quantity: "+e.quantity+"</p>"),a.open(i,o)}}(t,o))})})};navigator.geolocation&&navigator.geolocation.getCurrentPosition(t)}
                </script>
                <script src="https://maps.googleapis.com/maps/api/js?key={YOUR_API_KEY};callback=myMap"></script>
            `
}

export default exportTextArea;