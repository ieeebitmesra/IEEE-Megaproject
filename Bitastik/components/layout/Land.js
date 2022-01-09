import Classes from "../ui/PageUI/landStyle.module.css";

function Land({ children }) {
    return (
        <>
            <div className={Classes.main}>
                {children}
            </div>
            {/* <Footer/> */}
        </>

    );
}

export default Land;
