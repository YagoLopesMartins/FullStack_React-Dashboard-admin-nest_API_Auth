import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: 'O nome deve conter apenas letras' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  email?: string;

  @IsOptional()
  @Matches(/^\d+$/, { message: 'A matrícula deve conter apenas números' })
  registration?: string;

  @IsString()
  @IsOptional()
  @Length(6, 20, {
    message: 'A senha deve ter no mínimo 6 e no máximo 20 caracteres',
  })
  @Matches(/^[A-Za-z0-9]+$/, { message: 'A senha deve ser alfanumérica' })
  password?: string;
}
