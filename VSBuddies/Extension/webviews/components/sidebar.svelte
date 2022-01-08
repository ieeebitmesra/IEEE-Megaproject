<script lang="ts">
    /* TODO 
    * Post route - message
    * Post request - message
    * Hot Reload
    * Bug Testing
    */
import { onMount } from "svelte";
var loading = true
let friendsAr:Array<{name: string, icon: string, uid: string}>
let selectedFriend = "0";
let user:{friends:Array<string>,icon:string,name:string,uid:string};
let accessCode = '';
let messages:Array<{message:string, author:string, to:string }>
let filteredMessages:Array<{message:string, author:string, to:string }>
let messageInput:string = ""

const getMessages = async()=>{
    if(!loading){
        if(user){
            if(selectedFriend!="0"){
                const response = await fetch(`${apiBaseUrl}/mdata/messages/me`,{
                    headers: {
                        authorization: `Bearer ${accessCode}`
                    }
                })
                messages = await response.json();
                console.log(messages)
                filterMessages()
            }
        }
    }
}

const sendMessage = async(msg:string)=>{
    messages = [...messages, {
        message: msg,
        author: user.uid,
        to: selectedFriend
    }]
    const response = await fetch(`${apiBaseUrl}/mdata/post`,{
        method: "POST",
        body: JSON.stringify({
            message: msg,
            to: selectedFriend
        }),
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${accessCode}`,
        }
    }
    )
    filterMessages()
    console.log(filteredMessages)
}

const filterMessages = ()=>{
    if(user && selectedFriend!=="0"&&messages){
        filteredMessages = messages.filter(message=>(message.author == selectedFriend || message.to == selectedFriend))
    }
}

onMount(async()=>{
    window.addEventListener("message", async(event)=>{
        const message = event.data;
        switch (message.type) {
            case 'token':
                accessCode = message.value
                const response = await fetch(`${apiBaseUrl}/udata/me`,{
                    headers: {
                        authorization: `Bearer ${accessCode}`
                    }
                })
                const rjson = await response.json()
                user = rjson;
                console.log(user)
                user.friends.forEach(async(uid)=>{
                    const temp = await fetch(`${apiBaseUrl}/udata/user/${uid}`)
                    const tempRes = await temp.json()
                    if(friendsAr){
                        friendsAr = [...friendsAr, {
                            uid: tempRes.uid,
                            name: tempRes.name,
                            icon: tempRes.icon
                        }]
                    }else{
                        friendsAr = [{
                            uid: tempRes.uid,
                            name: tempRes.name,
                            icon: tempRes.icon
                        }]
                    }
                })
                break;
            case 'extensions':
                const data = message.value
                if(data.token){
                    const response = fetch(`${apiBaseUrl}/ext/me`,{
                        method: "POST",
                        body: JSON.stringify({extensions: data.ext}),
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${accessCode}`,
                        }
                    })
                }
                break;
                
            }
        })
        tsvscode.postMessage({type: 'get-token', value: undefined})
        tsvscode.postMessage({type: 'extensions', value:undefined})
        //get friends
        // console.log(apiBaseUrl)
        
        loading = false
        setInterval(()=>{
            if(user && !loading && selectedFriend!="0"){
                getMessages()
        }
    },2000)
})
</script>
<style>
    input{
        border: 1px dashed gray;
    }
    .contact-card{
        display: flex;
        gap: 10px;
        border: 1px solid gray;
        align-items: center;
        background-color:var(--vscode-editor-background);
        font-size: var(--vscode-font-size);
        color: var(--vscode-foreground);
        font-family: var(--vscode-font-family);
    }
    .contact-card-image{
        height: 50px;
        border-radius: 50%;
    }
    .contact-card-name{
        font-weight: bold;
    }
    .flex{
        display: flex;
        flex-direction: column;
        height: 99vh;
    }
    .flex-end{
        align-self: flex-end;
    }
    .flex-start{
        width: 100%;
        align-self: flex-start;
    }
    .message-container{
        flex:1;
        padding-top: 5px;
        display: flex;
        flex-direction: column ;
        gap:5px;
    }
    .no-message{
        text-align: center;
        font-size: large;
    }
    .message{
        padding: 1vh 3ch;
        width:max-content;
        max-width: 80%;
        border-radius: 15px;
        color: #fff;
    }
    .sent{
        align-self: flex-end;
        background-color: green;
    }
    .rcvd{
        background-color: gray;
    }
    .back-btn{
        display: grid;
        grid-template-columns: 1fr 4fr;
    }
    .friend-chat-name{
        border: 1px gray solid;
        background-color: var(--vscode-editor-background);
    }
    .input{
        width:100%;
    }
</style>

{#if loading}
<div class="loading">Loading..</div>
{:else if user.uid}
{#if (user.friends.length === 0)}
<h1>
    Go to the VS Buddies Website to
    make new friends
</h1>
    <!-- svelte-ignore missing-declaration -->
    <button on:click={()=>{
        tsvscode.postMessage({type: 'gotowebsite',value: undefined})
    }}>Go To the Website</button>
<!-- svelte-ignore missing-declaration -->
<button on:click={()=>{
tsvscode.postMessage({type: 'logout', value: undefined})
tsvscode.postMessage({type: 'get-token', value: undefined})
}}
>Logout</button>
{/if}
    {#if friendsAr && friendsAr.length>0}
    {#if selectedFriend=="0"}
    {#each friendsAr as fr}
        <button class="contact-card" on:click={async()=>{
            selectedFriend = fr.uid
            await getMessages()
            filterMessages()
            console.log(filteredMessages)
        }
        }>
            <img class="contact-card-image" src={fr.icon} alt="friend" />
            <div class="contact-card-name">
                {fr.name}
            </div>
        </button>
        {/each}
        <!-- svelte-ignore missing-declaration -->
        <button on:click={()=>{
            tsvscode.postMessage({type: 'logout', value: undefined})
        tsvscode.postMessage({type: 'get-token', value: undefined})
    }}
        >Logout</button>
    {/if}
    {#if selectedFriend!="0"}
        <div class="flex">
            <header class="flex-start back-btn">
                <button on:click={()=>{
                    selectedFriend = "0"
                    messageInput = ""
                }}>{`<`}</button> 
            <button class="friend-chat-name">{`${friendsAr.find(fr=>fr.uid===selectedFriend)?.name}`} </button>
        </header>
        <div class="message-container">
            {#if filteredMessages}
            {#each filteredMessages as msg}
            <div class="message {msg.author==user.uid?"sent":"rcvd"}">
                {msg.message}
            </div>
            {/each}
            {/if}
            {#if !filteredMessages || filteredMessages.length == 0}
            <div class="no-message">No messages yet... start the convo 🤗</div>
            {/if}
        </div>
        <form class = "flex-end input" on:submit|preventDefault={()=>{
            sendMessage(messageInput)
            messageInput=""
        }}>
        <input type="text" bind:value={messageInput} />
    </form>
</div>
    {/if}
    {/if}
    {:else}
    <!-- svelte-ignore missing-declaration -->
    <button on:click={()=>{
        tsvscode.postMessage({type: 'auth', value: undefined})
        tsvscode.postMessage({type: 'get-token', value: undefined})
    }}>
        Sign in
    </button>
{/if}