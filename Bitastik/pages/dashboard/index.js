import MotionHoc from "../../components/animation/Motionhoc";
import { useState, useEffect } from 'react'

const uid = 'usershivam'

const HomeComponent = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`/api/${uid}/user`)
            const json = await data.json()
            setData(json.user)
        }
        fetchData()
    }, [])
    console.log(data)
    return (
        <div>                
            {data && data.uid}
            <br />
            {data && data.username}
            <br />
            {data && data.email}
        </div>
    )
};


export default HomeComponent;
