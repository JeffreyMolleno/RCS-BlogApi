import { NextFunction, Request, Response } from 'express'
import { nextTick } from 'process'
import knex from '../config/knex'

type BlogCoverImg = {
    filename: string
    path: string
    destination: string
}
interface Blogs {
    blog_id?: string
    user_id: string
    blog_header: string
    blog_body: string
    blog_tags: string
}

module.exports = {
    postBlog: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user_id, blog_header, blog_body, blog_tags }: Blogs =
                req.body

            const image = req.file

            if (
                !Boolean(
                    user_id && image && blog_header && blog_body && blog_tags
                )
            ) {
                throw 'Data is missing. Process terminated'
            }

            // add data to table
            const blogData = await knex('blogs').insert({
                user_id,
                blog_cover_img: JSON.stringify({
                    filename: image?.filename,
                    path: image?.path,
                    destination: image?.destination,
                }),
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

            next()
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
    filterBlog: async (req: Request, res: Response) => {
        try {
            const { filter_key } = req.params

            if (!Boolean(filter_key)) {
                throw 'Filter key missing. Process terminated'
            }

            const filterData = await knex('blogs')
                .select('blogs.*', 'first_name', 'last_name', 'middle_name')
                .join('users', 'users.user_id', '=', 'blogs.user_id')
                .whereRaw(`blog_tags LIKE '%${filter_key}%'`)
                .orWhereRaw(`blog_header LIKE '%${filter_key}%'`)
                .orWhereRaw(`users.first_name LIKE '%${filter_key}%'`)

            if (filterData) {
                res.status(201).json({
                    process: 'Data Search',
                    status: 'Successful!',
                    data:
                        filterData.length < 1 ? 'No data matched' : filterData,
                })
            } else {
                throw 'An error occurred. Kindly try again'
            }
        } catch (error) {
            res.status(401).json({
                process: 'Data Search',
                status: 'Failed!',
                error,
            })
        }
    },
    searchBlog: async (req: Request, res: Response) => {
        try {
            const { search_key } = req.params

            if (!Boolean(search_key)) {
                throw 'Search key missing. Process terminated'
            }

            const filterData = await knex('blogs')
                .select('blogs.*', 'first_name', 'last_name', 'middle_name')
                .join('users', 'users.user_id', '=', 'blogs.user_id')
                .orWhereRaw(`blog_header LIKE '%${search_key}%'`)
                .limit(1)

            if (filterData) {
                res.status(201).json({
                    process: 'Data Search',
                    status: 'Successful!',
                    data:
                        filterData.length < 1 ? 'No data matched' : filterData,
                })
            } else {
                throw 'An error occurred. Kindly try again'
            }
        } catch (error) {
            res.status(401).json({
                process: 'Data Search',
                status: 'Failed!',
                error,
            })
        }
    },
    uploadImage: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = JSON.parse(JSON.stringify(req.body))
            res.status(201).json({
                status: 'Successful!',
            })

            next()
        } catch (error) {
            res.status(401).json({
                process: 'Data Search',
                status: 'Failed!',
                error,
            })
        }
    },
}
