import { prismaClient } from "../api/database/prismaClient";
import { Request, Response } from "express";
import { NoteInterface } from "../interfaces/NoteInterface";
import { UserInterface } from "../interfaces/UserInterface";

export class NoteController {
  async createNote(req: Request, res: Response) {
    try {
      const { title, description, content, authorId }: NoteInterface = req.body;
      if (!title || !description) {
        return res.status(401).json({
          message: ["Por favor, verifique os dados e tente novamente."],
        });
      }

      if (!authorId) {
        return res.status(400).json({ message: "Id do author é necessário." });
      }

      const note = await prismaClient.note.create({
        select: {
          id: true,
          content: true,

          description: true,
          authorId: true,
          title: true,
          created_at: true,
          update_at: true,
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        data: {
          authorId,
          title,
          description,
          content,
        },
      });

      return res
        .status(201)
        .json({ message: `Nota publicada com sucesso!`, note });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async findNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const note = await prismaClient.note.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          content: true,

          description: true,
          authorId: true,
          title: true,
          created_at: true,
          update_at: true,
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!note) {
        return res.status(404).json({ message: "Nota não encontrada!" });
      }

      return res.status(200).json(note);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async findAllNotes(req: Request, res: Response) {
    try {
      const notes = await prismaClient.note.findMany({
        select: {
          id: true,
          content: true,
          description: true,
          authorId: true,
          title: true,
          created_at: true,
          update_at: true,
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return res.status(200).json(notes);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updateNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, content, authorId }: NoteInterface = req.body;

      if (!title || !description) {
        return res.status(401).json({
          message: ["Por favor, verifique os dados e tente novamente."],
        });
      }

      let note = prismaClient.note.findUnique({
        where: {
          id: id,
        },
      });

      if (!note) {
        return res.status(404).json({ message: "Nota não encontrada!" });
      }

      const NewNote = await prismaClient.note.update({
        where: {
          id: id,
        },
        select: {
          id: true,
          content: true,
          description: true,
          authorId: true,
          title: true,
          created_at: true,
          update_at: true,
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        data: {
          authorId,
          title,
          description,
          content,
        },
      });
      return res
        .status(200)
        .json({ message: `Nota atualizada com sucesso!`, NewNote });
    } catch (err) {
      return res.status(500).json({ message: `Id desta nota está invalido!` });
    }
  }

  async deleteNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const note = await prismaClient.note.findUnique({
        where: {
          id: id,
        },
      });
      if (!note) {
        return res.status(404).json({ message: "Nota não encontrada!" });
      }

      await prismaClient.note.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json({ message: "Nota deletada com sucesso!" });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
}
