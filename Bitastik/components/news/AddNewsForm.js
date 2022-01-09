import { useRef } from 'react';
import Card from '../ui/Card/Card';
import classes from './AddNewsForm.module.css';

function AddNewsForm(props) {
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const dateInputRef = useRef();
    const descriptionInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredDate = dateInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        const NewsData = {
            title: enteredTitle,
            image: enteredImage,
            date: enteredDate,
            description: enteredDescription,
        };

        props.onAddNews(NewsData);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='title'>Event Title</label>
                    <input type='text' required id='title' ref={titleInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='image'>Event Poster URL</label>
                    <input type='url' required id='image' ref={imageInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='date'>Date</label>
                    <input type='text' required id='date' ref={dateInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        required
                        rows='5'
                        ref={descriptionInputRef}
                    ></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Add Event</button>
                </div>
            </form>
        </Card>
    );
}

export default AddNewsForm;
