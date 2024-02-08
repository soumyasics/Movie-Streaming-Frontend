import React from 'react'
import logo from "../../Assets/Vector.png";
import LandingNavbar from "../Navbars/LandingNavbar";
import { Link } from 'react-router-dom';

function UserLogin() {
  return (
    <div>
      <div className="landing_banner">
        <LandingNavbar />
        <div className=" container">
          <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_left_box">
              <img src={logo} alt="logo" />
              <p><span className='logo_red' >Cine</span>Stream</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 landing_banner_right_box">
              <div className='user_reg_container ' >
                <p className='mt-5' >Sign In</p>
                <div className='row mt-5' >
                    
                    <div className='col-lg-12 col-md-12 col-sm-12 user_reg_input_grp ' >
                       
                        <input type='email' placeholder='Enter Your Email'/>
                    </div>
                    
                    <div className='col-lg-12 col-md-12 col-sm-12 user_reg_input_grp mt-3' >
                       
                        <input type='password' placeholder='Enter Your Password'/>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 user_reg_input_grp_btn mt-4' >
                       
                       <button>Sign Up</button>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12 mt-4' >
                       
                       <h6>New to Cinestream? <Link to='/user_registration' >Sign Up Now</Link></h6>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
