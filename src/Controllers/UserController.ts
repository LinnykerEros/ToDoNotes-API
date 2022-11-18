import { prismaClient } from "../api/database/prismaClient";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { UserInterface } from "../interfaces/UserInterface";

export class UsersController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password }: UserInterface = req.body;

      if (!name || !email || !password) {
        return res.status(401).json({
          message: ["Por favor, verifique os dados e tente novamente!"],
        });
      }

      let user = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        return res.json({ message: "Usuário já cadastrado" });
      }

      user = await prismaClient.user.create({
        select: {
          id: true,
          name: true,
          email: true,
          password_hash: true,
          created_at: true,
          update_at: true,
        },
        data: {
          name,
          email,
          password_hash: await bcryptjs.hash(password, 8),
        },
      });

      return res
        .status(201)
        .json({ message: `Usuário cadastrado com sucesso!`, user });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async findUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prismaClient.user.findUnique({
        where: {
          id: id,
        },

        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          update_at: true,
          notes: {
            select: {
              id: true,
              content: true,
              author: true,
              authorId: true,

              description: true,
              title: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async findAllUsers(req: Request, res: Response) {
    try {
      const users = await prismaClient.user.findMany({
        select: {
          id: true,
          name: true,

          email: true,

          created_at: true,
          update_at: true,

          notes: {
            select: {
              id: true,
              content: true,
              author: true,
              authorId: true,

              description: true,
              title: true,
            },
          },
        },
      });
      return res.status(200).json(users);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, password }: UserInterface = req.body;

      if (!email) {
        return res.status(401).json({
          message: "Por favor, verifique os dados e tente novamente",
        });
      }

      let user = prismaClient.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      const NewUser = await prismaClient.user.update({
        where: { id },

        data: {
          email,
          password_hash: password
            ? await bcryptjs.hash(password, 8)
            : (
                await user
              )?.password_hash,
        },
      });
      return res
        .status(200)
        .json({ message: `Usuário atualizado com sucesso!`, NewUser });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prismaClient.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      await prismaClient.user.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
}
