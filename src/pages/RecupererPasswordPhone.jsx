import React from 'react'
import RecupererPasswordWithPhone from '../components/RecuperePasswordWithPhone'
const RecupererPassword = () => {
  return (
    
       <div class="col-xl-8 col-lg-10 col-md-12 m-auto text-center">
        <p class="mb-20" style={{margin:'15%'}}>
       </p>
        <h1 class="display-2 mb-30">Recover Password With Sms</h1>
        <p class="font-lg text-grey-700 mb-30">The link you clicked may be broken or the page may have been removed.
       
        visit the <a href="/"> <span> Homepage</span></a>or 
        <a href="/page-contact"><span>Contact us</span>
        </a> </p><a class="search-form"></a>
          <RecupererPasswordWithPhone/>
    </div>
  )
}

export default RecupererPassword
