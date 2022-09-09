import React, { Component } from "react";
import { getPosts } from './actions/postsActions';
import { logoutUser } from './actions/authActions';

import "./Generate.css";
import { connect } from 'react-redux'
import Header from "./pages/admin/components/Header";



class Generate extends Component {
  state = { value: "", data:[], days:["Time",'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',] };

    
    componentDidMount() { 
    this.props.getPosts()
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.posts)
        if (nextProps.posts) {
            this.setState({data:nextProps.posts})
        }
    }
  onChangeHandler = e => {
    this.setState({ value: e.target.value }, () => {
      this.props.Generate(this.state.value);
    });
  }

    onGenerate = () => {
        let newData = this.state.data;
       // newData.push(  { coursecode: 'No lectures', lecturer: "", level: "" });
        let array = newData
        let currentIndex = array.length, randomIndex;
        console.log(newData)
      while (currentIndex != 0) {
        //pck a remaining element
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          //And swap it with current element
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];

        }

        this.setState({data:array})
        return array
  }
   
  render() {
    return (
        <div>
            <Header/>
            <div className="button-holders">
                <button onClick={this.onGenerate} className="generate-btn">Generate Table</button>
                <button onClick={()=>window.print()} className="generate-btn">Print</button>
            </div>
            <div className="table-holder">

            <table>
                    <tr>
                    <th>DAYS/TIME</th>
                    <th>8:00-10:00am</th>
                    <th>10:30-12:30pm</th>
                    <th>01:00-03:00pm</th>
                    <th>03:30-05:00pm</th>
                </tr>
                    <tbody>
                        <tr>
                        <td>Monday</td>
                        {
                            this.state.data.slice(0,4).map((e, i) => {
                                return <td >
                                {e.coursecode}<br />
                                    {e.lecturer}<br />
                                    {e.level}
                                    </td>
                                
                            })
                        }
                       </tr>

                        <tr>
                        <td>Tuesday</td>
                        {
                            this.state.data.slice(4,8).map((e, i) => {
                                return <td>
                                {e.coursecode}<br />
                                    {e.lecturer}<br />
                                    {e.level}
                                    </td>
                                
                            })
                        }
                        </tr>
                        <tr>
                        <td>Wednesday</td>
                        {
                            this.state.data.slice(3,7).map((e, i) => {
                                return <td>
                                {e.coursecode}<br />
                                    {e.lecturer}<br />
                                    {e.level}
                                    </td>
                                
                            })
                        }
                        </tr>
                        <tr>
                        <td>Thursday</td>
                        {
                            this.state.data.slice(1,5).map((e, i) => {
                                return <td>
                                    {e.coursecode}<br />
                                    {e.lecturer}<br />
                                    {e.level}
                                    </td>
                                
                            })
                        }
                        </tr>
                        <tr>
                        <td>Friday</td>
                        {
                            this.state.data.slice(4,6).map((e, i) => {
                                return <td>
                                {e.coursecode}<br />
                                    {e.lecturer}<br />
                                    {e.level}
                                    </td>
                                
                            })
                        }
                       </tr>
                        <tr>
                        <td>Saturday</td>
                        {
                            this.state.data.slice(2,5).map((e, i) => {
                                return <td>
                                {e.coursecode}<br />
                                    {e.lecturer}<br />
                                    {e.level}
                                    </td>
                            })
                    }
                        </tr>
                </tbody>

            </table>
            </div>

            <button onClick={()=>this.props.logoutUser()} className="logout-btn">LOG OUT</button>
        </div>
        
    );
  }
}

const mapStateToProps = (state) => ({
    // auth: state.auth,
     posts: state.post.posts,
     tags:state.post.tags,
     loading:state.post.loading

 })

export default connect(mapStateToProps, {getPosts, logoutUser})(Generate)


