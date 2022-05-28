const check = require('check-types')
const validator = require('validator')
// const _ = require('lodash')

const isUndefined = function (obj) {
  return check.undefined(obj)
}

const isObjectEmpty = function (obj) {
  return check.emptyObject(obj)
}

const isUndefinedOrEmpty = function (obj) {
  return check.undefined(obj) || check.emptyObject(obj)
}

const hasNoLength = function (obj) {
  return !check.greaterOrEqual(obj.length, 1)
}

const isUndefinedOrNoLength = function (obj) {
  return isUndefined(obj) || hasNoLength(obj)
}

const isUndefinedOrNullOrEmpty = function (obj) {
  return check.undefined(obj) || check.null(obj) || check.emptyObject(obj)
}

const isUndefinedOrNull = function (obj) {
  return check.undefined(obj) || check.null(obj)
}

const isUndefinedOrNullOrEmptyOrNoLen = function (obj) {
  return (
    check.undefined(obj) || check.null(obj) || check.emptyObject(obj) || check.hasLength(obj, 0)
  )
}

exports.isLessThanLength = function (obj, targetedLength) {
  return !isUndefined(obj) && check.lessOrEqual(obj.length, targetedLength)
}

exports.inRange = function (obj, start, end) {
  return check.inRange(obj, start, end)
}

exports.isBooleanType = function (obj) {
  return !isUndefined(obj) && check.boolean(obj)
}

exports.isIntegerType = function (obj) {
  return check.integer(obj)
}

exports.isNull = function (obj) {
  return check.null(obj)
}

exports.hasNoLength = function (obj) {
  return check.hasLength(obj, 0)
}

exports.isValidEmail = function (obj) {
  return validator.isEmail(obj)
}

exports.isValidAlpha = function (obj) {
  return validator.isAlpha(obj)
}

exports.isValidMobile = function (obj) {
  return validator.isMobilePhone(obj, 'en-IN') || validator.isMobilePhone(obj, 'en-US')
}

exports.isInArray = function (item, arr) {
  if (isUndefinedOrEmpty(item) || isUndefinedOrNullOrEmptyOrNoLen(arr)) {
    return false
  }

  return arr.indexOf(item) > -1
}

exports.isPositiveInteger = function (obj) {
  if (!isUndefinedOrNullOrEmpty(obj) && !isNaN(obj)) {
    const intVal = parseInt(obj)
    return check.integer(intVal) && (check.positive(intVal) || check.zero(intVal))
  }

  return false
}

exports.isPositiveNumber = function (obj) {
  return check.positive(obj)
}

// exports.isNull = isNull;
exports.hasNoLength = hasNoLength
exports.isUndefined = isUndefined
exports.isObjectEmpty = isObjectEmpty
exports.isUndefinedOrEmpty = isUndefinedOrEmpty
exports.isUndefinedOrNoLength = isUndefinedOrNoLength
exports.isUndefinedOrNullOrEmpty = isUndefinedOrNullOrEmpty
exports.isUndefinedOrNullOrEmptyOrNoLen = isUndefinedOrNullOrEmptyOrNoLen
exports.isUndefinedOrNull = isUndefinedOrNull
