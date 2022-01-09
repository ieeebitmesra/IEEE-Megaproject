import NewsItem from './NewsItem';
import classes from './NewsList.module.css';
import Heading from './Header'

function NewsList(props) {
    return (
        <>
        <div className={classes.kya}>
        <Heading /></div>
        <ul className={classes.list}>
            {props.data.map((details) => (
                <NewsItem
                    key={details.id}
                    id={details.id}
                    image={details.image}
                    title={details.title}
                    date={details.date}
                />
            ))}
        </ul>
        </>
    );
}

export default NewsList;
