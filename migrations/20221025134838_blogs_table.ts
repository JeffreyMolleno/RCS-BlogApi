import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('blogs', function (table) {
        table.increments('blog_id').unsigned()
        table
            .integer('user_id')
            .unsigned()
            .references('user_id')
            .inTable('users')
        table.string('blog_cover_img')
        table.string('blog_header')
        table.string('blog_body')
        table.string('blog_tags')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('blogs')
}
