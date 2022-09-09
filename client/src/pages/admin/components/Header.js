import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
class heder extends Component {

       state = { 
         };
   
    componentDidMount() {
    // this.props.getTransactions()

   }


    render() {

        return (
            <div className='Admin-header'>
                <div className="adm-header-right">
                <div className='btn-holder_'>
                        <div className='link-btn_'>
                            <Link className='adm-btn' to='/create/post'>ADD COURSE</Link>
                        </div>
                        <div className='link-btn_'>
                            <Link className='adm-btn'to='/timetable'>EDIT COURSES</Link>
                        </div>
                        <div className='link-btn_'>
                            <Link  className='adm-btn' to='/generate'>TIME TABLE</Link>
                        </div>
                   </div>
                </div>
               
            </div>
        );
    }
}


const mapStateToProps = ( state ) => ({
    auth: state.auth,
    profile:state.profile
  });

export default connect( mapStateToProps, {  } )( heder );
//export default heder;