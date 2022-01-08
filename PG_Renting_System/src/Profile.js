import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Bookmark from "./bookmarks";
import { isEmpty } from "lodash";

const Profile = () => {
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

  // filterData

  return (
    <div className="mainProf">
      <header className="navbar0">
        <h1>
          <Link to="/">
            <i>PG Finder</i>
          </Link>
        </h1>
        <Link to="./about">
          <h1>About Us</h1>{" "}
        </Link>
        <Link to="./services">
          <h1>Services</h1>
        </Link>
        <h1>Contact Us</h1>
        <button
          onClick={() => {
            // history.push("/profile");
            localStorage.setItem("MyUser", JSON.stringify({})); //put the object back

            // history.push("/profile");
            history.push("/login");
            // updateUser({});
            // history.push("/login");
          }}
        >
          <h1>Logout</h1>
        </button>
      </header>

      <div className="profHead">
        <div className="profileName"> Name : {user.name}</div>
        <div className="emailName">Email : {user.email}</div>
      </div>


{isEmpty(datum) && <div className="noBookmark">No Bookmarks. When you will bookmark a PG, you will see them here ...</div>  }
{!isEmpty(datum) && <Bookmark/>}

      {/* <div className="allPgs">
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
      </div> */}
    </div>
  );
};

export default Profile;
