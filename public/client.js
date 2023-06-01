var socket = io();
let name;

let textarea = document.querySelector('#textarea');

let messageArea = document.querySelector('.message_area');

do{
  name =prompt("please Enter your name");
}while(!name);


textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(msg){
    let message={
        user :name,
        message:msg.trim()
    }
    // Append to 
    appendMessage(message,'outgoing'); 
    textarea.value='';
    scrllToBottom();

    // Send to server
    socket.emit('message',message);
}


function appendMessage(msg,type){
     let mainDiv = document.createElement('div');
     let className = type;
     mainDiv.classList.add(className,'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>

    `
    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv);
}


// Receive

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrllToBottom();
});


function scrllToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}