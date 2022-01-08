import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './ComponentCss/channelBanner.css';
import { db,auth,storage } from '../Firebase';
import{collection,setDoc,addDoc,doc,getDoc,updateDoc} from 'firebase/firestore'
import { ref, uploadBytesResumable,getDownloadURL } from '@firebase/storage';
import { onAuthStateChanged } from '@firebase/auth';

export const ChannelBanner = ({ img }) => {

    const { channelId }: { channelId: string } = useParams();
    const channelRef = doc(db, 'channels', channelId);
    const [okOrNot,SetOKOrNot]=useState('')
    const [bannerPic,SetBannerPic]=useState([])
    const [bannerPicUrl,SetBannerPicUrl]=useState('')
    const [channelData, SetChannelData] = useState({});
    const [userId,SetUserId]=useState('')
    const[progress,SetProgress]=useState(0);
    onAuthStateChanged(auth,(user)=>{
        if(user){
            SetUserId(user.uid)
        }
    })
    useEffect(() => {
        const getchannelData = async () => {
            const tempchanneldata = await getDoc(channelRef);


            SetChannelData(tempchanneldata.data());

        }
        if(bannerPicUrl!=''){
            uploadBannertoDb()
        }

        getchannelData();
    }, [channelId,bannerPicUrl])

    //     console.log(channelData.channelName)

    const uploadBannertoDb = async() => {
        updateDoc(doc(db,`channels/${channelId}`),{bannerPic:bannerPicUrl})
        SetProgress(101)
    }
    const uploadBannerPic=async(e)=>{

        
            e.preventDefault();
            const profilePicRef=ref(storage,`bannerPics/${bannerPic.name}`);
            const uploadtaskbannerPic = uploadBytesResumable(profilePicRef,bannerPic);
            uploadtaskbannerPic.on('state_changed',(snapshot)=>{
                SetProgress((snapshot.bytesTransferred/snapshot.totalBytes)*100)
            },
            (error)=>{ alert(error.message)},()=>{
                getDownloadURL(uploadtaskbannerPic.snapshot.ref).then((url) => {
                    SetBannerPicUrl(url);
                    console.log('ProfilePicurl :', url);
            }
            )})
        

    }

    // console.log("from channel Banner "+channelId);
    //const banner_img = {backgroundImage :img}
    return (

        <div style={{ backgroundImage: `url(${channelData.bannerPic})` ,backgroundSize:'cover',backgroundPosition:'center'}} className="bannerimg ">
            {userId==channelId?(<i data-bs-toggle="modal" data-bs-target="#Modal"  className="fas fa-edit editBanner"></i>):<></>}
            <div className="modal fade  " id="Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content"  style={{backgroundColor:'#1e1e1e',color:'white'}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" color='black'>Banner Image Upload</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {
                           ( progress<100 && progress>0)?(<div style={{alignSelf:'centre'}} className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>):(progress===101?(<><strong>  uploaded</strong></>):<></>)
                        }
                        <div className="modal-body" style={{display:'flex',flexDirection:'column'}}>
                           <strong>Choose Banner Image</strong>
                           <input type="file" name="" id="" onChange={(e)=>{SetBannerPic(e.target.files[0])}}/>
                           <button onClick={(e)=>{uploadBannerPic(e)}} className="uploadBannerPic btn btn-primary my-2">Upload</button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss={'modal'} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
