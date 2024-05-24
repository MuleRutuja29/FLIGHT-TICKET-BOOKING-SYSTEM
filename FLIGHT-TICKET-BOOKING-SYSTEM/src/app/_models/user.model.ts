export class User {

    private _firstName?: string;
    private _lastName?: string;
    private _email?: string;
    private _password?: string;
    private _confirmpassword?: string;
   
  
    get firstName(): string | undefined {
      return this._firstName;
    }
    set firstName(value: string | undefined) {
      this._firstName = value;
    }
  
    get lastName(): string | undefined {
      return this._lastName;
    }
    set lastName(value: string | undefined) {
      this._lastName = value;
    }
  
    get email(): string | undefined {
      return this._email;
    }
    set email(value: string | undefined) {
      this._email = value;
    }
  
    get password(): string | undefined {
      return this._password;
    }
    set password(value: string | undefined) {
      this._password = value;
    }
  
    get confirmpassword(): string | undefined {
      return this._confirmpassword;
    }
    set confirmpassword(value: string | undefined) {
      this._confirmpassword = value;
    }
  
    
  
    constructor();//constructor overloading
    constructor(
      firstName?: string,
      lastName?: string,
      email?: string,
      password?: string,
      confirmpassword?: string,
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.confirmpassword =confirmpassword;
    }
}    
