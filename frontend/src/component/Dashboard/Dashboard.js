import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import '../../App.css'
import axios from 'axios';
import { BAPI, SCRAPER } from '../../backend';
import {isAuthenticated} from '../../helper/index'

export default function Dashboard() {

  const loggeduser=isAuthenticated().data.user
  // console.log(loggeduser)

  const [data,setData]=useState([])
    const [news,setNews]=useState([])
    const [user,setUser]=useState([])

    const getUser=async()=>{
      await axios.post(`${BAPI}/get-user`,{
        _id:loggeduser._id
      }).then(response=>{
        setUser(response.data.data[0])
        // console.log(user)
        getUserAllowedArticles()
      }).catch(err=>{
        console.log(err)
      })
    }

  const getData=async()=>{

    
    await axios.get(`${SCRAPER}/data`).then(response=>{
        setData(response.data)
        sendToDB();
    }).catch(err=>{
        console.log(err)
    })

  }

  const sendToDB=async()=>{

    await axios.post(`${BAPI}/add-news`,{
        newsData:data
    }).then(response=>{
        // console.log(response)
    }).catch(err=>{

        console.log("Error",err)
    })

  }

  const getUserAllowedArticles=async()=>{
    console.log(user)
    await axios.post(`${BAPI}/get-news`,{
      exid:user.deleted && []
    }).then(response=>{
      // console.log("res",response.data.data)
      setNews(response.data.data)
    }).catch(err=>{
      console.log(err)
    })

  }

  const deleteArticle=async(id)=>{

    await axios.post(`${BAPI}/add-delete`,{
      _id:loggeduser._id,
      did:id
    }).then(resp=>{
        console.log("re",resp)  
    }).catch(err=>{
      console.log(err)
    })

  }

  const readArticle=async(id)=>{

    await axios.post(`${BAPI}/add-read`,{
      _id:loggeduser._id,
      rid:id
    }).then(resp=>{
        console.log("re",resp)  
    }).catch(err=>{
      console.log(err)
    })

  }



  useEffect(()=>{
    getData()
  },[])

  useEffect(()=>{
    getUser()
  },[])
   
  return (
  <div className='mt-5 text-white p-4 container-fluid overflow-auto'>

    <center>
        <h1 className='fn'>
            Latest News
        </h1>
        <hr />
        <div className="container overflow-auto">
        {
          news &&  news.map((content,index)=>{
                return (<div className="row p-2 border border-2 border-white m-2">
                    <b><a href={content.url} className='text-white'>{content.title}</a></b><hr></hr><br></br>
                    <div className="col-lg-3 mt-lg-2 mb-lg-2"><b>Posted On: </b>{content.post_date}</div>
                    <div className="col-lg-3 mt-lg-2 mb-lg-2"><b>Upvote:</b> {content.upvote}</div>
                    <div className="col-lg-3 mt-lg-2 mb-lg-2"><b>Comments:</b> {content.comments}</div>
                    <div className="col-lg-3 mb-lg-2">
                        <button className="btn btn-danger m-1 " onClick={e=>{
                          deleteArticle(content._id)
                        }}>Delete </button>
                      {user.already_read.indexOf(content._id) ? <button className="btn btn-warning m-1 "  onClick={e=>{
                          readArticle(content._id)
                        }}>Read </button>: <button className="btn btn-secondary m-1 "  >Already Read </button>}
                    </div>
                </div>)
            })
        }
        </div>
    </center>

  </div>
  )
}