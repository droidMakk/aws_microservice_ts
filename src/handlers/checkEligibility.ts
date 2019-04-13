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
		Object.keys(accountInformation).map(
			key => (this.accountInformation[key] = accountInformation[key])
		);

		this.checkEligibleForPayoffQuote = this.checkEligibleForPayoffQuote.bind(
			this
		);
		this.getCandianEligibility = this.getCandianEligibility.bind(this);
		this.getUsEligibility = this.getUsEligibility.bind(this);
		this.checkOnlinePayoffEligibility = this.checkOnlinePayoffEligibility.bind(
			this
		);

		let {
			isOpen,
			editable,
			processStatus,
			terminationType,
			disabled,
			reposessionStatus,
			daysDelinquent,
			bankruptcyStatus,
			terminationStatus,
			dueAumount,
			lastEdited,
			accountStatus
		} = this.accountInformation;

		if (isOpen) {
			editable =
				(processStatus === EprocessStatus.completed ||
					processStatus === EprocessStatus.pending) &&
				terminationType === EterminationType.terminationByPayoff;
			disabled =
				isOpen &&
				(reposessionStatus === EreposessionStatus.reposessed ||
					(processStatus === EprocessStatus.completed ||
						processStatus === EprocessStatus.pending) ||
					daysDelinquent > 69 ||
					bankruptcyStatus === EBankruptcyStatus.bankrupt);
			editable =
				terminationStatus === ETerminationStatus.T &&
				dueAumount === 0 &&
				lastEdited.getDate() > new Date().getDate() + 45;
		}
		if (!isOpen) {
			let date = new Date().getDate();
			editable =
				(accountStatus === EAccountStatus.paidoff ||
					accountStatus === EAccountStatus.closed) &&
				lastEdited.getDay() > date + 45;
		}
	}

	checkEligibleForPayoffQuote(): boolean {
		let payOffQuoteEligblityStatus = false;

		if (
			this.accountInformation.isOpen &&
			this.accountInformation.editable
		) {
			if (this.accountInformation.countryType === ECountryType.USA)
				payOffQuoteEligblityStatus = this.getUsEligibility();

			if (this.accountInformation.countryType === ECountryType.Canada)
				payOffQuoteEligblityStatus = this.getCandianEligibility();
		}

		return payOffQuoteEligblityStatus;
	}

	getUsEligibility(): boolean {
		let {
			accountType,
			leaseExtended,
			state,
			maturityDate,
			isGrounded,
			terminationStatus,
			dueAumount,
			disabled,
			isOpen,
			processStatus
		} = this.accountInformation;
		let { eligibleForPayoffQuote } = this.elgibilityStatus;

		if ([EStateType.CO, EStateType.FL, EStateType.SD].includes(state) && accountType === EAccountType.lease) {
			eligibleForPayoffQuote = false;
		}
		if (leaseExtended) {
			eligibleForPayoffQuote = false;
		}
		if (accountType === EAccountType.lease || accountType === EAccountType.cop) {
			if (maturityDate.getDate() + 1 === new Date().getDate()) {
				// FIX: Change to moment
				eligibleForPayoffQuote = false;
			}

			if (isGrounded && terminationStatus === ETerminationStatus.S) {
				eligibleForPayoffQuote = false;
			}

			if (terminationStatus === ETerminationStatus.T) {
				eligibleForPayoffQuote = false;
			}

			if (accountType === EAccountType.retail && dueAumount <= 5) {
				eligibleForPayoffQuote = false;
			}

			if (!isOpen && !disabled) {
				eligibleForPayoffQuote = false;
			}

			if (processStatus === EprocessStatus.pending || processStatus === EprocessStatus.completed) {
				eligibleForPayoffQuote = false;
			}
		}

		return eligibleForPayoffQuote;
	}

	getCandianEligibility(): boolean {
		let {
			accountType,
			maturityDate,
			dueAumount,
			isOpen,
			disabled
		} = this.accountInformation;
		let { eligibleForPayoffQuote } = this.elgibilityStatus;

		if (accountType === EAccountType.lease) {
			eligibleForPayoffQuote = false;
		}

		if (
			accountType === EAccountType.balloon &&
			maturityDate.getDate() + 1 === new Date().getDate()
		) {
			eligibleForPayoffQuote = false;
		}

		if (accountType === EAccountType.retail && dueAumount <= 5) {
			eligibleForPayoffQuote = false;
		}

		if (!isOpen && !disabled) {
			eligibleForPayoffQuote = false;
		}

		return eligibleForPayoffQuote;
	}

	checkOnlinePayoffEligibility(): boolean {
		let {
			accountType,
			countryType,
			payOffAmount
		} = this.accountInformation;
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
		let {
			accountType,
			payOffAmount,
			countryType
		} = this.accountInformation;
		let { eligbilepayOffByMail } = this.elgibilityStatus;

		if (accountType === EAccountType.retail || accountType === EAccountType.balloon) {
			eligbilepayOffByMail = true;
		}

		if (countryType === ECountryType.USA && payOffAmount > 25000) {
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
