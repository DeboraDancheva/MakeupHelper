export class User {
    id: number;
    username: string;
    password: string;
    email:string;
    token: string;
    firstname: string;
    lastname:string;
    roles:string='';
  
    constructor( id: number,firstname: string,lastname: string, username: string,email:string, password: string, token: string) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.email = email;   
      this.token = token;
      this.firstname = firstname;
      this.lastname = lastname;
    }
  }
  