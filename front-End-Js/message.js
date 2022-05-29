const createMessage = function(){
    // Get form
    const form = document.getElementById("one-form")
    form.addEventListener("submit", async(e)=>{
        e.preventDefault();
            //GETTING ALL FORM VALUES FROM IN PUT
            const MessageId = uuidv4();
            const Email = e.target.elements.email.value;
            const Names = e.target.elements.names.value;
            const Message = e.target.elements.message.value;
            const timestamp = Date.parse(new Date());

            const data = {
                MessageId,
                Email,
                Names,
                Message,
                timestamp
            }

            e.target.elements.email.value = '';
            e.target.elements.names.value = '';
            e.target.elements.message.value = '';
            db.collection('message').doc(MessageId).set(data).then(()=>{
                alert("Message sent successfully!!")

            }).catch((error)=>{
                alert(`Opps Error: ${error}`)
            })


    })
}

createMessage();