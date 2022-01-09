import ConfessionItem from "./ConfessionItem";
import CreateConfession from "./CreateConfession";
import Cheader from "./Cheader";

import { auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
function ConfessionList({ confessions }) {
  const [user] = useAuthState(auth)
  return (<div className="feed">
    <div>
      <Cheader data={user} />
    </div>
    <div className="feedWrapper">
      {confessions.map((p,index) => (
        <ConfessionItem index={index} confession={p} key={p.uid} />
      ))}
    </div>
   
  </div>)
}
export default ConfessionList;


// export async function getStaticProps() {
//   await dbConnect()
//   const data = await Confession.find({})
//   // const news = JSON.parse(JSON.stringify(data))
//   return {
//     props: {
//       Confession: data.map((info) => ({
//         content: info.description,
//         uid:info.uid,
//       }))
//     },
//     revalidate: 60,
//   }
// }