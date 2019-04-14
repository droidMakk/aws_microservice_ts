import Soap from 'soap';
import Fs from 'fs';
import AWS from 'aws-sdk';
import X509HttpClient from 'soap-x509-http';
import request from 'request';

/// <reference types="aws-sdk" />

export const handler = async (event, context, callback) => {
    
    var s3 = new AWS.S3();
    var wsdl = './wsdl/AccountService.wsdl';
    var requestBody = { "accountNumber": event.requestBody.accountNumber };
    var response = {};
    
    let caCertObjectPromise = s3.getObject({ Bucket: '', Key: '' }).promise();
    let privateKeyObjectPromise = s3.getObject({ Bucket: '', Key: '' }).promise();

    var certs = await Promise.all([ caCertObjectPromise, privateKeyObjectPromise ]);

    var x509Client = new X509HttpClient({
        ca: certs[0].Body.toString('ascii'),
        rejectUnauthorized: false
    },
    { key: certs[1].Body.toString('ascii') },
    ['To'])

    

    callback(null, response);

}