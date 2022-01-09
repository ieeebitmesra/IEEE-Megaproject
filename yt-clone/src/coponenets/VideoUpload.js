import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db, storage } from '../Firebase';
import imageassurance from '../images/videoUploadimg.svg'
import './ComponentCss/videoUpload.css';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from '@firebase/storage';
import { setDoc, addDoc, collection, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { serverTimestamp } from '@firebase/firestore';
export const VideoUpload = () => {

    const { channelId }: { channelId: string } = useParams();
    // console.log(channelId);
    const dateRef = new Date()
    const date = {
        minutes: dateRef.getMinutes()>9?dateRef.getMinutes():'0'+dateRef.getMinutes(),
        hours: dateRef.getHours()>9?dateRef.getHours():'0'+dateRef.getHours(),
        date: dateRef.getDate(),
        months: dateRef.getMonth()+1,
        year: dateRef.getFullYear()
    }
    const createdAtString = 'Created At ' + date.date + '/' + date.months + '/' + date.year + "  " + date.hours + ":" + date.minutes;
    //upload Related 


    const [title, SetTitle] = useState('');
    const [progress, SetProgress] = useState(0);
    const [description, SetDescription] = useState('');
    const [thumbnail, SetThumbnail] = useState(null);
    const [video, SetVideo] = useState(null)
    const [thumbnailUrl, SetThumbnailUrl] = useState('');
    const [videoUrl, SetVideoUrl] = useState('');


    useEffect(() => {
        if (videoUrl !== '' && thumbnailUrl !== '') {
            // console.log('uploading on db')
            uploadtodb().then(() => SetProgress(101));
        }
    }, [videoUrl, thumbnailUrl])


    const handleUpload = async () => {




        const thumbnailRef = ref(storage, `thumbnails/${thumbnail.name}`);
        const videoRef = ref(storage, `videos/${video.name}`);

        {/**THumbnail Upload */ }


        const uploadtaskThumbnail = uploadBytesResumable(thumbnailRef, thumbnail);
        uploadtaskThumbnail.on('state-changed', (snapshot) => {
            let progressthumbnail = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // console.log('thumbnail ', progressthumbnail)
        }, (error) => {
            alert(error.message)
        }, () => {
            getDownloadURL(uploadtaskThumbnail.snapshot.ref).then((url) => {
                SetThumbnailUrl(url);
                // console.log('Thumbnail url :', url);
            })
        })


        {/**upload Task  */ }


        const uploadtaskVideo = uploadBytesResumable(videoRef, video)
        uploadtaskVideo.on('state-changed', (snapshot) => {
            let progressvideo = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            SetProgress(progressvideo);
            console.log('video ', progressvideo)

        }, (error) => {
            alert(error.message)
        }, () => {
            getDownloadURL(uploadtaskVideo.snapshot.ref).then((url) => {

                SetVideoUrl(url);
                console.log('Video url :', url);

            })
        })

    }

    {/**Upload to db */ }



    const uploadtodb = async () => {
        const N = 13;
        let s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let ID = Array(N).join().split(',').map(function () { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
        console.log('after upload');
        console.log(thumbnailUrl);
        console.log(videoUrl);
        await setDoc(doc(db, 'videos', ID), {
            title: title,
            description: description,
            channelId: channelId,
            vidUrl: videoUrl,
            thumbnailUrl: thumbnailUrl,
            likes: 0,
            dislikes: 0,
            comments: 0,
            views: 0,
            timestamp: serverTimestamp(),
            createdAt: createdAtString


        })

        await setDoc(doc(db, `channels/${channelId}/videos`, ID), {
            title: title,
            videoID: ID,
            channelId: channelId,
            thumbnailUrl: thumbnailUrl,
            description: description,
            views: 0,
            vidUrl: videoUrl,
            timestamp: serverTimestamp(),
            createdAt: createdAtString


        })
    }

    const UploadingUi = () => {

        if (progress === 0) {
            return (
                <></>
            )
        }
        else if (progress < 100 && progress > 0) {
            return (<>
                <div className="progress" >
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${progress}%` }}></div>
                </div>
            </>)
        }
        else if (progress === 101) {
            return (<>


                <i style={{ color: 'green' }} className="fas fa-check"></i>  Your file Has been succesfully Uploaded
                <Link to='/'>
                    <button style={{ marginLeft: '2rem', boxShadow: 'none', borderRadius: '10px' }} className="btn-primary">Continue To Yt</button>
                </Link>


            </>)

        }
        else if (progress < 101 && progress > 99) {
            return (<>
                <div className="d-flex align-items-center">
                    <strong>Processing...</strong>
                    <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                </div>
            </>)
        }



    }








    return (
        <>
            <div className="uploaded">
                <UploadingUi />
            </div>
            <div className="mainContainerVideoUpload">
                <div className="headingVideoUpload">
                    <h5><strong>Upload Video</strong></h5>
                    <hr />
                </div>
                <div className="formandDetails">

                    <div className="VideoUploadDetailsEntry">
                        <form className='videoUploadForm' action="">
                            <input className='title-video-upload' maxLength='34' type="text" placeholder="Video Title" onChange={(e) => { SetTitle(e.target.value) }} />
                            <textarea className='description-video-upload' placeholder='Description' maxLength='556' onChange={(e) => { SetDescription(e.target.value) }} name="" id="" cols="40" rows="5"></textarea>

                            <input className='custom-thumbnail-input' type="file" name="" accept='image/*' onChange={(e) => { SetThumbnail(e.target.files[0]) }} />
                            <input className='custom-videoUpload-input' type="file" name="" accept='video/*' onChange={(e) => { SetVideo(e.target.files[0]) }} />
                            <button className="btn-primary videoUploadButton" onClick={(e) => {
                                e.preventDefault();
                                handleUpload()
                            }}
                            >Upload</button>
                        </form>

                    </div>
                    <div className="imgassurance">
                        <img src={imageassurance} alt="" />
                        <strong className='createWithYoutube'>Create With Youtube</strong>
                    </div>

                </div>

            </div>

        </>
    )
}
