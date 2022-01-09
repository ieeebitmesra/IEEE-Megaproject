import { db } from "./firestore";
import {auth} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import { useState, useEffect } from "react";

async function getUserInfo(id) {
    const docRef = doc(db, "users", id);
    const data = await getDoc(docRef);
    return data;
}

export { getUserInfo };