const getMessage = function(){
    db.collection('message').get().then((snapshoot)=>{
        snapshoot.forEach(message => {
            renderMessage(message);
        });
    })
}
getMessage();

const renderMessage = function(message){
    const messageWallper = document.querySelector('.popup-content');
    const div1_message = document.createElement("div");
    div1_message.setAttribute('class', 'row');
    div1_message.setAttribute('id', 'message');
    div1_message.style = `background-color: #3991DB;border-radius: 10px; color: #fff;`;

    const div2_names = document.createElement("div");
    div2_names.setAttribute('class', 'col-md-12');
    div2_names.innerHTML = `<h5>Names: ${message.data().Names}</h5>`

    const div3_email = document.createElement("div");
    div3_email.setAttribute('class', 'col-md-12');
    div3_email.innerHTML = `<h5>Email: ${message.data().Email}</h5>`;

    const div4_message_body = document.createElement("div");
    div4_message_body.setAttribute('class', 'col-md-12');
    div4_message_body.innerHTML = `
    <h5>Message:</h5>
        <p style="color: #fff;">
            ${message.data().Message}
        </p>
        <hr>
        <button class="btn btn-danger" style="float: right;">Delete</button>
    `;
    div1_message.appendChild(div2_names);
    div1_message.appendChild(div3_email);
    div1_message.appendChild(div4_message_body);
    messageWallper.appendChild(div1_message);
}