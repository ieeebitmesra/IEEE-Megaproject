import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Slider from "./slider";

const PgDetail = () => {
  const [user0, setLoginUser] = useState({});
  const updateUser = (user0) => {
    localStorage.setItem("MyUser", JSON.stringify(user0));
    setLoginUser(user0);
  };

  const [bval,setBval] = useState("");

  const { id } = useParams();

  let u=JSON.parse(localStorage.getItem("MyUser"));
  let bm=u.bookmark;

  // if(bm.includes(id)){
  //   document.getElementsByClassName("chat").innerText="Bookmarked";
  //   // document.getElementsByClassName("chat").disabled="true"
  // } else{
  //   document.getElementsByClassName("chat").innerText="Bookmark"
  // }

 

  const history = useHistory();

  const [ind, setInd] = useState(0);
  const [x, setX] = useState(1);
  const [arr, setArr] = useState([]);

  const [pg, setPg] = useState({});
  let imgArr = [];

  const getMyDatum = async () => {
    fetch(`/PgDetail/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setPg(data);

        setArr(data.photos);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMyDatum();
  }, []);

  useEffect(() => {
    if(bm.includes(id)===true) {
      setBval("Bookmarked")
    } else setBval("Bookmark PG")
   
  }, []);

  
  imgArr = arr;
  // imgArr = 
  //  ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLez6nspFSs-T_RWAozBHN7FuW1jifOJOdOg&usqp=CAU",

  //     "https://images.bhaskarassets.com/thumb/1600x900/web2images/521/2019/06/03/0521_hanuman_ji_730.jpg",

  //     "https://www.teahub.io/photos/full/249-2493490_saraswati-mata-images-maa-saraswati-full-hd-image.jpg",

  //     "https://hindi.cdn.zeenews.com/hindi/sites/default/files/2021/09/04/914330-ganeshachaturthi.png",

  //     "https://static.punjabkesari.in/multimedia/2017_8image_14_16_542087021brahma-ll.jpg",

  //     "https://feeds.abplive.com/onecms/images/uploaded-images/2021/05/05/42fb5b25881b212d1ec97b6a54aff516_original.jpg?impolicy=abp_cdn&imwidth=720"

  // ];

  return (
    <div className="pgDetail">
      <header className="navbar0">
        <h1>
          <Link to="/">
            <i>PG Finder</i>
          </Link>
        </h1>
        <Link to="/about">
          <h1>About Us</h1>{" "}
        </Link>
        <Link to="/services">
          <h1>Services</h1>
        </Link>
        <h1>Contact Us</h1>
        <button
          onClick={() => {
            // updateUser({});
            history.push("/profile");
            // history.push("/login");
          }}
        >
          <h1> {JSON.parse(localStorage.getItem("MyUser")).name}</h1>
        </button>
      </header>

      <div className="mainPgDetail">
        <div className="pgCard">
          <div className="pgCardUp">
            <div className="addAndLabel">
              <br />
              <strong>{pg.label}</strong>
              <br />
              {pg.address}
            </div>

            <div className="rentAndSecurity">
              <div className="indiRent">
                Rs. {pg.price}
                <br />
                Rent/Month
              </div>

              <div className="indiSecurity">
                Rs. {pg.security}
                <br />
                Security Deposit
              </div>
            </div>
          </div>

          <div className="pgCardDn">
            {/* <img src={pg.photos[0]}  alt="" /> */}
            <Slider imgArr={imgArr} />

            <div className="pgCardInfo">
              <div className="pci">
                <div className="pcd pcr">For {pg.gender} </div>

                <div className="pcd"> {pg.meal} </div>
              </div>
              <div className="pci">
                <div className="pcd pcr"> Furnishing {pg.furnishing} </div>

                <div className="pcd"> {pg.capacity} </div>
              </div>
              <div className="pci">
                <div className="pcd pcr"> Parking {pg.parking}  </div>

                <div className="pcd"> Gate closed 9 PM </div>
              </div>
              <button className="pci chat" onClick={(e) => {
                   

                   if(bm.includes(id)===true) {
                     return;
                   }


         let user = JSON.parse(localStorage.getItem("MyUser")) ;
         user.bookmark.push(id);
         localStorage.setItem("MyUser", JSON.stringify(user));  //put the object back

         let updUser = JSON.parse(localStorage.getItem("MyUser"));
         console.log(updUser.bookmark);
         let uid=     user._id;

         setBval("Bookmarked");
 

                  fetch((`/bookmark/${uid}`) , {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(


                      updUser


                    )
                  }).then((result) => {
              
            
                    result.json().then((resp) => {
                     console.log(resp);
                    });
                  });

              }} >
            
              {bval}
            

              </button>
            </div>
          </div>

          <div className="commodity" > <strong>Nearby Commodity</strong>  - {pg.landmark}</div>
        </div>
      </div>
    </div>
  );
};

export default PgDetail;

/* 

           {/* <p>Gender : {pg.gender}</p>
           <p>Capacity : {pg.capacity}</p>
           <p>Furnishing : {pg.furnishing}</p>
           <p>Price : {pg.price}</p>
           <p>Landmark : {pg.landmark}</p>


<Slider imgArr={imgArr} /> */
