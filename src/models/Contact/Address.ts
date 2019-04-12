import { Country } from "./Country";

class Address {

    addressLine1: string;
    country: Country;

    constructor(addressLine1?:string, country?: Country){
        this.addressLine1 = addressLine1;
        this.country = country;

        this.getAddressWithCountry = this.getAddressWithCountry.bind(this);
        this.updateMyAddress = this.updateMyAddress.bind(this);
    }

    updateMyAddress(newaddress: string){
        this.addressLine1 = newaddress;
    }

    getAddressWithCountry(){
        return {
            addressLine1: this.addressLine1,
            country: this.country
        }
    }
}

const userAddress: Address = new Address("157A UC Colony",Country.US);

userAddress.getAddressWithCountry();
userAddress.updateMyAddress('Kodungaiyur')
let { addressLine1, country } = userAddress.getAddressWithCountry()

