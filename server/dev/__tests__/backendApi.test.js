
const testingApi = require('../testingApi');

describe('Feedback App Testing', () => {
  // Testing Objects
  const user = {
    name: 'Jest Test User',
    email: 'jest@example.com',
    password: 'jestuser'
  }

  let project = {
    name: user.name,
    projectTitle: "jest test",
    projectLink: 'test.com',
    liveLink: 'test.com',
    message: 'testing with jest'
  }

  let comment = {
    comment: 'Looks great!'
  }
  
  describe('Auth Testing', () => {
    test('Sign Up (Create) User', async () => {
      const { status, data: { data: userResObj } } = await testingApi.createUser(user)
      user._id = userResObj._id
    
      expect(status).toBe(200)
      // verify the test user object contains the properties in userResObj
      expect(user).toEqual(expect.objectContaining(userResObj))
  
    });
    
    test('Validate: Prevent creating duplicate users', async () => {
      try {
        await testingApi.createUser(user)
      } catch ({response}) {
        expect(response.status).toBe(409)
      }
    
    });

    test('Login User', async () => {
      const credentials = {
        email: user.email,
        password: user.password
      }

      const {status, data: { data: userData }, headers} = await testingApi.login(credentials)
      
      // in case sign up user fails (duplicate, not deleted, etc) set the _id property to the test user
      if (user._id === undefined) {
        user._id = userData._id
      }

      user.cookie = headers['set-cookie'][0]

      expect(status).toBe(200)
      // check that user.cookie got set
      expect(user.cookie).toBeTruthy()
      
    })
  })

  describe('Projects Model Testing', () => {
    test('Create Project', async () => {
      const { status, data: addedProject} = await testingApi.createProject(project, user.cookie)

      project = addedProject
      
      expect(status).toBe(201)
      // if project was created successfully, an _id will be returned
      expect(project._id).toBeTruthy()
    })
    
    test('Read Project', async () => {
      const { status, data: receivedProject} = await testingApi.getProject(project._id)
      expect(status).toBe(200)
      expect(receivedProject[0]).toEqual(project)
    })

    test('Update Project', async () => {
      const updates = {
        ...project,
        message: 'updated project from jest test'
      }

      const {status, data: updatedProject} = await testingApi.updateProject(updates, user.cookie)

      project = updatedProject

      expect(status).toBe(200)
      expect(project.message).toEqual(updates.message)
    })

  })

  describe('Comments Model Testing', () => {
    test('Add Comment', async () => {
      
      const { status, data: addedComment } = await testingApi.addComment(project._id, comment, user.cookie)
      comment = { ...addedComment }

      expect(status).toBe(201)
      expect(comment._id).toBeTruthy()
    })

    test('Get Comments', async () => {
      const { data } = await testingApi.getComments(project._id)
      const commentsList = data[0].comments;

      expect(commentsList).toHaveLength(1)
    })

    test('Edit Comment', async () => {
      const { status } = await testingApi.editComment(project._id, comment, user.cookie)

      // current implementation does not return the updated comment
      // checking for a successful response status code instead
      expect(status).toBe(201);
    })
    
    test('Delete Comment', async () => {
      const { status, data } = await testingApi.deleteComment(project._id, comment._id, user.cookie)
      const { data: commentsListData } = await testingApi.getComments(project._id)
      const commentsList = commentsListData[0].comments;
      
      expect(status).toBe(201)
      expect(data).toBe(comment._id)
      expect(commentsList).toHaveLength(0)
    })
  })
  
  describe('Clean Up', () => {
    test('Delete Project', async () => {
      const { data: { message } } = await testingApi.deleteProject(project._id, user.cookie)
      expect(message).toBe("Project deleted successfully")
    })
    
    test('Delete User', async () => {
      const {status, data} = await testingApi.deleteUser(user._id, user.cookie)
      const expectedResponse = { data: { id: user._id } }
      expect(status).toEqual(200)
      expect(data).toEqual(expectedResponse)
      
      try {
        await testingApi.getUserName(user._id)
      } catch ({response}) {
        expect(response.status).toBe(404)
      }
      
    })

    test('Logout User (Destroy Session)', async () => {
      const response = await testingApi.logout(user.cookie)
      expect(response.status).toBe(204)
    })
    
  })

})