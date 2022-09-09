import React, { Component } from 'react'
import { FiFile, FiUser } from 'react-icons/fi';



import { getGlobalInfo} from '../../actions/authActions';
import { connect } from 'react-redux'
import Header from './components/Header';
//import { Link } from 'react-router-dom';
import SideBar from './components/sideBar';
import { Link } from 'react-router-dom';

class AdminHome extends Component {

    state = {
        lastPost: null,
        posts: 0,
        site: null,
        users: 0
         };
   
    componentDidMount() {
     this.props.getGlobalInfo()

    }
    componentWillUpdate(np) {
        console.log(np.auth.global)
       
    }



    render() {
        const {
             posts, site, users, lastPost
        } = this.props.auth.global

        console.log(posts)
        return (
            <div className='AdminHome-page'>
                <Header/>
                <div className="admin-container">
                    <br />
                    <br/><br/>
                   
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => ({
    auth: state.auth,
    profile:state.profile
  });

export default connect( mapStateToProps, {getGlobalInfo} )( AdminHome );
//export default AdminHome;