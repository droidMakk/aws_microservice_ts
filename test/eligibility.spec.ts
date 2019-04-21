import { IAccountInformation, EprocessStatus, EterminationType, EreposessionStatus, EBankruptcyStatus, ECountryType, EStateType, EAccountType, ETerminationStatus, EAccountStatus } from "../src/models";
import accountInformationProcess from "../src/handlers/checkEligibility";

jest.mock("../src/handlers/checkEligibility");

describe('Testing Eligiblity Methods',() => {

    let dummyAccountData:IAccountInformation = {
        isOpen: true,
        processStatus: EprocessStatus.pending,
        terminationType: EterminationType.terminationByPayoff,
        reposessionStatus: EreposessionStatus.reposessed,
        daysDelinquent: 20,
        bankruptcyStatus: EBankruptcyStatus.none,
        leaseExtended: false,
        isGrounded: true,
        countryType: ECountryType.USA,
        state: EStateType.CO,
        maturityDate: new Date(),
        accountType: EAccountType.lease,
        terminationStatus: ETerminationStatus.E,
        editable: true,
        disabled: false,
        payOffAmount: 12000,
        dueAumount: 100000,
        accountStatus: EAccountStatus.active,
        lastEdited: new Date('')
    }

    beforeEach(() => {
        (accountInformationProcess as jest.Mock<accountInformationProcess>).mockClear();
    })

    it('Constructor to be called atleast once',() => {

        const accountData = new accountInformationProcess(dummyAccountData);
        expect(accountInformationProcess).toBeCalledTimes(1);

    })

    it('Get Account details returns account details',() => {
        
        jest.spyOn(accountInformationProcess.prototype,'getAccountDetails').mockReturnValue(dummyAccountData);


    })

    it('Get should return value',() => {
        jest.spyOn(accountInformationProcess.prototype,"checkEligibleForPayoffQuote").mockReturnValue;
    })

    it('Mail eligbility to be false',() => {
        jest.spyOn(accountInformationProcess.prototype,'checkpayOffByMailEligibility').mockReturnValue(false);
        
    })

})