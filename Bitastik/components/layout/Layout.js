import Sidebar from '../sidebar/index.js';
import Classes from "../ui/PageUI/pageStyle.module.css";
import Heading from '../header/index'

function Layout({ children }) {
    return (
        <>
            <Sidebar />
            <div className={Classes.main}>
                {children}
            </div>
           {/* <Footer/> */}
        </>

    );
}

export default Layout;
