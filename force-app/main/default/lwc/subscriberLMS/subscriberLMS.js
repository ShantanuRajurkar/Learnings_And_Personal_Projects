import { LightningElement,wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    MessageContext,
    APPLICATION_SCOPE,
  } from "lightning/messageService";
  import LMSChannel from "@salesforce/messageChannel/messageChannelLMS__c";
export default class SubscribeLMS extends LightningElement {
    subscription = null;
    message='';
    @wire(MessageContext) messageContext;
    subscribeToMessageChannel(){
        if(!this.subscription){
            this.subscription=subscribe(this.messageContext, LMSChannel, (message)=>this.handleMessage(message),{scope: APPLICATION_SCOPE});
        }
    }
    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription=null;
    }
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    handleMessage(message){
        this.message=message.messageToSend;    
    }
}