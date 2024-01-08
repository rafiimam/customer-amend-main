import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import xmlFormatter from 'xml-formatter';
//import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BasicInfoSection from './BasicInfoSection ';
import AddressInfoSection from './AddressInfoSection';
import GeneralInformation from './GeneralInformation';
import IdentificationDetails from './IdentificationDetails';
import VisaDetails from './VisaDetails';
import Compliance from './Compliance';
import Channels from './Channels';
import EmergencyContactInfo from './EmergencyContactInfo';


const Footer = () => {
    return (
        <footer style={{ background: 'rgb(103, 169, 255)',padding:'2px' ,margin:'-30px', textAlign: 'center' }}>
            <p>&copy; Jamuna Bank PLC.. All rights reserved.</p>
        </footer>
    );
};

const AmendCustomerButton = () => {
    const [formData, setFormData] = useState({
        CustTyp: '',
        CustNumber: '',
        FirstName: '',
        CustMidName: '',
        LastName: '',
        CustGrp: '',
        TitleCode: '',
        AddrLine2: '',
        Dmcle: '',
        BussPhnNum: '',
        Natlty: '',
        CountryOfRes: '',
        CustState: '',
        LangCode: '',
        IdTyp: '',
        IdNum: '',
        IdExpDt: '',
        DmstcRisk: '',
        CrossBrdrRisk: '',
        BrkrStat: '',
        HomeBrchNum: '',
        Risk: '',
        CustEvaluationReq: '',
        GrpID: '',
        FatherName: '',
        MotherMaidenName: '',
        ResdncyStat: '',
        CisOrgCode: '',
        BsrOrgCode: '',
        DtOfBirth: '',
        GndrCode: '',
        IncomeRange: '',
        CustRisk: '',
        Addr1: '',
        KYCDt: '',
        CountryOfBirth: '',
        IrcLmt: '',
        NameEmg: '',
        Addr8: '',
        RelationEmg: '',
        MoblieEmg: '',
        CustRiskImp: '',
        CounRiskImp: '',
        Thana1: '',
        SubOffice1: '',
        Addr11: '',
        StateCode1: '',
        CityCode1: '',
        CountryTemp: '',
        Thana2: '',
        PhnRsdnc1: '',
        PrimTyp1: '',
        SeconTyp1: '',
        PrimTyp2: '',
        SecndryTyp2: '',
        FnlSec: '',
        DisttBirth: '',
        BankNm: '',
        ErcNum1: '',
        IrcNum1: '',
        ErcExpryDt: '',
        IrcExpryDt: '',
        IrcIssueDt: '',
        IrcIssuePlace: '',
        ErcIssueDt: '',
        ErcIssuePlace: '',
        CountryOfTaxRsdnc: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [defaultValues, setDefaultValues] = useState(null);
    const [custNumberInput, setCustNumberInput] = useState('');

    const handleInputChange = (fieldName, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value,
        }));
    };

    const handleCustNumberChange = (value) => {
        setCustNumberInput(value);
    };

    const handleEnquireClick = async () => {
        try {
            setLoading(true);
            await fetchCustomerDetails(custNumberInput);
        } catch (error) {
            setLoading(false);  // Set loading to false in case of an error
            console.error('Error fetching customer details:', error);
        }
    };
    

    const fetchCustomerDetails = async (custNumber) => {
        try {
            const corsAnywhereUrl = 'http://localhost:8080/';
            const tokenApiUrl = `${corsAnywhereUrl}http://172.30.30.122:1010/v7/token`;
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            const body = new URLSearchParams({
                username: 'tcs',
                password: '123456',
                service_name: 'EnquireCustomer',
                token_type: 'enquiry',
                grant_type: 'password',
                amount: 0,
            });

            const response = await axios.post(tokenApiUrl, body, { headers });
            const token = response.data.access_token;

            fetchDefaultValues(custNumber, token);
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };



    const fetchDefaultValues = async (custNumber, token) => {
        try {
            const apiUrl = '/Playground/v7/Customer/EnquireCustomer';

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const body = {
                CustNumber: custNumber,
            };

            console.log('API URL:', apiUrl); 

            const response = await axios.post(apiUrl, body, { headers });
            console.log('Response:', response.data); 

            const data = response.data;

            if (data && data.Data && data.Data.CustInqData) {
                const custInqData = data.Data.CustInqData;
                setDefaultValues(custInqData);
                setLoading(false);

                console.log('CustInqData:', custInqData);


                Object.entries(custInqData).forEach(([key, value]) => {
                    console.log(`${key}: ${value}`);

                });

            } else {
                setLoading(false);
                setErrorMessage('User not found.');
                console.error('Invalid response format:', data);
            }
            setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
            }, 5000);
            // Set the default values obtained from the API to the state
        } catch (error) {
            console.error('Error fetching default values:', error);
        }
    };

    const fetchToken = async () => {
        try {
            const tokenApiUrl = 'http://172.30.30.122:1010/v7/token';
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            const body = new URLSearchParams({
                username: 'tcs',
                password: '123456',
                service_name: 'EnquireCustomer',
                token_type: 'enquiry',
                grant_type: 'password',
                amount: 0,
            });
            const response = await axios.post(tokenApiUrl, body, { headers });

            //const response = await axios.post(tokenApiUrl, body, { headers });
            const token = response.data.access_token;
            setLoading(false);

            //fetchDefaultValues('100011019851', token);
        } catch (error) {
            console.error('Error fetching token:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch token when the component mounts
        fetchToken();
        
    }, []);

    const handleAmendClick = async () => {
        try {
            const isFormDataEdited = Object.values(formData).some(value => value !== '');
            // Construct XML data from form data
            if (isFormDataEdited) {
                const xmlData = `<?xml version="1.0" encoding="utf-8"?>
            <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <amendCustomer xmlns="http://BaNCS.TCS.com/webservice/AmendCustomerInterface/v1">
                        <CustModRq xmlns="">
                            <RqHeader xmlns="http://TCS.BANCS.Adapter/BANCSSchema">
                                <InstNum>003</InstNum>
                                <BrchNum>999</BrchNum>
                                <TellerNum>2542</TellerNum>
                                <Flag4>W</Flag4>
                                <Flag5>Y</Flag5>
                                <UUIDSource>dev</UUIDSource>
                                <UUIDNUM>12345678901289123456</UUIDNUM>
                                <UUIDSeqNo>0001</UUIDSeqNo>
                            </RqHeader>
                            <Data xmlns="http://TCS.BANCS.Adapter/BANCSSchema">
                                ${Object.entries(defaultValues)
                        .map(([key, value]) => `<${key}>${isFormDataEdited ? formData[key] || value : value}</${key}>`)
                        .join('\n')}
                            </Data>
                        </CustModRq>
                    </amendCustomer>
                </Body>
            </Envelope>`;

                // API endpoint
                const apiUrl = '/AmendCustomer/AmendCustomerInterfaceHttpService';

                // Headers for the SOAP request
                const headers = {
                    'Content-Type': 'text/xml',
                };

                // Make the SOAP request using axios
                const response = await axios.post(apiUrl, xmlData, { headers });
                const formattedXmlResponse = xmlFormatter(response.data, { indentation: '    ' });

                // Log the formatted XML response in the console
                console.log('Formatted XML Response:', formattedXmlResponse);

                // Parse the XML response to JS object
                if (response.status < 200 || response.status >= 300) {
                    setErrorMessage('Something went wrong. Please try again later.');
                    console.error('API Error - Status:', response.status, 'Data:', response.data);
                } else {
                    // Parse the XML response to JS object
                    const parser = new xml2js.Parser({ explicitArray: false });
                    parser.parseString(response.data, (error, result) => {
                        if (error) {
                            console.error('XML Parsing Error:', error);
                        } else {
                            // Log the entire result object
                            console.log('Entire Result Object:', result);

                            // Navigate through SOAP envelope to access the response
                            const amendCustomerResponse = result['soap:Envelope']['soap:Body']['ns3:amendCustomerResponse'];
                            if (amendCustomerResponse && amendCustomerResponse.CustModRs) {
                                // Log the parsed response in the console
                                setSuccessMessage('User information updated successfully.');
                                console.log('API Response:', amendCustomerResponse.CustModRs);
                            } else {
                                setErrorMessage('Invalid response format. Please try again later.');
                                console.error('Invalid response format:', amendCustomerResponse);
                            }
                        }
                    });
                }
            } else {
                setErrorMessage('No changes are made to update.');
                console.warn('No changes made. Amend request not sent.');
            }

            setDefaultValues(null);
            setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
            }, 5000);

        } catch (error) {
            // Log any errors
            console.error('API Error:', error);
        }
    };

    return (
        <div>

{successMessage && (
                <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>
            )}

            {errorMessage && (
                <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
            )}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px', flexDirection: 'row', justifyContent: 'center' }}>
                <label>
                    Customer Number:
                    <input
                        className="custNum"
                        type="text"
                        value={custNumberInput}
                        onChange={(e) => handleCustNumberChange(e.target.value)}
                    />
                </label>
                <button onClick={handleEnquireClick} className="enquireBtn">Enquire</button>
            </div>
            {/* 
            {defaultValues === null ? (
                <p>Enter Customer Number...</p>
            ) : (
                Object.entries(defaultValues).map(([fieldName, fieldValue]) => (
                    <div key={fieldName} style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ flex: '0 0 150px', marginRight: '15px' }}>
                                {fieldName}:
                                <div style={{ flex: '1' }} className="value">
                                    <input
                                        type="text"
                                        value={formData[fieldName] || fieldValue || ''}
                                        onChange={(e) => handleInputChange(fieldName, e.target.value)}
                                    />
                                </div>
                            </label>
                        </div>
                    </div>
                ))
            )}
            */}

            {loading ? (
                <div className="bouncing-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            ) : defaultValues === null ? (
                <p style={{ display: 'flex', paddingBottom:'300px',alignItems: 'center', marginBottom: '50px', flexDirection: 'row', justifyContent: 'center' }}></p>
            ) : (
                <div className="box">
                    <BasicInfoSection formData={formData} defaultValues={defaultValues} handleInputChange={handleInputChange} />
                    <AddressInfoSection formData={formData} defaultValues={defaultValues} handleInputChange={handleInputChange} />
                    <GeneralInformation formData={formData} defaultValues={defaultValues} handleInputChange={handleInputChange} />
                    <IdentificationDetails formData={formData} defaultValues={defaultValues} handleInputChange={handleInputChange} />
                    <VisaDetails formData={formData} defaultValues={defaultValues} handleInputChange={handleInputChange} />
                    <Compliance formData={formData} defaultValues={defaultValues} handleInputChange={handleInputChange} />
                    <Channels formData={formData} defaultValues={defaultValues} handleInputChange={handleInputChange} />
                    <EmergencyContactInfo formData={formData} defaultValues={defaultValues} handleInputChange={handleInputChange} />
                    
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '100px', flexDirection: 'row', justifyContent: 'center' }}>
                        <button onClick={handleAmendClick} className="amendBtn">Submit</button>
                    </div>
                    
                </div>
                
                

            )}
            <Footer/>
        </div>
        
    );
};

export default AmendCustomerButton;
