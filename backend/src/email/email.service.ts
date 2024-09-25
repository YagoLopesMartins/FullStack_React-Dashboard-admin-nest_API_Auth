import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmailService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async sendPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1); // Expira em 1 hora

    await this.prisma.user.update({
      where: { email },
      data: { resetToken: token, tokenExpiration },
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Recuperação de Senha',
      template: './reset-password',
      context: {
        username: user.name,
        resetLink,
      },
    });

    return {
      message: `E-mail de recuperação enviado com sucesso.`,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: { resetToken: token, tokenExpiration: { gte: new Date() } },
    });

    if (!user) {
      throw new Error('Token inválido ou expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        tokenExpiration: null,
      },
    });

    return { message: 'Senha alterada com sucesso.' };
  }
}
