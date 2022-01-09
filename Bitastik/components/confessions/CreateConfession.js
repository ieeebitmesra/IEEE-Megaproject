function CreateConfession({ data }) {
    function handleClick(e) {
        console.log(e.target.value);
    }
    return (<div>
        <input
            style={{ color: "white", backgroundColor: "black" }}
             placeholder={`What's in your mind ${data.displayName} ?`}
            className="shareInput"
            name="confession"
            onChange={handleClick}
        />
        <button onClick={handleClick}>Confess</button>
    </div>)
}
export default CreateConfession;