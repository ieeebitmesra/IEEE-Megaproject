import { isElement, isEmpty, isNull } from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const AllPg = () => {
  const [user0, setLoginUser] = useState({});
  const updateUser = (user0) => {
    localStorage.setItem("MyUser", JSON.stringify(user0));
    setLoginUser(user0);
  };
  const [datum, setDatum] = useState([]);

  const history = useHistory();
  const [origArr, setOrigArr] = useState([]);

  const [gender, setGender] = useState(null);
  const [meal, setMeal] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [furnishing, setFurnishing] = useState(null);

  const getMyDatum = async () => {
    fetch("/allPg")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setOrigArr(data);
        setDatum(data);

        //    console.log(origArr);

        console.log("Yoo");
      })
      .catch((err) => console.log(err));
  };

  /*
  meal : ["L","D"],
  gender : "F",
  capacity : "Triple",
  furnishing : "N",
  price : "10000",
  landmark : "Irrrigation Colony",
*/

  const filter = () => {
    console.log("*", gender, "*", furnishing);
    var newArr = [];
    for (let i = 0; i < origArr.length; i++) {
      let bool1 = gender === null ? true : origArr[i].gender === gender;
      let bool2 =
        furnishing === null ? true : origArr[i].furnishing === furnishing;
      let bool3 = capacity === null ? true : origArr[i].capacity === capacity;
      let bool4 = meal === null ? true : origArr[i].meal === meal;
      if (bool1 && bool2 && bool3 && bool4) {
        newArr.push(origArr[i]);
      }
    }

    setDatum(newArr);
  };

  const removeFilter = () => {
    var newArr = [];

    for (let i = 0; i < origArr.length; i++) {
      if (true) newArr.push(origArr[i]);
    }

    var dropDown = document.getElementById("id1");
    dropDown.selectedIndex = 0;

    dropDown = document.getElementById("id2");
    dropDown.selectedIndex = 0;

    dropDown = document.getElementById("id3");
    dropDown.selectedIndex = 0;

    dropDown = document.getElementById("id4");
    dropDown.selectedIndex = 0;

    setFurnishing(null);
    setGender(null);
    setMeal(null);
    setCapacity(null);

    setDatum(newArr);
  };

  useEffect(() => {
    getMyDatum();
  }, []);

  return (
    <div className="pg-list">
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
            history.push("/profile");

            // updateUser({});
            // history.push("/login");
          }}
        >
          <h1> {JSON.parse(localStorage.getItem("MyUser")).name}</h1>
        </button>
      </header>

      <div className="btm">
        <div className="filter">
          <div className="allFilterComponent">
            <div className="filterComponents">
              <h2>PG for:</h2>
              <select
                required
                id="id1"
                className="slc"
                // value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled selected hidden>
                  -Select-
                </option>
                <option>Boys</option>
                <option>Girls</option>
                <option>Both</option>
              </select>
            </div>

            <div className="filterComponents">
              <h2>Meals Included :</h2>
              <select
                required
                id="id2"
                className="slc"
                // value={furnishing}
                onChange={(e) => setMeal(e.target.value)}
              >
                <option value="" disabled selected hidden>
                  -Select-
                </option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Breakfast/Lunch</option>
                <option>Lunch/Dinner</option>
                <option>Breakfast/Dinner</option>
                <option>All</option>
              </select>
            </div>

            <div className="filterComponents">
              <h2>Room Type :</h2>
              <select
                required
                id="id3"
                className="slc"
                // value={furnishing}
                onChange={(e) => setCapacity(e.target.value)}
              >
                <option value="" disabled selected hidden>
                  -Select-
                </option>

                <option>Single</option>
                <option>Double Sharing</option>
                <option>Triple Sharing</option>
              </select>
            </div>

            <div className="filterComponents">
              <h2>Furnishing :</h2>
              <select
                required
                id="id4"
                className="slc"
                // value={furnishing}
                onChange={(e) => setFurnishing(e.target.value)}
              >
                <option value="" disabled selected hidden>
                  -Select-
                </option>
                <option>Available</option>
                <option>Not Available</option>
              </select>
            </div>
          </div>

          <div className="filterButton">
            <button onClick={filter}>Apply Filters</button>
            <button onClick={removeFilter}>Remove Filters </button>
          </div>
        </div>



        <div className="allPgs">

        {isEmpty(datum) &&  <div className="noPgFound">No PG Found ...</div> }


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
      </div>
    </div>
  );
};

export default AllPg;
