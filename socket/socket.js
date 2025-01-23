const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const app = express()
const httpServer = http.createServer()
const io = new Server(httpServer, { cros: { origin: "*" } })

module.exports = { io, app, httpServer }