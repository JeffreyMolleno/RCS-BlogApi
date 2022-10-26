import { NextFunction, Request, Response } from 'express'
import knex from '../config/knex'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

interface Users {
    first_name: string
    middle_name: string
    last_name: string
    email: string
    password: string
}

module.exports = {
    postUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                first_name,
                middle_name,
                last_name,
                email,
                password,
            }: Users = req.body

            if (
                !Boolean(
                    first_name && middle_name && last_name && email && password
                )
            ) {
                throw 'Data is missing. Process terminated'
            }
            // check if email already exist
            const check_email = await knex('users')
                .select('*')
                .where('email', email)

            if (check_email.length) {
                throw 'Email already used. You can login instead'
            }

            // encrypting the password
            const encryptedPass = await bcrypt.hash(password, 10)

            const data = await knex('users').insert({
                first_name,
                middle_name,
                last_name,
                email,
                password: encryptedPass,
            })

            if (data) {
                res.status(201).json({
                    process: 'Insert to user table',
                    status: 'Successful!',
                })
            }
            next()
        } catch (error) {
            res.status(401).json({
                process: 'Insert to user table',
                status: 'Failed',
                error,
            })
        }
    },
    loginUser: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            const checkData: Users[] = await knex('users')
                .select('*')
                .where('email', email)
                .limit(1)

            if (!checkData.length) {
                throw 'Account verification failed'
            }

            const match = await bcrypt.compare(password, checkData[0].password)

            if (match) {
                const accessToken = jwt.sign(
                    JSON.stringify(checkData),
                    process.env.TOKEN_SECRET
                )
                res.status(201).json({
                    process: 'Checking credentials',
                    status: 'Successful!',
                    accessToken,
                })
            } else {
                throw 'Account verification failed'
            }
        } catch (error) {
            res.status(401).json({
                process: 'Checking credentials',
                status: 'Failed',
                error,
            })
        }
    },
}
