import { useContext } from "react";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Intro from "./components/intro/Intro";
import ProductList from "./components/productList/ProductList";
import FooterPage from "./components/Footer/Footer";
import { ThemeContext } from "./context";
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

const App = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div
      style={{
        backgroundColor: darkMode ? "#222" : "white",
        color: darkMode && "white",
      }}
    >
      {/* <Toggle /> */}
      <Zoom >
        <Intro />
      </Zoom>
      <Fade right>
        <About position={1} currImg={1} />
      </Fade>
      <Fade left>
        <About position={0} currImg={2} />
      </Fade>
      <Fade right>
        <About position={1} currImg={3} />
      </Fade>
      <Fade left>
        <About position={0} currImg={4} />
      </Fade>
      <Fade right>
        <About position={1} currImg={5} />
      </Fade>
      <Fade left>
        <ProductList />
      </Fade>
      <Fade right>
        <Contact />
      </Fade>
      <FooterPage />
    </div>
  );
};

export default App;
