import { Flight } from '../models/flight.js'

function index(req, res) {
  Flight.find({})
    .then(flights => {
      res.render('flights/index', {
        flights: flights,
        title: 'All Flights'
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
    })
}
function newFlight(req, res) {
  res.render('flights/new', {
    title: 'New Flight'
  })
}
function create(req, res) {
  Flight.create(req.body)
    .then(flight => {
      res.redirect('/flights')
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
    })
}
function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
    .then(flight => {
      res.redirect('/flights')
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
    })
}
function show(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      console.log(flight)
      res.render('flights/show', {
        flight: flight,
        title: "Flight No : " + flight.flightNo
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
    })
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(flight => {
      res.redirect(`/flights/${flight._id}`)
    })
}
function edit(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      const stringDate = flight.departs.toISOString().slice(0, 16)
      const time = flight.departs.toLocaleTimeString([], { timeStyle: 'short' })
      const hour = time.substring(0, time.indexOf(':'))
      const dayNight = time.slice(-2)
      const updatedHour = dayNight === "AM" ? hour : String(parseInt(hour) + 12)
      const paddedHour = updatedHour.padStart(2, '0')
      const correctedDeparture = stringDate.slice(0, stringDate.indexOf("T") + 1) + paddedHour + stringDate.slice(stringDate.indexOf('T') + 3)
      res.render('flights/edit', {
        flight: flight,
        departure: correctedDeparture,
        title: "Edit " + flight.flightNo,
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
    })
}

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  update,
  edit,
}