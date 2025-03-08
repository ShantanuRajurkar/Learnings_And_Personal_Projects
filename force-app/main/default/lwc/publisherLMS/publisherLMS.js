import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from "lightning/messageService";
import LMSChannel from "@salesforce/messageChannel/messageChannelLMS__c";
export default class PublisherLMS extends LightningElement {
    @wire(MessageContext)messageContext;
    message='';
    handleChange(event){
        this.message=event.target.value;
    }

    handlePublish(){
        const payload = {messageToSend: this.message};
        publish(this.messageContext, LMSChannel, payload);
    }
}