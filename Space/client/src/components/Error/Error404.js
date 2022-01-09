import React,{useEffect} from 'react'
import './Error404.css'
import { Link } from 'react-router-dom';

const Error404 = (props) => {
   props.setInterview(false);
   useEffect(() => {
      document.title = 'Error 404 | Space';
      // eslint-disable-next-line
   }, []);
   return (
      <>
         <div className='error-container'>
            <div id="error-page">
               <div class="content">
                  <h2 class="header" data-text="404">
                     404
                  </h2>
                  <h4 data-text="Opps! Page not found">
                     Opps! Page not found
                  </h4>
                  <p>
                     Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
                  </p>
                  <div class="btns">
                     <Link to="/">Return home</Link>
                     {/* <Link to="/">Report problem</Link> */}
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Error404
