import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './ComponentCss/channelAboutPage.css'
import { doc, getDoc, collection, updateDoc } from '@firebase/firestore';
import { db, auth } from '../Firebase';
import { onAuthStateChanged } from '@firebase/auth';
export const ChannelAboutPage = () => {

    const { channelId }: { channelId: string } = useParams();
    //console.log("from channel ChannelAboutPage "+channelId);
    const [userId, SetUserId] = useState('')
    const channelRef = doc(db, 'channels', channelId);
    const [description,SetDescription]=useState('')
    const [clickedOnEmail,SetClickedOnEmail]=useState(false)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            SetUserId(user.uid)
        }

    })

    const [channelData, SetChannelData] = useState({});
    useEffect(() => {
        const getchannelData = async () => {
            const tempchanneldata = await getDoc(channelRef);


            SetChannelData(tempchanneldata.data());

        }

        getchannelData();
    }, [])
    const updateDescription= async()=>{
        const ref = doc(db,`channels/${channelId}`)
       await updateDoc(ref,{description:description}).then(alert("Description updated"));
    }
    return (
        <>



            <div className="container">
                <div className="descriptionAndLinks">
                    <div className="part1">
                        <h6 className="des"><b>Description</b></h6>
                        <hr />
                        <small className="para1">
                            Hi, <br />



                        </small>
                        {
                            userId == channelId ? (<div className="inputcomment">

                                <form className="CommentForm"   >
                                    <input placeholder={channelData.description ? channelData.description : "loading...."} type="text" value={description} onChange={(e) => { SetDescription(e.target.value) }} />
                                </form>
                                <button onClick={(e) => { e.preventDefault(); updateDescription() }} className="postComment btn-primary" >Post</button>
                            </div>) : (channelData.description ? channelData.description : "Loading...")
                        }

                    </div>
                    <hr />


                    <div className="part3">
                        <h6 className="det">Details</h6>

                        <h6 className="part31">For Business Enquires:</h6>
                        <button onClick={()=>{SetClickedOnEmail(!clickedOnEmail)}} className=" btn btn-secondary part32">VIEW EMAIL ADDRESS</button>
                        {clickedOnEmail?(<strong style={{paddingLeft:'2rem'}}>{channelData.userEmail}</strong>):<></>}

                    </div>
                    <hr />
                    <div className="d1">
                        <strong className="part33">Location : </strong>
                        <small className="part34">India</small>
                    </div>
                    <hr />



                  
                </div>


                <div className="part2">
                    <h6 className="st">Stats</h6>
                    <hr />
                    <small>Joined At <strong>{channelData.timestamp}</strong></small>
                    <hr />
                    <small>43434 views</small>
                    <hr />
                    <small><i class="far fa-flag" onClick={()=>{alert('reported')}} /></small>
                </div>
            </div>

        </>
    )
}
