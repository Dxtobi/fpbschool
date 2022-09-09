import React, {
    Component
} from 'react'

import {
    connect
} from 'react-redux'
import Header from './components/Header';
import SideBar from './components/sideBar';
import { getGlobalInfo } from '../../actions/authActions';
import { addPost } from '../../actions/postsActions';
import { Link } from 'react-router-dom';

class NewPost extends Component {

    state = {
        lecturer: '',
        course: '',
        level:''
    };

    onAdd=()=>{
        const { lecturer, course, level } = this.state
        if (lecturer !== '' || course !== '' || level !== '') {
            const data = { lecturer, course, level }
            this.props.addPost(data)
            this.setState({
                lecturer: '',
                course: '',
                level: '',
            })
            console.log(data)
        }
    }
   

    onChangeValue=(e)=>{

        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        //console.log(this.state)
       // const { contentState, postHeader, cleared } = this.state;
       // const { tags } = this.props.auth.global;
        return (
            <div className='NewPost-page' >
                 <Header/>
                <div className="admin-container">
                    <br />
                    <br/>
                    <br />
               
                    <div className="adm-content-container">
                        <div className='form-holder'>
                            <input onChange={(e)=>this.onChangeValue(e)} className='enter-input' placeholder='LECTURER NAME' name='lecturer' value={this.state.lecturer} />
                            <input onChange={(e)=>this.onChangeValue(e)} className='enter-input' placeholder='COURSE CODE' name='course' value={this.state.course} />
                            <input onChange={(e)=>this.onChangeValue(e)} className='enter-input' placeholder='COURSE LEVEL' name='level' value={this.state.level} />
                            <button onClick={this.onAdd} className='enter-input-btn'>ADD</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getGlobalInfo, addPost})(NewPost);





/***
 * Origins and DiscoveryCD RF
 * What is Lorem Ipsum?
 * Lorem Ipsum
 * Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:

“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.
 */