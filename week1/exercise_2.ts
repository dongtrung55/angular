console.clear();
interface Person {
  name: string;
  age: number;
  email: string;
}

function infoUser(person: Person): void {
  console.log(`Name: ${person.name}, Age: ${person.age}, Email: ${person.email}`);
}

let user: Person = { name: "Dong", age: 18, email: "test@gmail.com" };

infoUser(user);