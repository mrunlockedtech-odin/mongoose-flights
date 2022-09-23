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
      res.redirect('/todos')
    })
}
function newFlight(req,res){
  res.render('flights/new', {
    title:'New Flight'
  })
}
function create(req,res){
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/todos')
  })
}
function deleteFlight(req,res){
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/todos')
  })
}
function show(req,res){
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', {
      flight:flight,
      title: "Flight No : " +flight.flightNo
    })
  })
}

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
}