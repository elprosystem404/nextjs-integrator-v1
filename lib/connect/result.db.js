

// ......................................
//// message
// ......................................


const message = {
  success: 'Success Data Base!...',
  connect: 'Connect Error Database.'
}



// ......................................
//// response (error , messgae, data)
// ......................................


export const response = {

  success: (data) => ({
    error: false,
    message: {
      code: '',
      sqlState: '',
      errno: 0,
      sqlMessage: message.success
    },
    data
  }),

  error: (text, values, error) => {
    const { code, sqlState, errno, sqlMessage } = error
    return ({
      error: true,
      message: { code, sqlState, errno, sqlMessage },
      data: {
        sql: text,
        values,
        rows: [],
      }
    })
  },

  errorConnect: (error) => ({
    error: true,
    message: {
      ...error, //  errno, code, syscall, address, port, fatal,
      sqlState: 0,
      sqlMessage: message.connect
    },
    data: {
      rows: [],
      sql: '',
      values: []
    }
  })

}