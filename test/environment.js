const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()
