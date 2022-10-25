import { Request, Response } from 'express'
import knex from '../config/knex'

interface Blogs {
    blog_id?: string
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
            const { blog_id } = req.params

            if (!Boolean(blog_id)) {
                throw 'Data is missing. Process terminated'
            }

            const blogData = await knex('blogs')
                .select('*')
                .where('blog_id', blog_id)
                .limit(1)

            if (blogData) {
                res.status(201).json({
                    process: 'Retrieving data',
                    status: 'Successful!',
                    data: blogData,
                })
            } else {
                throw 'An error occurred. Kindly try again'
            }
        } catch (error) {
            res.status(401).json({
                process: 'Retrieving data',
                status: 'Failed!',
                error,
            })
        }
    },
    getALlBlogs: async (req: Request, res: Response) => {
        try {
            const blogData = await knex('blogs').select('*')

            // console.log(blogData)

            if (blogData) {
                res.status(201).json({
                    process: 'Retrieving data',
                    status: 'Successful!',
                    data: blogData,
                })
            } else {
                throw 'An error occurred. Kindly try again'
            }
        } catch (error) {
            res.status(401).json({
                process: 'Retrieving data',
                status: 'Failed!',
                error,
            })
        }
    },
    updateBlog: async (req: Request, res: Response) => {
        try {
            if (!Boolean(req.body.blog_id)) {
                throw 'Data is missing. Process terminated'
            }

            const updateData = await knex('blogs')
                .where({ blog_id: req.body.blog_id })
                .update({ ...req.body })

            if (updateData) {
                res.status(201).json({
                    process: 'Retrieving data',
                    status: 'Successful!',
                    data: updateData,
                })
            } else {
                throw 'An error occurred. Kindly try again'
            }
        } catch (error) {
            res.status(401).json({
                process: 'Retrieving data',
                status: 'Failed!',
                error,
            })
        }
    },
    deleteBlog: async (req: Request, res: Response) => {
        const { blog_id, user_id } = req.body

        try {
            if (!Boolean(blog_id && user_id)) {
                throw 'Data is missing. Process terminated'
            }

            const deleteData = await knex('blogs')
                .where({ blog_id: req.body.blog_id })
                .del()

            if (deleteData) {
                res.status(201).json({
                    process: 'Deleting data',
                    status: 'Successful!',
                    data: deleteData,
                })
            } else {
                throw 'An error occurred. Kindly try again'
            }
        } catch (error) {
            res.status(401).json({
                process: 'Deleting data',
                status: 'Failed!',
                error,
            })
        }
    },
}
