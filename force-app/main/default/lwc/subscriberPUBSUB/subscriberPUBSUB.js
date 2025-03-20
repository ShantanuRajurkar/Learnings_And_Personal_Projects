import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import pubSub from 'c/pubSub';
export default class SubscriberPUBSUB extends LightningElement {
    @wire(CurrentPageReference)pageRef;
    message="";
    connectedCallback(){
        console.log('In connectedCallback()');
        pubSub.registerListener('sendmsg',this.Handle,this);
        console.log('Out connectedCallback()');
    }
    Handle(msg){
        console.log('In Handle');
        this.message=msg;
    }
}