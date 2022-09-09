import React, {
    Component
} from 'react'
import { FiPhoneCall, FiSearch } from 'react-icons/fi';
import { addMessage, getTags, getPostsTagged, getPosts } from '../../actions/postsActions';




import {
    connect
} from 'react-redux'
import Link from 'react-router-dom/Link';

class Footer extends Component {

    state = {
        adsText:`Well Noting Much To see here We just love Entertaining You.`,
        message: "",
        phone: "",
        skip:0
    };

    getTaggedPostF = (typeid) => {
       // console.log(newTag)
        const { skip } = this.state
       
            //console.log("same")
            this.props.getPostsTagged(typeid, skip)
            
            return
        
    }
    componentDidMount() {
        this.props.getTags()
    }
    

    sendMessage = () => {
        const {message, phone} = this.state
        if (message.length < 1 || phone.toString().length < 9) {
            console.log(message.length, phone.length )
            return
        }
        console.log("don")
        this.props.addMessage({ message, phone })
        this.setState({message:"", phone:""})
    }


    render() {
        const { tags } = this.props
       // console.log(tags)
        return (
            <div className='Footer-page'>
                <div className="footer_container2">
                <img src="/bida_logo.png" alt='' className="top-log"/>
                    <div className='footer-text'> <h1>FEDERAL POLY BIDA</h1> </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    tags:state.post.tags
});

export default connect(mapStateToProps, { addMessage, getTags, getPostsTagged, getPosts})(Footer);