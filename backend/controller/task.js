const Task = require('../models/Task');
const moment = require('moment');

exports.createTask = async (req, res) => {
    try {
        console.log(req.body)
        const task = new Task({...req.body,created_by:req.userId});
        await task.save();
        res.status(201).send({success:true,data:task});
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({created_by:req.userId});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateTask = async (req, res) => {
    let updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'checklist', 'due_date', 'priority', 'status'];
    updates.forEach(update => {
        if (!allowedUpdates.includes(update)) {
          delete req.body[update];
        }
    });
    //key after removing not necessary fileds
    updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        console.log(task)
        res.send({success:true,data:task});
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateChecklistItemStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        console.log(req.body)
        task.checklist=req.body;

        await task.save();
        res.send({success:true,data:task});
    } catch (error) {
        res.status(400).send(error);
    }
};


exports.filterTasks = async (req, res) => {
    try {
        let start;
        console.log({user: req.userId})
        console.log(req.body)
        switch (req.body.period) {
            case 'today':
                start = moment().startOf('day');
                break;
            case 'week':
                start = moment().startOf('week');
                break;
            case 'month':
                start = moment().startOf('month');
                break;
            default:
                return res.status(400).send({ message: 'Invalid period' });
        }

        const tasks = await Task.find({
            created_by: req.userId,
            createdAt: { $gte: start.toDate() }
        });

        res.send(tasks);
    } catch (error) {
        res.status(400).send(error);
    }
};


exports.analyticsOfTask = async (req, res) => {
    try {
        console.log({hi:"hi",use:req.userId})

        const tasks = await Task.find({ created_by: req.userId });
        let analytics = {
            backlogTasks: 0,
            todoTasks: 0,
            inProgressTasks: 0,
            completedTasks: 0,
            lowPriority: 0,
            moderatePriority: 0,
            highPriority: 0,
            dueDateTasks: 0
        };

        tasks.forEach(task => {
            switch (task.status) {
                case 'backlog':
                    analytics.backlogTasks++;
                    break;
                case 'to-do':
                    analytics.todoTasks++;
                    break;
                case 'progress':
                    analytics.inProgressTasks++;
                    break;
                case 'done':
                    analytics.completedTasks++;
                    break;
            }

            switch (task.priority) {
                case 'Low':
                    analytics.lowPriority++;
                    break;
                case 'Moderate':
                    analytics.moderatePriority++;
                    break;
                case 'High':
                    analytics.highPriority++;
                    break;
            }

            if (task?.due_date) {
                const dueDate = new Date(task?.due_date);
                console.log({dueDate})
                dueDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00
                console.log(dueDate)
                let today=new Date();
                today.setHours(0, 0, 0, 0)
                if (dueDate < today) {
                    analytics.dueDateTasks++; // Increment the count of due tasks
                }
            }
        });

        console.log(analytics)
        res.send(analytics);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
  
      if (!task) {
        return res.status(404).send();
      }
  
      res.send({success:true,data:task});
    } catch (e) {
      res.status(500).send();
    }
  };
  