export class User {
  private readonly _firstName: string;
  private readonly _lastName: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _isActive: boolean;

  constructor(
      firstName,
      lastName,
      email,
      password,
      isActive = true,
  ) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
    this._isActive = isActive;
  }

  public get firstName(): string
  {
    return this._firstName;
  }

  public get lastName(): string
  {
    return this._lastName;
  }

  public get email(): string
  {
    return this._email;
  }

  public get password(): string
  {
    return this._password;
  }

  public get isActive(): boolean
  {
    return this._isActive;
  }
}

