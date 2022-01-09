import React,{useState,useEffect} from "react";
import Image from "next/image";
import { format } from "timeago.js";
import Upvote from '../../assets/upvote.png'
import Downvote from '../../assets/downvote.png'

function Confession({ confession}) {
    const [upvoteCount, setUpvoteCount] = useState(confession.upvotes.length);
    const [isUpvoted, setIsUpvoted] = useState(false);

    const [downvoteCount, setDownvoteCount] = useState(confession.downvotes.length);
    const [isDownvoted, setIsDownvoted] = useState(false);
    // const [user, setUser] = useState(confession.uid);
    useEffect(() => {
        const update = async () => {
            await fetch('/api/confessions', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: confession._id.toString(),
                    uid: confession.uid,
                    type: 'upvotes',
                    })
            })
        }
        if(isUpvoted){
            setUpvoteCount(upvoteCount+1);
            update();
        }
        else{
            setUpvoteCount(upvoteCount-1);
        }
    }, [isUpvoted]);
    useEffect(() => {
        const update = async () => {
            await fetch('/api/confessions', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: confession._id.toString(),
                    uid: confession.uid,
                    type: 'downvotes',
                })
            })
        }
        if(isDownvoted){
            setDownvoteCount(downvoteCount+1);
            update();
        }
        else{
            setDownvoteCount(downvoteCount-1)
        }
    }, [isDownvoted]);
    function upvoteHandler() {
        setIsUpvoted(true)
        setIsDownvoted(false)
    }
    function downvoteHandler() {
        setIsDownvoted(true)
        setIsUpvoted(false)
    }

    return (
        <div className="post" >
            <div className="postWrapper" >
                <div className="postTop">
                    <div className="postTopLeft">
                        <span className="postDate">{format(confession.createdAt)}</span>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{confession.content}</span>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <Image
                            className="likeIcon"
                            src={Upvote}
                            onClick={upvoteHandler}
                            alt=""
                        />
                        <span className="postLikeCounter">{upvoteCount}</span>
                        <Image
                            className="likeIcon"
                            src={Downvote}
                            onClick={downvoteHandler}
                            alt=""
                        />
                        <span className="postLikeCounter">{downvoteCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confession;
