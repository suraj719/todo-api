const express = require('express')
const router = express.Router();
const {getAllTasks,createTask,getTask,updateTask,deleteTask} = require('../controllers/tasks')


router.route('/').get(getAllTasks).post(createTask).patch(updateTask).delete(deleteTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)


module.exports = router