import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: 'O nome deve conter apenas letras' })
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty()
  @Matches(/^\d+$/, { message: 'A matrícula deve conter apenas números' })
  registration: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: 'A senha deve ter no mínimo 6 e no máximo 20 caracteres',
  })
  @Matches(/^[A-Za-z0-9]+$/, { message: 'A senha deve ser alfanumérica' })
  password: string;
}
