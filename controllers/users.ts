import express, { Request, Response, NextFunction } from "express";
import knex from '../config/knex';


module.exports = {
  setUser: async (req: Request, res: Response) => {
    const { first_name } = req.body;
    const data = await knex("users").insert({ first_name: first_name });
    console.log({ data });
    res.status(201).json(req.body);
  },
};
