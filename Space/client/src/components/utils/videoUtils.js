import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";

const configuration = {
   iceServers: [{
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
   },],
   iceCandidatePoolSize: 10,
};

let peerConnection = null;
let localStream = null;
let remoteStream = null;
let roomId = window.localStorage.getItem('ID');
let roomRef = null;
let roomSnapshot = null;
let db;
var localVideo;
var remoteVideo;
let a, v;


const init = (localVideos, remoteVideos ) => {
   localVideo = localVideos;
   remoteVideo = remoteVideos;
   makeRoom();
   document.querySelector("#toggleCamera").addEventListener("click", toggleCamera);
   document.querySelector("#toggleMic").addEventListener("click", toggleMic);
   document.querySelector("#hangupBtn").addEventListener("click", hangUp);
}

const makeRoom = async () => {
   await openUserMedia();
   const roomId = window.localStorage.getItem('ID');

   db = firebase.firestore();
   roomRef = db.collection("Rooms").doc(`${roomId}`);
   roomSnapshot = await roomRef.get();
   // console.log("Got room:", roomSnapshot.exists);

   if (roomSnapshot.exists) {
      joinRoomById(roomId);
   } else {
      createRoomById();
   }
   return roomId;
}


const createRoomById = async () => {
   db = firebase.firestore();

   // console.log("Create PeerConnection with configuration: ", configuration);
   peerConnection = new RTCPeerConnection(configuration);

   registerPeerConnectionListeners();

   // Add code for creating a room here
   // Code for creating room above

   localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
   });

   // Code for creating a room below
   const offer = await peerConnection.createOffer();
   await peerConnection.setLocalDescription(offer);

   const roomWithOffer = {
      offer: {
         type: offer.type,
         sdp: offer.sdp,
      },
   };
   const roomId = window.localStorage.getItem('ID');
   // console.log(roomId);
   const roomRef = await db.collection("Rooms").doc(roomId);

   roomRef.set(roomWithOffer);

   // Code for creating a room above

   // Code for collecting ICE candidates below
   const callerCandidatesCollection = roomRef.collection("callerCandidates");
   peerConnection.addEventListener("icecandidate", (event) => {
      if (!event.candidate) {
         // console.log("Got final candidate!");
         return;
      }
      // console.log("Got candidate: ", event.candidate);
      callerCandidatesCollection.add(event.candidate.toJSON());
   });

   // Code for collecting ICE candidates above

   peerConnection.addEventListener("track", (event) => {
      // console.log("Got remote track:", event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
         // console.log("Add a track to the remoteStream:", track);
         remoteStream.addTrack(track);
      });
   });

   // Listening for remote session description below
   roomRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data && data.answer) {
         // console.log("Got remote description: ", data.answer);
         const rtcSessionDescription = new RTCSessionDescription(data.answer);
         await peerConnection.setRemoteDescription(rtcSessionDescription);
      }
   });
   // Listening for remote session description above

   // Listen for remote ICE candidates below
   roomRef.collection("calleeCandidates").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
         if (change.type === "added") {
            let data = change.doc.data();
            // console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
            await peerConnection.addIceCandidate(new RTCIceCandidate(data));
         }
      });
   });
   // Listen for remote ICE candidates above

   return roomId;
}

const joinRoomById = async (roomId) => {
   // console.log(roomSnapshot);
   // console.log("Create PeerConnection with configuration: ", configuration);
   peerConnection = new RTCPeerConnection(configuration);
   registerPeerConnectionListeners();
   localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
   });

   // Code for collecting ICE candidates below
   const calleeCandidatesCollection = roomRef.collection("calleeCandidates");
   peerConnection.addEventListener("icecandidate", (event) => {
      if (!event.candidate) {
         // console.log("Got final candidate!");
         return;
      }
      // console.log("Got candidate: ", event.candidate);
      calleeCandidatesCollection.add(event.candidate.toJSON());
   });
   // Code for collecting ICE candidates above

   peerConnection.addEventListener("track", (event) => {
      // console.log("Got remote track:", event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
         // console.log("Add a track to the remoteStream:", track);
         remoteStream.addTrack(track);
      });
   });

   // Code for creating SDP answer below
   const offer = roomSnapshot.data().offer;
   // console.log("Got offer:", offer);
   await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
   const answer = await peerConnection.createAnswer();
   // console.log("Created answer:", answer);
   await peerConnection.setLocalDescription(answer);
   const roomWithAnswer = {
      answer: {
         type: answer.type,
         sdp: answer.sdp,
      },
   };
   await roomRef.update(roomWithAnswer);
   // Code for creating SDP answer above

   // Listening for remote ICE candidates below
   roomRef.collection("callerCandidates").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
         if (change.type === "added") {
            let data = change.doc.data();
            // console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
            await peerConnection.addIceCandidate(new RTCIceCandidate(data));
         }
      });
   });
   // Listening for remote ICE candidates above
   // }
}

const openUserMedia = async () => {
   v = window.localStorage.getItem("video");
   a = window.localStorage.getItem("audio");
   console.log("v " + v + "a " + a);
   let stream = null;
   if (v || a) {
      stream = await navigator.mediaDevices.getUserMedia({
         video: v,
         audio: a,
      });
   }

   localVideo.srcObject = stream;
   localVideo.play();
   localStream = stream;

   if (v === false) {
      toggleCamera();
   }
   if (a === false) {
      toggleMic();
   }
   remoteStream = new MediaStream();
   remoteVideo.srcObject = remoteStream;
   // console.log(remoteVideo.srcObject);
   remoteVideo.play();

   document.querySelector("#toggleCamera").disabled = false;
   document.querySelector("#toggleMic").disabled = false;
   document.querySelector("#hangupBtn").disabled = false;
}

const toggleCamera =() => {
   localStream.getVideoTracks()[0].enabled = !localStream.getVideoTracks()[0].enabled;
   window.localStorage.setItem('video', v);
   console.log("Video " + window.localStorage.getItem('video'));
}

const toggleMic = (a, setMicr) => {
   window.localStorage.setItem('audio', a);
   // setMicr(a);
   console.log("Audio " + window.localStorage.getItem('audio'));
   localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled;
}

const hangUp = async (e) => {
   const tracks = localVideo.srcObject.getTracks();
   tracks.forEach((track) => {
      track.stop();
   });
   console.log("Delete");
   localStream.getAudioTracks()[0].stop();
   localStream.getVideoTracks()[0].stop();

   if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
   }

   if (peerConnection) {
      peerConnection.close();
   }

   localVideo.srcObject = null;
   remoteVideo.srcObject = null;
   document.querySelector("#hangupBtn").disabled = true;

   window.localStorage.setItem('video', true);
   window.localStorage.setItem('audio', true);

   // Delete room on hangup

   if (roomId) {
      const db = firebase.firestore();
      const roomRef = db.collection("Rooms").doc(roomId);
      const calleeCandidates = await roomRef.collection("calleeCandidates").get();
      calleeCandidates.forEach(async (candidate) => {
         await candidate.ref.delete();
      });
      const callerCandidates = await roomRef.collection("callerCandidates").get();
      callerCandidates.forEach(async (candidate) => {
         await candidate.ref.delete();
      });
      await roomRef.delete();
   }
}

const registerPeerConnectionListeners = () => {
   peerConnection.addEventListener("icegatheringstatechange", () => {
      console.log(`ICE gathering state changed: ${peerConnection.iceGatheringState}`);
   });

   peerConnection.addEventListener("connectionstatechange", () => {
      console.log(`Connection state change: ${peerConnection.connectionState}`);
   });

   peerConnection.addEventListener("signalingstatechange", () => {
      console.log(`Signaling state change: ${peerConnection.signalingState}`);
   });

   peerConnection.addEventListener("iceconnectionstatechange ", () => {
      console.log(`ICE connection state change: ${peerConnection.iceConnectionState}`);
   });
}

export default init;