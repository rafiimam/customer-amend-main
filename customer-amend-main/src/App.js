import React from 'react';
import AmendCustomerButton from './AmendCustomerButton';
import Logo from './JBL_NEW_LOGO.png'

function App() {
    return (
        <div className="App">
            <div className='header'>
                <img src={Logo} className='logo' alt='JamunaBankLogo'/>
                <h4 style={{ textAlign: 'center', marginTop:'-20px', color:'white', paddingBottom:'30px' }}>Update Customer Info.</h4>
            </div>
            <AmendCustomerButton />
        </div>
    );
}

export default App;
