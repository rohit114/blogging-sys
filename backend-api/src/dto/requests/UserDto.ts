import { Expose } from 'class-transformer';

export class UserDto {
  @Expose({ name: 'first_name' })
  firstName: string;

  @Expose({ name: 'last_name' })
  lastName: string;

  @Expose({ name: 'email' })
  email: string;

  @Expose({ name: 'mobile' })
  mobile: string;
}

export class UserLogInDto {
  @Expose({ name: 'email' })
  email?: string;

  @Expose({ name: 'mobile' })
  mobile?: string;
}
