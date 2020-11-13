export interface UserBasic {
  _id?: string;
  email: string;
  password: string;
}

/*
export class User implements UserBasic {
  constructor(
    public name: string,
    public brand: string,
    public email: string,
    public price: number,
    public quantity: number,
    public _id?: string
  ) {
    this._id = _id ? _id : null;
    this.name = name;
    this.brand = brand;
    this.email = email;
    this.price = price;
    this.quantity = quantity;
  }
}
*/