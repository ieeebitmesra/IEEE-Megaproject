import { useRouter } from 'next/router'
import Card from '../ui/Card/Card';
import classes from './NewsItem.module.css';

function NewsItem(props) {

    const router = useRouter()

    function showDetailsHandler() {
        router.push('/newsroom/' + props.id);
    }

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.image} alt={props.title} />
                </div>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <date>{props.date}</date>
                </div>
                <div className={classes.actions}>
                    {/* <button onClick={showDetailsHandler}>Show Details</button> */}
                </div>
            </Card>
        </li>
    );
}

export default NewsItem;
