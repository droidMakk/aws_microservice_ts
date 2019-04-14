import { EAccountType } from "../../models";


export const canadianEligbility = (eligibleForPayoffQuote, accountInformation): boolean => {
    if (accountInformation.accountType === EAccountType.lease) {
        eligibleForPayoffQuote = false;
    }

    if (
        accountInformation.accountType === EAccountType.balloon &&
        accountInformation.maturityDate.getDate() + 1 === new Date().getDate()
    ) {
        eligibleForPayoffQuote = false;
    }

    if (accountInformation.accountType === EAccountType.retail && accountInformation.dueAumount <= 5) {
        eligibleForPayoffQuote = false;
    }

    if (!accountInformation.isOpen && !accountInformation.disabled) {
        eligibleForPayoffQuote = false;
    }

    return eligibleForPayoffQuote;
}