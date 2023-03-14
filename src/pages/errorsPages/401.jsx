import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Page401(){
    const location = useLocation();
    const message = new URLSearchParams(location.search).get('message');
    return(
        <>
        <h1>401</h1>
        <h2>{message}</h2>
        </>
    );
}