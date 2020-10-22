const bcrypt = require('bcryptjs')

const {Employee, Project, ProjectEmployee} = require('../models')

const isEmail = require('../helpers/index.js')

class Controller {

  static home(req, res) {

    let username
    let position

    if(req.session.isLoggedIn) {
      username = req.session.username
      position = req.session.position      
    }

    res.render('home', {username, position})
    
  }

  static login(req, res) {
    if (req.query.err) {
      res.render('login', {errorLogin: true})
    } else {
      res.render('login', {errorLogin: false})
    }

  }

  static postLogin(req, res) {

    let input = {}

    if (isEmail(req.body.user)) {
      input.email = req.body.user
    } else {
      input.username = req.body.user
    }

    Employee.findOne({
      where: input
    })
    .then(data => {
      if (!data) {
        res.redirect('/login?err=true')
      } else {
        bcrypt.compare(req.body.password, data.password)
        .then(result => {
          if (result) {
            req.session.isLoggedIn = true
            req.session.username = data.username
          }
        })
      }
    })

  }

  static employees(req, res) {

  }

  static projects(req, res) {


  }

  static getAddEmployee(req, res) {

  }

  static postAddEmployee(req, res) {

  }

  static getEditEmployee(req, res) {

  }

  static postEditEmployee(req, res) {

  }

  static getProjectAdd(req, res) {

  }

  static postProjectAdd(req, res) {

  }

  static getProjectsOpen(req, res) {

  }

  static getProjectsMine(req, res) {

  }

  static getProjectsUnassigned(req, res) {

  }


}

module.exports = Controller