import {useState} from "react";
import Image from "next/image";
import whisper from "./love-letterrr.png";
import secret from "./theek.png";

function Cheader({ data }) {
  const [value, setValue] = useState('');
  const handleClick = async() => {
    await fetch('/api/confessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: value, uid: data.uid
          })
      })
  };
  return (
    <nav>
      <div className="icon"><span ><Image src={secret} height={48} width={48}></Image></span>CONFESSIONS</div>
      <div className="search_box">
        <form onSubmit={(e) => e.preventDefault()}>
          <textarea type="search" placeholder={`What's in your mind ${data.displayName} ?`} onChange={(e) => setValue(e.target.value)}/>
          <button type="submit" class="wow" style={{
            backgroundImage: `url(${whisper})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
          onClick={handleClick}
         />

        </form>
      </div>

    </nav>
  );
}

export default Cheader;
