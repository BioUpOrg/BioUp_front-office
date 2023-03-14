import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Page500(){
    const location = useLocation();
    const message = new URLSearchParams(location.search).get('message');
    return(
        <>
        <h1>500</h1>
        <h2>{message}</h2>
        </>
    );
}