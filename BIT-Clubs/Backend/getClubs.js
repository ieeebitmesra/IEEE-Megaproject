import { db } from "./firestore";
import {auth} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 
import { useState } from "react";

 // Initial empty array of clubs

function getClubs() {
    const [clubs, setClubs] = useState([]);
    var data = []
    const querySnapshot = getDocs(collection(db, "clubs"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    data.push({...doc.data(),id:doc.id});
    });
    console.log(data);
    setClubs(data);
    return clubs;
}

export { getClubs };