import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {

  @Expose({ name: 'first_name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Expose({ name: 'last_name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Expose({ name: 'email' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Expose({ name: 'mobile' })
  @IsNotEmpty()
  mobile: string;
}

export class UserLogInDto {
  @Expose({ name: 'email' })
  email?: string;

  @Expose({ name: 'mobile' })
  mobile?: string;
}

export class UserBlockDto {
  @Expose({ name: 'user_id' })
  userId: string;

  @Expose({ name: 'mark_block' })
  @IsBoolean()
  markBlock: boolean;
}
