import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import { handleToken } from "../reducers/authReducer";
import { useDispatch } from "react-redux";
const Payments = () =>{
    const dispatch = useDispatch();
    const getToken = (token) =>{
        console.log("this is the token", token);
        dispatch(handleToken(token));
    }
    return(
        <div className="flex items-center">
            <StripeCheckout
            name="FeedbackPulse"
            description="$5 for 5 surveys"
            amount = {500}
            token = {getToken}
            stripeKey= {process.env.REACT_APP_STRIPE_KEY}
            >
            <button className="text-xl shadow-md hover:shadow-lg bg-rose-500 hover:bg-rose-700  border-white py-2 px-5 block rounded text-white  dark:text-white md:dark:text-blue-500" aria-current="page">Add Credits</button>
            </StripeCheckout>
        </div>
    );
}

export default Payments;