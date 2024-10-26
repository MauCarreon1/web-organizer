const getGreeting = (day) => {
    const greetings = {
        "Monday": ["¡Que tengas un gran comienzo de semana!", "¡Feliz Lunes!"],
        "Tuesday": ["¡Sigue adelante, es solo martes!", "¡Feliz Martes!"],
        "Wednesday": ["¡Ya estás a mitad de semana!", "¡Feliz Miércoles!"],
        "Thursday": ["¡Casi llegas, mantente fuerte!", "¡Feliz Jueves!"],
        "Friday": ["¡Ya casi es fin de semana!", "¡Feliz Viernes!"],
        "Saturday": ["¡Disfruta tu fin de semana!", "¡Feliz Sábado!"],
        "Sunday": ["¡Recarga energías para la próxima semana!", "¡Feliz Domingo!"]
    };
    return greetings[day] || ["¡Hola!", "¡Que tengas un gran día!"];
};

async function taskLists(req, res) {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.sendStatus(500);
    }
}

async function createTask(req, res) {
    try {
        const { taskName, complete = true } = req.body;
        const newTask = new TaskModel({ taskName, complete });
        await newTask.save();
        res.status(201).json({ task: newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.sendStatus(500);
    }
}

async function finishTask(req, res) {
    try {
        const { id } = req.body;
        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            { complete: false },
            { new: true }
        );

        if (!updatedTask) {
            console.log('Task not found');
            return res.status(404).send('Task not found');
        }

        res.status(200).json({ task: updatedTask });
    } catch (error) {
        console.error('Error finishing task:', error);
        res.sendStatus(500);
    }
}

async function deleteTask(req, res) {
    try {
        const { id } = req.body;
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            console.log(`Task with ID ${id} not found`);
            return res.status(404).send('Task not found');
        }

        console.log(`Task with ID ${id} deleted`);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting task:', error);
        res.sendStatus(500);
    }
}

module.exports = {
    getGreeting,
    taskLists,
    createTask,
    finishTask,
    deleteTask
};
