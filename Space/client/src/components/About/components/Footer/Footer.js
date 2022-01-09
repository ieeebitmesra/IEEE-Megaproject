import React from "react"
import './Footer.css';

const Footer = () =>
   <footer className="page-footer font-small blue pt-4" style={{ backgroundColor: '#263238', 'color': 'white' }}>
      <div className="container-fluid text-center text-md-left">
         <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
               <h5 className="text-uppercase">Space</h5>
               <p>Made with {"💖"} by <a style={{ textDecoration: 'none' }} href="mailto: team.space.793@gmail.com">Vinamra Mishra</a>
                  {" | "}<a style={{ textDecoration: 'none' }} href="mailto: team.space.793@gmail.com">Rishika Raj</a>
                  {" | "}<a style={{ textDecoration: 'none' }} href="mailto: team.space.793@gmail.com">Ratul Dawar</a>
               </p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3">
               <h5 className="text-uppercase">Links</h5>
               <ul className="list-unstyled">
                  <li><a href="https://space-dun-one.vercel.app/about">About</a></li>
                  <li><a href="https://space-dun-one.vercel.app/">Home</a></li>
               </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
               <h5 className="text-uppercase">Links</h5>
               <ul className="list-unstyled">
                  <li><a href="https://space-dun-one.vercel.app/problemset">Practice</a></li>
                  <li><a href="https://space-dun-one.vercel.app/interview">Interview</a></li>
               </ul>
            </div>
         </div>
      </div>

      <div className="footer-copyright text-center py-3">© 2022 Copyright:
         <a href="https://space-dun-one.vercel.app/" style={{textDecoration:'none'}}> Space</a>
      </div>

   </footer>

export default Footer