import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Bookmark = () => {

    const [datum, setDatum] = useState([]);
    // const [mdatum, setMdatum] = useState([]);
  
    const history = useHistory();
    let user = JSON.parse(localStorage.getItem("MyUser"));
  
    let bookmark = user.bookmark;
    console.log("---", bookmark);
  
    let temp = [];
    const getMyDatum = async () => {
      fetch("/allPg")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log(data);
  
          let temp = [];
          for (let i = 0; i < data.length; i++) {
            if (bookmark.includes(data[i]._id)) {
              temp.push(data[i]);
            }
          }
  
          setDatum(temp);
  
          //    console.log(origArr);
  
          console.log("Yoo");
        })
        .catch((err) => console.log(err));
    };
  
    useEffect(() => {
      getMyDatum();
  
      // for(let i=0;i<datum.length;i++) {
  
      //     if(bookmark.includes(datum[i]._id)) temp.push(datum[i]);
  
      // }
  
      // console.log("temp",temp)
  
      // setDatum(temp);
    }, []);
  
  

    return (  

<div className="allPgs">
        <h1 className="allPgh1">All Bookmarked PGs</h1>
        {datum.map((pg) => (
          <Link to={`/PgDetail/${pg._id}`} target="_blank" className="noPM">
            <div className="pg-preview">
              <div className="previewUp">
                <h3 className="pgLabel">{pg.label}</h3>
                <div className="pgAddress">{pg.address}</div>
              </div>

              <div className="previewDown">
                <div className="pgDnLeft">
                  <img src={pg.photos[0]} width={310} height={180} />
                </div>

                <div className="pgDnRight">
                  <div className="security">
                    <div className="securityData">₹ {pg.security} </div>
                    <div className="securityName">Security Deposite</div>
                  </div>
                  <div className="rent">
                    <div className="rentData">₹ {pg.price}</div>
                    <div className="rentName">Rent/month</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    );
}
 
export default Bookmark;