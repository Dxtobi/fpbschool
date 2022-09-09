import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, getPostsTagged, deletePost } from '../actions/postsActions';
import { getGlobalInfo } from '../actions/authActions'
import Header from './admin/components/Header';





export class Editcourse extends Component {
    state = {
        skip: 0,
        currentTag: "all",
    }
    componentWillMount() {
        //this.props.getGlobalInfo()
        this.props.getPosts()
    }
    componentDidUpdate() {
    // console.log(this.state)
    }


    render() {
        const { posts, loading, tags } = this.props

        console.log(posts, loading, tags )

        return (
            <div className="Home_container">
                <Header/>
                <img src="/bida_logo.png" alt='' className="top-log"/>
                <div className='HEADER'>LECTURERS TABLE</div>
                <br />
                <div className='lecturer__h'>
                                <div className='lect__h'>LECTURERS NAME</div>
                                <div className='lect__h'>COURSE</div>
                    <div className='lect__h'>LEVEL</div>
                    <div className='lect__h'>DELETE</div>
                </div>
                {
                    posts.map((e, i) => {
                        return (
                            <div className='lecturer__' key={i}>
                                <div className='lect__'>{e.lecturer}</div>
                                <div className='lect__'>{e.course}</div>
                                <div className='lect__'>{e.level}</div>
                                <button onClick={()=>{this.props.deletePost(e._id)}} className='delete-btn'>Delete</button>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
   // auth: state.auth,
    posts: state.post.posts,
    tags:state.post.tags,
    loading:state.post.loading
    
})



export default connect(mapStateToProps, {getPosts, getPostsTagged, getGlobalInfo, deletePost})(Editcourse)
