import Todolist from "../../components/notes/Todolist";
import books from '../../assets/books.jpg'
import Newspaper from '../../assets/newspaper.jpg'
const Documents = ({todo}) => {
  return (
    <div style={{position:"absolute",top:"0"}}>
      <Todolist />
    </div>
  )
};

export default Documents

// export async function getStaticProps() {
  
//     await dbConnect();
//     const data = await Todo.find({});
//     const todo = JSON.parse(JSON.stringify(data))
    
//     return {
//       props: {
//         todo,
//       },
//       revalidate: 60,
//     };
//   }