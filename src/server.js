const express = require('express');

const app = express();

app.use((
  err,
  req,
  res,
  next
) =>
  res.status(err.status).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  })
);

module.exports = app;
