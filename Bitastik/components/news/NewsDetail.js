import classes from './NewsDetail.module.css'
import Image from 'next/image';
function NewsDetail({ data }) {
    const { image, title, date, description } = data
    return (
    <section className={classes.detail}>
        <Image
            src={image}
            alt={title}
            height={50}
            width={50}
        />
        <h3>{title}</h3>
        <address>{date}</address>
        <p>{description}</p>
    </section>)
}

export default NewsDetail;