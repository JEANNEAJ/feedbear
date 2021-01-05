const axios = require('axios');

const testingApi = {
  url: 'http://localhost:5000'
}

//--------------------------------- AUTH
testingApi.createUser = (user) => {
  return axios(`${testingApi.url}/signup`, { 
    method: 'post',
    data: user
  })
}

testingApi.login = (user) => {
  return axios(`${testingApi.url}/login`, {
    method: 'post',
    data: user
  })
}

testingApi.logout = authCookie => {
  return axios(`${testingApi.url}/session`, { 
    method: 'delete',
    headers: {
      'Cookie': authCookie
    }
  })
}

//--------------------------------- USERS
testingApi.getUserName = userId => axios(`${testingApi.url}/${userId}`)

testingApi.deleteUser = (userId, authCookie) => {
  return axios(`${testingApi.url}/users/${userId}`, { 
    method: 'delete', 
    headers: { cookie: authCookie }
  })
} 

//--------------------------------- PROJECTS
testingApi.createProject =  (project, authCookie) => {
  return axios(`${testingApi.url}/projects/`, {
    method: 'post',
    headers: {
      'Cookie': authCookie
    },
    data: project
  })
}

testingApi.getProject = (projectId) => {
  return axios(`${testingApi.url}/projects/${projectId}`, {
    method: 'get',
    params: { type: '_id'}
  })
}

testingApi.updateProject =  (project, authCookie) => {
  return axios(`${testingApi.url}/projects/${project._id}`, {
    method: 'patch',
    headers: {
      'Cookie': authCookie
    },
    data: project
  })
}

testingApi.deleteProject = (projectId, authCookie) => {
  return axios(`${testingApi.url}/projects/${projectId}`, {
    method: 'delete',
    headers: {
      'Cookie': authCookie
    },
  })
}

//--------------------------------- COMMENTS
testingApi.addComment = (projectId, comment, authCookie) => {
  return axios(`${testingApi.url}/comments/${projectId}`, {
    method: 'post',
    headers: {
      'Cookie': authCookie
    },
    data: comment
  })
}

testingApi.getComments = (projectId) => {
  return axios(`${testingApi.url}/comments/${projectId}`, {
  })
}

testingApi.editComment = (projectId, comment, authCookie) => {
  return axios(`${testingApi.url}/comments/${projectId}/${comment._id}`, {
    method: 'patch',
    headers: {
      'Cookie': authCookie
    },
    data: comment
  })
}

testingApi.deleteComment = (projectId, commentId, authCookie) => {
  return axios(`${testingApi.url}/comments/${projectId}/${commentId}`, {
    method: 'delete',
    headers: {
      'Cookie': authCookie
    },
  })
}

module.exports = testingApi;