// quotebuiilder.js
import React, { useState } from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { validationSchemas } from './form/formValidationSchemas';

import ConsultantDetails from './form/ConsultantDetails';
import CustomerDetails from './form/CustomerDetails';
import PackageDetails from './form/PackageDetails';
import PassengerDetails from './form/PassengerDetails';
import FlightDetails from './form/FlightDetails';
import HotelDetails from './form/HotelDetails';
import OtherDetails from './form/OtherDetails';
import './App.css';


//import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
//import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
//import { Settings, DateTime } from 'luxon';
//Settings.defaultLocale = 'en-GB'; // Set Luxon to use the UK locale globally

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log("API_BASE_URL:", API_BASE_URL);


const TOTAL_STEPS = 8;

function QuoteBuilder() {
    const [step, setStep] = useState(0);
    const [validatedSteps, setValidatedSteps] = useState([0]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const formik = useFormik({
        initialValues: {
            consultantInitials: '',
            travelConsultant: '',
            consultantMobile: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            packageIncludes: [],
            notes: '',
            adults: 0,
            youth: 0,
            child: 0,
            infant: 0,
            airline: '',
            flightType: '',
            departureAirport: '',
            returnAirport: '',
            flightRefundPolicy: '',
            departureDate: null,
            departureFlightTime: '',
            returnDate: null,
            returnFlightTime: '',
            flightTimeUpload: '',
            totalNights: '0',
            firstDestination: '',
            makkahHotel: '',
            nightsInMakkah: '',
            makkahHotelRating: '',
            makkahCheckInDate: null,
            makkahCheckOutDate: null,
            makkahRoomType: '',
            makkahBoardType: '',
            makkahRoomCount: 0,
            totalRoomsMakkah: 0,
            extraInfantBedsMakkah: 0,
            totalBedsMakkah: 0,
            madinahHotel: '',
            nightsInMadinah: '',
            madinahHotelRating: '',
            madinahCheckInDate: null,
            madinahCheckOutDate: null,
            madinahRoomType: '',
            madinahBoardType: '',
            madinahRoomCount: 0,
            totalRoomsMadinah: 0,
            extraInfantBedsMadinah: 0,
            totalBedsMadinah: 0,
            visa: '',
            otherVisa: '',
            transportByRoad: [],
            transportByTrain: [],
            ziaraat: [],
            lateCheckIn: false,
            otherInfo: '',
            flightRateAdult: 0,
            flightRateYouth: 0,
            flightRateChild: 0,
            flightRateInfant: 0,
            flightTotal: 0,
            makkahRoomRates: 0,
            totalMakkahRoomCost: 0,
            totalMakkahRoomCostPP: 0,
            madinahRoomRates: 0,
            totalMadinahRoomCost: 0,
            totalMadinahRoomCostPP: 0,
            averageBeds: 0,
            totalMinusFlightsPP: 0,
            totalHotelsCost: 0,
            totalHotelsCostPP: 0,
            extraInfantBedCost: 0,
            visaCostPP: 0,
            transportZiaraathCostPP: 0,
            trainCostPP: 0,
            totalVisaCost: 0,
            totalTransportZiaraathCost: 0,
            totalTrainCost: 0,
            localGuideCost: 0,
            profitPP: 0,
            totalProfit: 0,
            adultPricePP: 0,
            youthPricePP: 0,
            childPricePP: 0,
            infantPricePP: 0,
            grandTotal: 0,
            totalPP: 0,
        
            


        },
        validationSchema: validationSchemas[step],
        onSubmit: (values) => {
            const isLastStep = step === TOTAL_STEPS - 1;
            if (!validatedSteps.includes(step + 1)) {
                setValidatedSteps(prev => [...prev, step + 1]);
            }

            if (isLastStep) {
                handleSubmit(values);
            } else {
                setStep(step + 1);
            }
        },
    });

    const handleSubmit = async (finalData) => {
        console.log(formik.values)
        // Create a FormData object to handle data submission via multipart/form-data
        const formData = new FormData();
        
        // Append all formik values to formData
        Object.keys(finalData).forEach(key => {
            if (key === 'packageIncludes') {
                formData.append(key, finalData[key].join(', '));  // Convert array to comma-separated string if needed
            } else if (key === 'flightTimeUpload' && finalData[key]) {
                formData.append(key, finalData[key]);  // Append file blob
            } else {
                formData.append(key, finalData[key]);
            }
        });
    
        try {
            const response = await fetch(`${API_BASE_URL}/api/submit-quote`, {
                method: 'POST',
                body: formData,  // Use FormData instance
                
            });
            const data = await response.json();
    
            if (response.ok) {
                console.log('Submission successful', data);
                setIsSubmitted(true);
            } else {
                console.error('Submission failed:', data.message);
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };
    
    const resetFormAndState = () => {
        formik.resetForm();
        setStep(0);
        setValidatedSteps([0]);
        setIsSubmitted(false);
    };

    const ProgressBar = ({ onClick, stepTitles }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                {stepTitles.map((title, i) => (
                    <Typography
                        key={i}
                        variant="caption"
                        sx={{
                            width: `${100 / stepTitles.length}%`,
                            textAlign: 'center',
                            color: i <= step ? 'primary.main' : 'grey.500',
                        }}
                    >
                        {title}
                    </Typography>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '2px', width: '100%' }}>
                {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                    <Box
                        key={i}
                        sx={{
                            width: `${100 / TOTAL_STEPS}%`,
                            height: '20px',
                            bgcolor: i <= step ? 'primary.main' : 'grey.300',
                            '&:hover': {
                                bgcolor: validatedSteps.includes(i) ? 'secondary.light' : '',
                                cursor: validatedSteps.includes(i) ? 'pointer' : 'default',
                            },
                        }}
                        onClick={() => onClick(i)}
                    />
                ))}
            </Box>
        </Box>
    );

    if (isSubmitted) {
        return (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="h6">Submission successful!</Typography>
                <Button variant="contained" onClick={resetFormAndState}>New Quote</Button>
            </Box>
        );
    }

    const handleProgressBarClick = (index) => {
        if (validatedSteps.includes(index)) {
            setStep(index);
        }
    };

    const canProceedToNextStep = () => {
        console.log("Formik isValid:", formik.isValid);
        console.log("Formik errors:", formik.errors);
        return formik.isValid || validatedSteps.includes(step + 1);
    };

    const renderStep = () => {
        switch (step) {
            case 0: return <ConsultantDetails formik={formik} />;
            case 1: return <CustomerDetails formik={formik} />;
            case 2: return <PackageDetails formik={formik} />;
            case 3: return <PassengerDetails formik={formik} />;
            case 4: return <FlightDetails formik={formik} />;
            case 5: return <HotelDetails formik={formik} />;
            case 6: return <OtherDetails formik={formik} />;
            default: return <div>Step {step + 1}</div>;
        }
    };

    return (
        //<LocalizationProvider dateAdapter={AdapterLuxon}>
        <div className="App-content">
            <ProgressBar onClick={handleProgressBarClick} stepTitles={[
                "Consultant Details",
                "Customer Details",
                "Package Details",
                "Passenger Details",
                "Flight Details",
                "Hotel Details",
                "Other Details",
                "Summary & Pricing"
            ]} />
            <form onSubmit={formik.handleSubmit}>
                {renderStep()}
                <Box sx={{ mt: 2 }}>
                    <Button variant="outlined" onClick={() => setStep(step - 1)} disabled={step === 0}>
                        Previous
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ ml: 2 }}
                        disabled={!canProceedToNextStep()}
                    >
                        {step === TOTAL_STEPS - 1 ? 'Submit' : 'Next'}
                    </Button>
                </Box>
            </form>
        </div>
        //</LocalizationProvider>
    );
}

export default QuoteBuilder;
