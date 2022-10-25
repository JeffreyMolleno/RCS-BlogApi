import { Request, Response } from 'express'
import knex from '../config/knex'

interface Blogs {
    user_id: string
    blog_cover_img: string
    blog_header: string
    blog_body: string
    blog_tags: string
}

module.exports = {
    postBlog: async (req: Request, res: Response) => {
        try {
            const {
                user_id,
                blog_cover_img,
                blog_header,
                blog_body,
                blog_tags,
            }: Blogs = req.body

            if (
                !Boolean(
                    user_id &&
                        blog_cover_img &&
                        blog_header &&
                        blog_body &&
                        blog_tags
                )
            ) {
                throw 'Data is missing. Process terminated'
            }

            // add data to table

            const blogData = await knex('blogs').insert({
                user_id,
                blog_cover_img,
                blog_header,
                blog_body,
                blog_tags,
            })

            if (blogData) {
                res.status(201).json({
                    process: 'Adding data to blog table',
                    status: 'Successful!',
                })
            } else {
                throw 'An error occurred. Kindly try again'
            }
        } catch (error) {
            res.status(401).json({
                process: 'Adding data to blog table',
                status: 'Failed!',
                error,
            })
        }
    },
    getBlog: async (req: Request, res: Response) => {
        try {
            res.status(201).json({
                process: 'Retrieving data',
                status: 'Successful!',
            })
        } catch (error) {
            res.status(401).json({
                process: 'Retrieving data',
                status: 'Failed!',
                error,
            })
        }
    },

    // getAllBlogs: async (req: Request, res: Response) => {}
    // updateBlog: async (req: Request, res: Response) => {}
    // deleteBlog: async (req: Request, res: Response) => {}
}
