


import { find, winesPromotions } from '../lib/index.js';


export const usersRepo = {
    getAll
};

async function _get(table, options) {

    try {
        const result = await find(
            { table: table },
            options
        )

        const { status, error, message, data } = result
        return {
            status: 200,
            error: error,
            message: message.sqlMessage,
            data: data.rows,
        }
    } catch (error) {

        return {
            status: 404,
            error: error.errno,
            message: error.message,
            data: null,
        }

    }
}


async function getAll(query) {

    const { q, ...rest } = query

    return q
        ? await _get(q, rest)
        : ({
            status: 400,
            error: 1164,
            message: 'Collection not provided!',
            data: null,
        })
    //  'http://localhost:3000/api/users?order=id&sort=ASC&limit=1&offset=0&page=1'
}
