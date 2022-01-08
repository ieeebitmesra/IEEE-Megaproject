// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
// import {getFirestore,addDoc,setDoc,collection,doc} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
// import {getAuth,createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js'
import { getDownloadURL, ref, uploadBytesResumable, getStorage } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import {getFirestore,addDoc,setDoc,collection,doc} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import {getAuth,createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js'
// import { async } from "@firebase/util";
let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');
let email =document.getElementById('email');
let password =document.getElementById('password');
let contactname =document.getElementById('contactname');
let contactnumber =document.getElementById('contactnumber');
let contactemail =document.getElementById('contactemail');
let subject=document.getElementById('subject');
let message=document.getElementById('message');
let fileupload=document.getElementById('fileupload');
let submitcontactform = document.getElementById("submitcontactform");
let fileuploadedurl =''; 
// let fileref =  document.getElementById('fi')
// let remember=document.getElementById('remember');

// let remember=document.getElementById('remember');
// let semester=document.getElementById('semester');
let emailVal='';
let passwordVal='';
let contactnameVal ='';
let contactnumberVal='';
let contactemailVal='';

let subjectVal='';
let messageVal='';
let fileuploadVal='';

let submitButt=document.getElementById('submitSignUpForm');
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRMbqJOWQjWGtzOzs4XQUSbg3g82Cg-gk",
  authDomain: "bitian-hub-e1f0c.firebaseapp.com",
  projectId: "bitian-hub-e1f0c",
  storageBucket: "bitian-hub-e1f0c.appspot.com",
  messagingSenderId: "869373426524",
  appId: "1:869373426524:web:221dd989241d6e702b1f99",
  measurementId: "G-2J7ES2N1WE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);

window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});

videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#image-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
});

email.addEventListener('change',(e)=>{
  e.preventDefault();
emailVal=e.target.value;
})
password.addEventListener('change',(e)=>{
  e.preventDefault();
  passwordVal=e.target.value;
})
// remember.addEventListener('change',(e)=>{
//   e.preventDefault();
//   rememberVal=e.target.value;
// })
// semester.addEventListener('change',(e)=>{
//   e.preventDefault();
//   semesterVal=e.target.value;
// })
const submit= async(e)=>{
  e.preventDefault();
  console.log(emailVal);
  console.log(passwordVal);
  // console.log(rememberVal);
  // console.log(semesterVal);

  await addDoc(collection(db,'user'),{
    email:emailVal,
    password:passwordVal,
    // remember:rememberVal,
    // branch:branchVal

}).then(alert('document added'));

}
submitButt.addEventListener('click',(e)=>{submit(e)});
 

contactname.addEventListener('change',(e)=>{
  e.preventDefault();
contactnameVal=e.target.value;
})
contactemail.addEventListener('change',(e)=>{
  e.preventDefault();
  contactemailVal=e.target.value;
})
contactnumber.addEventListener('change',(e)=>{
  e.preventDefault();
  contactnumberVal=e.target.value;
})
subject.addEventListener('change',(e)=>{
  e.preventDefault();
  subjectVal=e.target.value;
})
message.addEventListener('change',(e)=>{
  e.preventDefault();
  messageVal=e.target.value;
})
fileupload.addEventListener('change',(e)=>{
  e.preventDefault();
  fileuploadVal=e.target.files[0];
})


const uploadfile = async() =>{
  const fileRef = ref(storage, `notes/${fileuploadVal.name}`);
  let progress = 0;
  const uploadtaskfile = uploadBytesResumable(fileRef, fileuploadVal);
          uploadtaskfile.on('state-changed', (snapshot) => {
               progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              console.log('file ', progress)
          }, (error) => {
              alert(error.message)
          }, () => {
              getDownloadURL(uploadtaskfile.snapshot.ref).then((url) => {
                  // SetThumbnailUrl(url);
                 fileuploadedurl= url;
    
          
              })})
}

const submitcontactformm = async(e)=>{
  e.preventDefault();
  uploadfile();
  await addDoc(collection(db,'contactrequest'),{
    contactname:contactnameVal,
    contactemail:contactemailVal,
    contactnumber:contactnumberVal,
    subject:subjectVal,
    message:messageVal,
    fileupload:fileuploadedurl,
    // password:passwordVal,
    // remember:rememberVal,
    // branch:branchVal

}).then(alert('request added'));
}
submitcontactform.addEventListener('click',(e)=>{
  e.preventDefault();
submitcontactformm(e);
})
// const submit= async(e)=>{
//   e.preventDefault();
//   console.log(NameVal);
//   console.log(emailVal);
//   console.log(numberVal);
  
//   console.log(subjectVal);
//   console.log(messageVal);
//   // console.log(rememberVal);
//   // console.log(semesterVal);

//   await addDoc(collection(db,'user'),{
//     Name:NameVal,
//     email:emailVal,
    
//     number:numberVal,
//     subject:subjectVal,
//     message:messageVal,

//     // remember:rememberVal,
//     // branch:branchVal

// }).then(alert('document added'));

// }
// submitButt.addEventListener('click',(e)=>{submit(e)});
