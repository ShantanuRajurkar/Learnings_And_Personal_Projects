/**
 * @description       : 
 * @author            : Shantanu Rajurkar
 * @group             : 
 * @last modified on  : 04-22-2025
 * @last modified by  : Shantanu Rajurkar
**/
public with sharing class AgentforceChatController {
    @AuraEnabled(cacheable=false)
    public static String getAgentforceResponse(String userPrompt, String recordId) {
        // Wrap custom Agentforce action
        Invocable.Action action = Invocable.Action.createCustomAction('generateAiAgentResponse', 'Copilot_for_Salesforce');  // ensure API names match exactly :contentReference[oaicite:0]{index=0}

        // Set required parameters
        action.setInvocationParameter('userMessage', userPrompt);
        action.setInvocationParameter('recordIds', new List<String>{ recordId });

        // Invoke Agentforce
        List<Invocable.Action.Result> results = action.invoke();
        if (!results.isEmpty() && results[0].isSuccess()) {
            // Retrieve raw JSON string from 'agentResponse'
            String agentResponseJson = (String) results[0].getOutputParameters().get('agentResponse');

            // Parse JSON to a map and extract the 'value' field
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(agentResponseJson);  // JSON.deserializeUntyped returns a Map<String,Object> :contentReference[oaicite:1]{index=1}
            return (String) responseMap.get('value');  // the actual Agentforce reply text
        }
        return 'Error: no response from Agentforce.';
    }
}
