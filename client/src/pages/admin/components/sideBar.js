import React, { Component } from 'react'
import {  FiUser, FiHome, FiLogOut, } from 'react-icons/fi';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from "../../../actions/authActions";
import YesNoModel from './YesNoModel';

class SideBar extends Component {
    state = {
         showLogoutModel:false
     }
    render() {
        const {showLogoutModel}=this.state
        return (
            <div className="admin-navigation-bar">
                <div >
                    <div>
                            <Link to="/create/post" className="adm-navigation-btn">
                                    <div className="adm-navigation-btn-text">ADD NEW LECTURE</div>
                                    <FiHome size={30} className="adm-navigation-btn-icon"/>
                                </Link>

                        <div className="sidebarDividers">Tables</div>
                        
                                <Link to="/admins" className="adm-navigation-btn">
                                    <div className="adm-navigation-btn-text">ADMINS</div>
                                    <FiUser size={30} className="adm-navigation-btn-icon"/>
                                </Link>
                    </div>
                    <button onClick={() => {
                       this.setState({showLogoutModel:!showLogoutModel})
                    }} className="adm-navigation-btn nave-section-sidebar-logout">
                            <div className="adm-navigation-btn-text">LOGOUT</div>
                            <FiLogOut size={30} className="adm-navigation-btn-icon"/>
                        </button>
                        </div>

                {
                    showLogoutModel && (
                        <YesNoModel
                            yesFunction={() => {
                                this.props.logoutUser();
                                this.setState({showLogoutModel:!showLogoutModel})
                            }}
                            noFunction={() => {
                                this.setState({showLogoutModel:!showLogoutModel})
                            }}

                            message="Hmm.. You really want to log out"

                        />
                    )
                        }

                    </div>
        )
    }
}
const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)