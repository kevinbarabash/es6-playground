class User {
    constructor(firstName = "John", lastName = "Doe") {
        Object.assign(this, { firstName, lastName });
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    
    set age(value) {
        this._age = value;
    }
    
    get age() {
        return this._age;
    }
    
    toString() {
        return `${this.fullName} is ${this.age} years old`;
    }
}

var user = new User();
console.log("fullName = " + user.fullName);
user.age = 23;
console.log(user);
