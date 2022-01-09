import AddNewsForm from "../../../components/news/AddNewsForm"
import { useRouter } from 'next/router'
function NewNewsPage() {
    const router = useRouter();
    async function addNewsHandler(enteredNewsData) {
        const response = await fetch('/api/addnews', {
            method: 'POST',
            body: JSON.stringify(enteredNewsData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
        router.push('/newsroom');
    }

    return (<AddNewsForm onAddNews={addNewsHandler} />)
}

export default NewNewsPage;