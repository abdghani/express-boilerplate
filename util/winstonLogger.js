/*
  Seeting up Winston logger
*/
const winston = require('winston')

const {
  format: { combine, colorize, timestamp, align, printf },
  configure
} = winston

const options = {
  file: {
    level: 'info',
    filename: process.env.API_LOG_FILENAME,
    handleExceptions: true,
    json: true
  },
  console: {
    level: 'silly',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

const alignedWithColorsAndTime = combine(
  colorize(),
  timestamp(),
  align(),
  printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
)

configure({
  exitOnError: false,
  // format: combine(colorize(), simple()),
  format: alignedWithColorsAndTime,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ]
})
