import { prismaClient } from "../api/database/prismaClient";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { UserInterface } from "../interfaces/UserInterface";

declare let process: {
  env: {
    TOKEN_SECRET: string;
    TOKEN_EXPIRATION: string;
  };
};

export class TokenController {
  async handle(req: Request, res: Response) {
    const { email, password }: UserInterface = req.body;
    if (!email || !password) {
      return res.status(401).json({
        errors: ["Credencias inválidas!"],
      });
    }
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.json({
        error: "Usuário não encontrado, verifique seu email e senha!",
      });
    }

    const passwordIsValid = (password: string) => {
      return compare(password, user.password_hash);
    };
    if (!(await passwordIsValid(password))) {
      return res.status(401).json({ error: "Senha inválida!" });
    }

    const { id, name } = user;

    const token = jwt.sign({ id, name, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}
