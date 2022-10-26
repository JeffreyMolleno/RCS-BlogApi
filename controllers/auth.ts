import { createDiffieHellmanGroup } from 'crypto'
import { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken')

module.exports = {
    verify: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = JSON.parse(JSON.stringify(req.body))
            if (!req.headers.authorization) {
                throw 'Credentials missing. Process terminated'
            }

            // check if authorization is correct
            const decryptedData = jwt.verify(
                req.headers.authorization,
                process.env.TOKEN_SECRET
            )

            console.log(decryptedData[0].user_id.toString(), data.user_id)

            if (decryptedData[0].user_id.toString() !== req.body.user_id) {
                throw 'Failed credential verifications. Process terminated'
            }
            next()
        } catch (error) {
            res.status(401).json({
                process: 'Credentials verification',
                status: 'Failed!',
                error,
            })
        }
    },
    verify2: async (
        data: {
            user_id: string | number
        },
        authorization: string
    ) => {
        try {
            if (!data) {
                throw 'Credentials missing. Process terminated'
            }

            console.log(data.user_id, authorization)

            // check if authorization is correct
            const decryptedData = await jwt.verify(
                authorization,
                process.env.TOKEN_SECRET
            )

            console.log(decryptedData, data.user_id)

            if (decryptedData[0].user_id.toString() !== data.user_id) {
                return false
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    },
}
