import moment from "moment";
import {
	IAccountInformationProcess,
	IAccountInformation,
	iEligibilityStatus,
	EprocessStatus,
	EterminationType,
	EreposessionStatus,
	EBankruptcyStatus,
	ECountryType,
	EStateType,
	EAccountType,
	ETerminationStatus,
	EAccountStatus
} from "../models";
import { canadianEligbility, usEligibility } from "./EligibilityMethods";

export class accountInformationProcess implements IAccountInformationProcess {
	private elgibilityStatus: iEligibilityStatus = {
		eligibleForPayoffQuote: false,
		eligibleonlinePayoff: false,
		eligbilepayOffByMail: false
	};

	private accountInformation: IAccountInformation = {
		isOpen: true,
		processStatus: EprocessStatus.none,
		terminationType: EterminationType.terminationByPayoff,
		reposessionStatus: EreposessionStatus.reposessed,
		daysDelinquent: 69,
		bankruptcyStatus: EBankruptcyStatus.bankrupt,
		leaseExtended: false,
		isGrounded: false,
		countryType: ECountryType.USA,
		state: EStateType.CO,
		maturityDate: new Date(),
		accountType: EAccountType.lease,
		terminationStatus: ETerminationStatus.E,
		editable: false,
		payOffAmount: 0,
		dueAumount: 0,
		disabled: true,
		accountStatus: EAccountStatus.active,
		lastEdited: new Date()
	};

	constructor(accountInformation: IAccountInformation) {
		Object.keys(accountInformation).map(key => (this.accountInformation[key] = accountInformation[key]));

		this.checkEligibleForPayoffQuote = this.checkEligibleForPayoffQuote.bind(this);
		this.CandianEligibility = this.CandianEligibility.bind(this);
		this.UsEligibility = this.UsEligibility.bind(this);
		this.checkOnlinePayoffEligibility = this.checkOnlinePayoffEligibility.bind(this);

		if (this.accountInformation.isOpen) {
			this.accountInformation.editable =
				(this.accountInformation.processStatus === EprocessStatus.completed ||
					this.accountInformation.processStatus === EprocessStatus.pending) &&
				this.accountInformation.terminationType === EterminationType.terminationByPayoff;
			this.accountInformation.disabled =
				this.accountInformation.isOpen &&
				(this.accountInformation.reposessionStatus === EreposessionStatus.reposessed ||
					(this.accountInformation.processStatus === EprocessStatus.completed ||
						this.accountInformation.processStatus === EprocessStatus.pending) ||
					this.accountInformation.daysDelinquent > 69 ||
					this.accountInformation.bankruptcyStatus === EBankruptcyStatus.bankrupt);
			this.accountInformation.editable =
				this.accountInformation.terminationStatus === ETerminationStatus.T &&
				this.accountInformation.dueAumount === 0 &&
				moment(this.accountInformation.lastEdited).add(45, "days") <= moment();
		}
		if (!this.accountInformation.isOpen) {
			let date = new Date().getDate();
			this.accountInformation.editable =
				(this.accountInformation.accountStatus === EAccountStatus.paidoff ||
					this.accountInformation.accountStatus === EAccountStatus.closed) &&
				moment(this.accountInformation.lastEdited).add(45, "days") <= moment();
		}
	}

	checkEligibleForPayoffQuote(): boolean {
		let payOffQuoteEligblityStatus = false;

		if (this.accountInformation.isOpen && this.accountInformation.editable) {
			if (this.accountInformation.countryType === ECountryType.USA)
				payOffQuoteEligblityStatus = this.UsEligibility();

			if (this.accountInformation.countryType === ECountryType.Canada)
				payOffQuoteEligblityStatus = this.CanadianEligibility();
		}

		return payOffQuoteEligblityStatus;
	}

	UsEligibility(): boolean {
		
		let { eligibleForPayoffQuote } = this.elgibilityStatus;

		return usEligibility(eligibleForPayoffQuote, this.accountInformation);
	}

	CandianEligibility(): boolean {
		let { eligibleForPayoffQuote } = this.elgibilityStatus;

		return canadianEligbility(eligibleForPayoffQuote, this.accountInformation);
	}

	checkOnlinePayoffEligibility(): boolean {
		let { accountType, countryType, payOffAmount } = this.accountInformation;
		let { eligibleonlinePayoff } = this.elgibilityStatus;

		if (accountType === EAccountType.lease || countryType === ECountryType.USA) {
			eligibleonlinePayoff = false;
		}
		if (
			accountType === EAccountType.retail ||
			accountType === EAccountType.balloon ||
			accountType === EAccountType.cop
		) {
			if (payOffAmount > 5 && payOffAmount <= 25000) {
				eligibleonlinePayoff = true;
			}
		}

		return eligibleonlinePayoff;
	}

	checkpayOffByMailEligibility(): boolean {
		let { eligbilepayOffByMail } = this.elgibilityStatus;

		if (
			this.accountInformation.accountType === EAccountType.retail ||
			this.accountInformation.accountType === EAccountType.balloon
		) {
			eligbilepayOffByMail = true;
		}

		if (this.accountInformation.countryType === ECountryType.USA && this.accountInformation.payOffAmount > 25000) {
			eligbilepayOffByMail = true;
		}

		return eligbilepayOffByMail;
	}

	public get EligiblityStatus(): any {
		return this.elgibilityStatus;
	}

	public get getAccountDetails(): any {
		return this.accountInformation;
	}

	public set updateAccountInformation({ value, detail }) {
		this.accountInformation[detail] = value;
	}

	public set updateEligiblityStatus({ value, detail }) {
		this.elgibilityStatus[detail] = value;
	}
}
