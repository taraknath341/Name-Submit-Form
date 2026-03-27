function UserInfo({ firstName, lastName, age, email, village }) {
  if (firstName && lastName && village && email && !isNaN(+age) && (+age > 9 || +age < 60)) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.age = +age;
    this.village = village;
  } else {
    throw new Error("Your Input is not valid");
  }
}

module.exports = UserInfo;