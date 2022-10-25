import { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken')

module.exports = {
    verify: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.headers.authorization) {
                throw 'Credentials missing. Process terminated'
            }

            // check if authorization is correct
            const decryptedData = jwt.verify(
                req.headers.authorization,
                process.env.TOKEN_SECRET
            )

            if (decryptedData[0].user_id !== parseInt(req.body.user_id)) {
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
}
