


import { find } from '../lib/index.js';


async function _get(table, options) {

    try {
        const result = await find(
            { table: table },
            options
        )

        const { error, message, data } = result

        return {
            status: 200,
            error: error,
            message: message.sqlMessage,
            data: data.rows,
        }
    } catch (error) {

        return {
            status: 404,
            error: `[${error.errno}]:${error.code}`,
            message: error.message,
            data: null,
        }

    }
}


async function getAll(query) {

    // q = 'table name'
    const { q, ...options } = query

    return q
        ? await _get(q, options)
        : ({
            status: 400,
            error: 1164,
            message: 'Collection not provided!',
            data: null,
        })
}


export const usersRepo = {
    getAll
};

