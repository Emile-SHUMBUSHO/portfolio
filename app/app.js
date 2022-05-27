import {Message} from "./models/message.js";
import {SmsElement} from "./smsElement.js";

class messages{
    async render(){
        const messageContainer = document.getElementById("comments")
        try{
            const response = await axios.get("https://tech-up-skill-portfolio-default-rtdb.europe-west1.firebasedatabase.app/message.json");
            console.log(response);
            const result = response.data;
            console.log(result);
            for(let sms in result){
                const smsItem = new SmsElement(
                    new Message(
                        result[sms].email,
                        result[sms].names,
                        result[sms].message
                    )
                );
                messageContainer.append(smsItem.render());
            }
        }
        catch(err){
            return (err.message)
        }
    }
}
const app = new messages();
app.render();