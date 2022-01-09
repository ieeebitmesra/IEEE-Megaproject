import NewsList from "../../components/news/NewsList"
import dbConnect from "../../lib/dbconnect"
import news from "../../models/news"
function NewsPage(props) {
    return (
        <div style={{
            position: "absolute",
            inset: 0,
        }}>
            <NewsList data={props.news} />
        </div>
    )
}

export async function getStaticProps() {
    await dbConnect()
    const data = await news.find({})
    // const news = JSON.parse(JSON.stringify(data))
    return {
        props: {
            news:data.map((info)=>({
                title:info.title,
                date:info.date,
                image:info.image,
                id:info._id.toString(),
                description:info.description
            }))
        },
        revalidate: 60,
    }
}

export default NewsPage
