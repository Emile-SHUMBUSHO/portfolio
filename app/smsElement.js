export class SmsElement{
    constructor(smsObj){
        this.sms = smsObj;
    }
    render(){
        const smsBody = document.createElement("div");
        smsBody.innerHTML = `
        <h2>${this.sms.names}</h2>
        <h3>${this.sms.email}</h3>
        <p>${this.sms.message}</p>
        `
        return smsBody
    }
}