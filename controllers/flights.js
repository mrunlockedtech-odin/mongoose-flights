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
  const newFlight = new Flight()
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0, 16)
  res.render('flights/new', {
    title: 'New Flight',
    departsDate: departsDate
  })
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
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
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
    })
}
function edit(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      const correctedDeparture = flight.departs.toISOString().slice(0, 16)
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

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
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
  createTicket,
}