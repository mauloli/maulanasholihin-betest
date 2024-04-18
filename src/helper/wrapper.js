module.exports = {
  response: (res, stat, message, data, pagination) => {
    const result = {
      ...data,
      message,
      pagination,
    };
    return res.status(stat).json(result);
  },
};
