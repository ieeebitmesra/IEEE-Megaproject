import NewsDetail from '../../../components/news/NewsDetail'
import dbConnect from "../../../lib/dbconnect";
import news from "../../../models/news";
import { ObjectId } from "mongodb";
function NewsDetails({newsData}) {
    return (
        <NewsDetail data={newsData} />
    )
}
export async function getStaticPaths() {
    await dbConnect();
    const data = await news.find({}, { _id: 1 });
    return {
        fallback: 'blocking',
        paths: data.map((singleNews) => ({

            params: {
                newsId: singleNews._id.toString(),
            }

        }))
    }
}
export async function getStaticProps(context) {
    //fetch data of a single meetup
    const newsId = context.params.newsId
    await dbConnect();
    const selectedNews = await news.findOne({
        _id: ObjectId(newsId)
    });
    return {
        props: {
            newsData: {
                id: selectedNews._id.toString(),
                title: selectedNews.title,
                date: selectedNews.date,
                image: selectedNews.image,
                description: selectedNews.description
            }
        }
    }
}


export default NewsDetails;