import { useEffect, useState } from "react";
import leftArrow from "./images/Vector Left.png";
import rightArrow from "./images/Vector Right.png";

const Slider = ({ imgArr }) => {
  const [ind, setInd] = useState(0);
  const [x, setX] = useState(1);

  return (
    <div className="slider">
      {/* <img src={imgArr[ind]} width={400} height={350} /> */}
     
<div className="imgVal" style={
              {backgroundImage: `url(${imgArr[ind]})`,
     
            }
          }>

<div className="slideBar">
 
         
         <img src={leftArrow} onClick={(e) => {
            if (ind === 0) setInd(imgArr.length - 1);
            else setInd(ind - 1);
          }} />
           
        
      

        <img src={rightArrow}  onClick={() => {
            if (ind === imgArr.length - 1) setInd(0);
            else setInd(ind + 1);
          }}/>
      </div>
     
</div>
<div className="currInfo">
{ind + 1} of {imgArr.length}
</div>
      
    </div>
  );
};

export default Slider;
