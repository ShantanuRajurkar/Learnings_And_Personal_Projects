import { LightningElement, track, api } from 'lwc';
import getAgentforceResponse from '@salesforce/apex/AgentforceChatController.getAgentforceResponse';

export default class AgentforceLWCIntegration extends LightningElement {
    @api recordId;
    @track messages = [];
    @track currentPrompt = '';

    handleInputChange(event) {
        this.currentPrompt = event.target.value;
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.sendMessage();
        }
    }

    handleSend() {
        this.sendMessage();
    }

    sendMessage() {
        const prompt = this.currentPrompt.trim();
        if (!prompt) {
            return;
        }
        // Add user message with CSS class
        this.messages = [
            ...this.messages,
            { id: Date.now() + '_user', role: 'user', content: prompt, cssClass: 'user-bubble' }
        ];
        this.currentPrompt = '';

        // Call Agentforce
        getAgentforceResponse({ userPrompt: prompt, recordId: this.recordId })
            .then(res => {
                this.messages = [
                    ...this.messages,
                    { id: Date.now() + '_agent', role: 'agent', content: res ?? 'No response returned', cssClass: 'agent-bubble' }
                ];
                // Auto-scroll to latest message
                this.scrollToBottom();
            })
            .catch(error => {
                this.messages = [
                    ...this.messages,
                    { id: Date.now() + '_agent', role: 'agent', content: 'Error: ' + (error.body?.message || error.message), cssClass: 'agent-bubble' }
                ];
                this.scrollToBottom();
            });
    }

    scrollToBottom() {
        const container = this.template.querySelector('.chat-container');
        if (container) {
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 100);
        }
    }
}