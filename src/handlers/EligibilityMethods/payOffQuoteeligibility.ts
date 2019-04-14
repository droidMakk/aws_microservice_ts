import {ECountryType} from "../../models";
import {usEligibility, canadianEligbility} from '../EligibilityMethods';

export const checkEligibleForPayoffQuote = (eligibleForPayoffQuote, accountinformation): boolean =>{
let {payOffQuoteEligblityStatus} = eligibleForPayoffQuote

	if (this.accountInformation.isOpen && this.accountInformation.editable) {
			if (this.accountInformation.countryType === ECountryType.USA)
				payOffQuoteEligblityStatus = this.UsEligibility();

			if (this.accountInformation.countryType === ECountryType.Canada)
				payOffQuoteEligblityStatus = this.CanadianEligibility();
        }
        return eligibleForPayoffQuote;
}