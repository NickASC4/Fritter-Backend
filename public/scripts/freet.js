/* eslint-disable @typescript-eslint/restrict-template-expressions */

const { application } = require("express");

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function viewAllFreets(fields) {
  fetch('/api/freets')
    .then(showResponse)
    .catch(showResponse);
}

function viewFreetsByAuthor(fields) {
  fetch(`/api/freets?author=${fields.author}`)
    .then(showResponse)
    .catch(showResponse);
}

function createFreet(fields) {
  fetch('/api/freets', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function createNewspost(fields) {
  body = {...fields, newspost: true};
  fetch('/api/freets', {method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function editFreet(fields) {
  fetch(`/api/freets/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteFreet(fields) {
  fetch(`/api/freets/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function toggleNewsposting(fields) {
  body = {...fields, newspost: true};
  fetch(`/api/freets/${fields.id}`, {method: 'PUT', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function communityFreet(fields) {
  fetch(`/api/freets/${fields.communityId}`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function viewFreetsInCommunity(fields) {
  fetch(`/api/freets/${fields.community}`)
    .then(showResponse)
    .catch(showResponse);
}
