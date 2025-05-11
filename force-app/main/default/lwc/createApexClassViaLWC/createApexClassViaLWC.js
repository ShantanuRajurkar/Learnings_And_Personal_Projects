import { LightningElement, track } from 'lwc';
import createApexClass from '@salesforce/apex/ApexClassCreatorController.createApexClass';

export default class CreateApexClassViaLWC extends LightningElement {
    @track className = '';
    @track classBody = '';
    @track errorMsg = '';

    // Capture input changes
    handleNameChange(event) {
        this.className = event.target.value;
    }
    handleBodyChange(event) {
        this.classBody = event.target.value;
    }

    // Called when the user clicks "Create"
    createClass() {
        // Clear previous error
        this.errorMsg = '';
        // Call the Apex controller method
        createApexClass({ className: this.className, classBody: this.classBody })
            .then(result => {
                // On success, maybe clear fields or show a message
                // (result returns a success message or similar)
                this.className = '';
                this.classBody = '';
                // Optionally use a toast or display a success message here
                console.log(result);
            })
            .catch(error => {
                // Display the error message returned from Apex
                this.errorMsg = error.body ? error.body.message : 'Unknown error';
                console.error('Error creating class', error);
            });
    }
}