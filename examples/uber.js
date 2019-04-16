let user = {
    id: '',
    type: /(rider|driver)/,
    currentLocation: '',
    details: {
        name: { 
            firstname: '', 
            lastname: ''
        },
        phoneNumber: '',
        legalIds: [{ type: '', no: '' }]
    },
    rides: [
        { from: '', to: '', date: '', duration: '', driver: { id: '', rating: '' }, price: '' },
        { from: '', to: '', date: '', duration: '', driver: { id: '', rating: '' }, price: '' },
        { from: '', to: '', date: '', duration: '', driver: { id: '', rating: '' }, price: '' },
        { from: '', to: '', date: '', duration: '', driver: { id: '', rating: '' }, price: '' },
        { from: '', to: '', date: '', duration: '', driver: { id: '', rating: '' }, price: '' },
    ],
    vehicleDetails: {
        registerNo: '',
        model: { make: 'Hyndai', variant: 'zest', category: '' },
        color: '',
        year: '',
        licenseNo: ''
    }
}

user.rides.map()


// // GET suv + nearalocation
// getDrivers = (vehicleType, currentLocation) => { return { [ { driverDetails, geospatial(distance) } ] } };

// // User Table ( Enum: usertype( rider=0, driver=1, manager=2 ) )
// { id<primaryKey>: Number, type: Enumerator(rider, driver, manager), details: JSON.stringify({ name: {}, phoneNumber: '' }) }, legalIds: json}

// // Vehicle Table
// { userid<foreignKey><primaryKey>: Number, registerNo, vehicleID }


// // Ride
// { rideiD<primaryKey>, vehic, from to , driverid<foreignKey:userid>, useridforeignKey:userid<>, vehicleID }
