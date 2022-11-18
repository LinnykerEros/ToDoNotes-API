import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

declare let process: {
  env: {
    TOKEN_SECRET: string;
  };
};
interface JwtPayload {
  _id: string;
  email: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["Login Required"],
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET) as JwtPayload;

    const { _id, email } = dados;

    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ["Usuário inválido!!"],
      });
    }

    // req.userId = _id;
    // req.userEmail = email;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      errors: ["Token expirado ou inválido!"],
    });
  }
};
