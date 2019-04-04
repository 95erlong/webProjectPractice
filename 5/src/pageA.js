// import './subPageA';
// import './subPageB';

// require.ensure(['./subPageA', './subPageB'], function() {
//   var subPageA = require('./subPageA')
//   var subPageB = require('./subPageB')
// }, 'subPage')

// require.include('./moduleA')

import * as _ from 'lodash';

var page = 'subpageA'
if (page === 'subpageA') {
  import(/* webpackChunkName: 'subpageA' */'./subPageA').then(function (subPageA) {
    console.log(subPageA)
  })
  // require.ensure(['./subPageA'], function() {
  //   var subpageA = require('./subPageA')
  // }, 'subPageA')
} else if (page === 'subpageB') {
  import(/* webpackChunkName: 'subpageB' */'./subPageB').then(function (subPageB) {
    console.log(subPageB)
  })
  // require.ensure(['./subPageB'], function() {
  //   var subpageB = require('./subPageB')
  // }, 'subPageB')
}

// import * as _ from 'lodash';

// require.ensure([], function() {
//   var _ = require('lodash')
//   _.join(['1', '2'], '3')
// }, 'vendor')

export default 'pageA'