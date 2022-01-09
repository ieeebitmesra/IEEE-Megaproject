import AgoraRTC from 'agora-rtc-sdk';
const APP_ID = "117cbbe21954403da09d4b8f555e6b4b"
const TOKEN = "006117cbbe21954403da09d4b8f555e6b4bIABFWIHVh9jSM6HxvvM8TmUWmXiUNG6/Y83UOov7eYv0LEGu9ScAAAAAEACVNqlcO93KYQEAAQA73cph/RZCGNlBu/U+RaSyhA0d5owGf3fC1cpUlB0Gu9ScAAAAAEACVNqlc69nKYQEAAQDr2cph"
const CHANNEL = "Space_VC"
//006117cbbe21954403da09d4b8f555e6b4bIABFWIHVh9jSM6HxvvM8TmUWmXiUNG6/Y83UOov7eYv0LEGu9ScAAAAAEACVNqlcO93KYQEAAQA73cph

let client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})
client.init(APP_ID);
let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
   
    client.on('user-published', handleUserJoined)
    
    client.on('user-left', handleUserLeft)
    
    await client.join(TOKEN, CHANNEL, "1234");
    
    let localTracks = await AgoraRTC.createStream({streamID:"1234",
        audio:true,
        video:true,
        screen:false
    });
    console.log("Hello",localTracks);
    localTracks.init();

    localTracks.play('local_Video');
    
    
    document.querySelector("#toggleCamera").addEventListener("click", toggleCamera);
   document.querySelector("#toggleMic").addEventListener("click", toggleMic);
   document.querySelector("#hangupBtn").addEventListener("click", leaveAndRemoveLocalStream);
}

let joinStream = async () => {
    await joinAndDisplayLocalStream()
    document.getElementById('join-btn').style.display = 'none'
    document.getElementById('stream-controls').style.display = 'flex'
}

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user 
    await client.subscribe(user, mediaType)

    if (mediaType === 'video'){
        
       

        user.videoTrack.play('remote_Video');
    }

    if (mediaType === 'audio'){
        user.audioTrack.play()
    }
}

let handleUserLeft = async (user) => {
    // delete remoteUsers[user.uid]
    // document.getElementById(`user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream = async () => {
    for(let i = 0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
    }

    await client.leave()
    document.getElementById('join-btn').style.display = 'block'
    document.getElementById('stream-controls').style.display = 'none'
    document.getElementById('video-streams').innerHTML = ''
}

let toggleMic = async (e) => {
    if (localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.innerText = 'Mic on'
        e.target.style.backgroundColor = 'cadetblue'
    }else{
        await localTracks[0].setMuted(true)
        e.target.innerText = 'Mic off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}

let toggleCamera = async (e) => {
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.innerText = 'Camera on'
        e.target.style.backgroundColor = 'cadetblue'
    }else{
        await localTracks[1].setMuted(true)
        e.target.innerText = 'Camera off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}


// document.getElementById('hangupBtn').addEventListener('click', leaveAndRemoveLocalStream)
// document.getElementById('toggleMic').addEventListener('click', toggleMic)
// document.getElementById('toggleCamera').addEventListener('click', toggleCamera)
export default joinAndDisplayLocalStream;
