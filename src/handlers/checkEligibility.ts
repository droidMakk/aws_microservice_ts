class accountInformation {
    isOpen= true;
    editable= this.isOpen;
    disabled= false;
    leaseExtended= false;
    isGrounded= false;
    countryType= 'USA'; // TODO: enum of Country
    state= 'CO';     //TODO: enum for State
    maturityDate= new Date();
    accountType= 'lease';    //TODO: enum for accountTYpe [ lease; cop; balloon; retail ]
    terminationStatus= 'S';   //TODO: enum terminationstatus [ s; T=termination finalized ]
    processStatus='fullychargedoff' //TODO: enum processStatus [ fullychargedoff || partiallychargedoff ]
}

let elgibilityStatus = {
    eligibleForPayoffQuote: true

}

function checkEligibleForPayoffQuote(accountInformation, elgibilityStatus){

    let CopyOfelgibilityStatus = elgibilityStatus;


    if(accountInformation.isOpen && accountInformation.editable){
        
        if(accountInformation.countryType === 'USA') CopyOfelgibilityStatus = getUsEligibility(accountInformation, elgibilityStatus);

        if(accountInformation.countryType === 'CANADA') CopyOfelgibilityStatus = getCandianEligibility(accountInformation, elgibilityStatus);
    }

    if(){
        if(accountInformation.countryType === 'USA')
    }
}

function getUsEligibility(accountInformation, elgibilityStatus){

    let { accountType, leaseExtended, state, maturityDate, isGrounded, terminationStatus, balance } = accountInformation;
    let { eligibleForPayoffQuote } = elgibilityStatus;
    
        if(['CO','FL','SO'].includes(state) && accountType === 'lease'){ 
            eligibleForPayoffQuote = false;
        }
        if(leaseExtended){ eligibleForPayoffQuote = false; }
        if(accountType === 'lease' || accountType === 'COP'){

            if(maturityDate.getDate() + 1 === new Date().getDate()){ // FIX: Change to moment
                eligibleForPayoffQuote = false;
            }

            if(isGrounded && terminationStatus === 'S'){
                eligibleForPayoffQuote = false;
            }

            if(terminationStatus === 'T'){
                eligibleForPayoffQuote = false;
            }
            
            if(accountType === 'retail' && balance <= 5){ eligibleForPayoffQuote = false; }

            if(isOpen)
    }
    
    return { eligibleForPayoffQuote };
}

function getCandianEligibility(accountInformation, elgibilityStatus){

    let { accountType, leaseExtended, state, maturityDate, isGrounded, terminationStatus, balance } = accountInformation;
    let { eligibleForPayoffQuote } = elgibilityStatus;
    
    if(accountType === 'lease'){ eligibleForPayoffQuote = false; }

    if(accountType === 'ballon' && (maturityDate.getDate() + 1 === new Date().getDate())){
        eligibleForPayoffQuote = false;
    }

    if(accountType === 'retail' && balance <= 5){ eligibleForPayoffQuote = false; }

    return { eligibleForPayoffQuote };
}