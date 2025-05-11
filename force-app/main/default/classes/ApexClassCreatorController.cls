/**
 * @description       : 
 * @author            : Shantanu Rajurkar
 * @group             : 
 * @last modified on  : 05-10-2025
 * @last modified by  : Shantanu Rajurkar
**/
public with sharing class ApexClassCreatorController {
    // This method can be called from an LWC (returns void since it’s fire-and-forget)
    @AuraEnabled
    public static void createApexClass(String className, String classBody) {
        // Invoke async method for callout
        createApexClassAsync(className, classBody);
    }

    // Async callout to avoid Lightning session restrictions
    @future(callout=true)
    public static void createApexClassAsync(String className, String classBody) {
        // Build endpoint: use org domain URL + Tooling API path
        String apiVersion = '60.0'; // or latest version
        String baseUrl = URL.getOrgDomainUrl().toExternalForm(); // e.g. https://YourOrg.my.salesforce.com
        String endpoint = baseUrl + '/services/data/v' + apiVersion + '/tooling/sobjects/ApexClass/';
        
        // Prepare HTTP request
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('POST');
        // Session ID for Bearer auth
        req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
        req.setHeader('Content-Type', 'application/json');
        
        // Request body: Name and Body of the new Apex class
        Map<String, Object> payload = new Map<String, Object>{
            'Name'      => className,
            'Body'      => classBody,
            'ApiVersion'=> Decimal.valueOf(apiVersion)
        };
        req.setBody(JSON.serialize(payload));
        
        // Send callout
        HttpResponse res = new Http().send(req);
        // Optional: handle the response
        System.debug('Tooling API Response: ' + res.getStatusCode() + ' ' + res.getBody());
    }
}