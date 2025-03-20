import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import pubSub from 'c/pubSub';
export default class PublisherPUBSUB extends LightningElement {
    msg ="";
    @wire(CurrentPageReference)pageRef;
    HandleChange(event){
        this.msg=event.target.value;
    }
    Publish(){
        console.log('In Publish()');
        pubSub.fireEvent(this.pageRef,'sendmsg',this.msg);
    }
}