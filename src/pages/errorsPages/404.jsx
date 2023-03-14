import React from 'react';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';

export default function Page404(){
    const location = useLocation();
    const message = new URLSearchParams(location.search).get('message');
    return(
        <>
        <div className="container" style={{marginBlock:"200px"}}>
            <div className="row">
                <div className='col-xl-8 col-lg-10 col-md-12 m-auto text-center'>
                    <p className='mb-20'>
                        <img src="/assets/images/pages/page-404.png" alt="404 logo" />
                    </p>
                    <h1 className='display-2 mb-30'>{message}</h1>
                    <p className='font-lg text-grey-700 mb-30'>
                    The link you clicked may be broken or the page may have been removed.
                    <br />
                    visit the 
                    <Link to="/Contact"><span>Contact us</span></Link>
                    </p>
                    <div className='search-form'>
                        <form action="#">
                            <input type="text" placeholder='Search...'/>
                            <button type='submit'><i className='fi-rs-search'></i></button>
                        </form>
                    </div>
                    <Link to="/" className='btn btn-default submit-auto-width font-xs hover-up mt-30'>
                        <i className='fi-rs-home mr-5'></i>
                        back To Home Page
                    </Link>
                </div>
            </div>
        </div>
        {/* <h1>404</h1>
        <h2>{message}</h2> */}
        </>
    );
}