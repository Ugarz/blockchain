const isRequired = (data) => {
    if(data) return;
    const error = new Error('Missing parameter')
    error.code = 'BAD_REQUEST'
    throw error;
}

module.exports = { isRequired }