const myName = 'Drei';
let age = 31;
let hasHobbies = true;

let user = {
  name: myName,
  age: age,
  hasHobbies: hasHobbies,
};

function summarizeUser(inUser) {
  return `Name is ${inUser.name}, I am ${inUser.age}. Do I have hobbies ${inUser.hasHobbies}`;
}

console.log(summarizeUser(user));
