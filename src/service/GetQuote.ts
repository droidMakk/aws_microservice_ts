import Soap from 'soap';

const url: string = '';
let args = { accountNumber: 12030100202 };

Soap.createClient(url, (err, client: Soap.Client) => {

    if(err){ throw err; }
    else {
        console.info('Data',client);
        client.sayHello = (): Soap.ISoapMethod => (args, (err, result) => {
            if(err){ throw err; }
            else{
                console.info(result)
            }
        })
    }
})

interface SayHelloResult {
    message: String,
    status: Number
}