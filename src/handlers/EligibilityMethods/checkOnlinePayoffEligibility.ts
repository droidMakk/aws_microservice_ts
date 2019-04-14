import {EAccountType, ECountryType} from "../../models";

export const checkOnlinePayoffEligibility = (eligibleonlinePayoff, accountInformation): boolean => {
    
    

    if (accountInformation.accountType === EAccountType.lease || accountInformation.countryType === ECountryType.USA) {
        eligibleonlinePayoff = false;
    }
    if (
        accountInformation.accountType === EAccountType.retail ||
        accountInformation.accountType === EAccountType.balloon ||
        accountInformation.accountType === EAccountType.cop
    ) {
        if (accountInformation.payOffAmount > 5 && accountInformation.payOffAmount <= 25000) {
            eligibleonlinePayoff = true;
        }
    }

    return eligibleonlinePayoff;
}