import db from '@/database';

export const getTasks = async (req, res) => {
    let tasks;
    if(req.params.id){
        if(!/^\d+$/.test(req.params.id)) 
            return res.status(400).json({ code: 400, status: "bad request", error: 'invalid :id' });
        tasks = await db.models.todo.findOne({ where: { id: parseInt(req.params.id) } });
        if(!tasks)
            return res.status(404).json({ code: 404, status: "not found", error: ':id unknown'});
    }else{
        tasks = await db.models.todo.findAll({ order: [ ['id', 'DESC' ] ] });
    }   
    return res.json({ code: 200, status: "success", data: tasks });
};

export const deleteTask = async (req, res) => {
    let tasks;
    if(!/^\d+$/.test(req.params.id) || !req.params.id) 
        return res.status(400).json({ code: 400, status: "bad request", error: 'invalid :id' });
    try{
        tasks = await db.models.todo.destroy({ where: { id: parseInt(req.params.id) }});
    }catch(e){
        console.error(e);
        return res.status(500).json({ code: 500, status: "internal error", error: 'fail process' });
    }
    return res.json({ code: 200, status: "success", data: `rows deleted ${ tasks }` });
};

export const postTask = async (req, res) => {
    let body = req.body;
    let task;
    if(!body.name || typeof body.name !== 'string' || body.name.trim().length == 0)
        return res.status(400).json({ code: 400, status: "bad request", error: 'name (String) field is required' });
    if(body.name.length > 20)
        return res.status(400).json({ code: 400, status: "bad request", error: 'the name field must have a maximum of 20 characters' });
    if(!body.description || typeof body.description !== 'string' || body.description.trim().length == 0)
        return res.status(400).json({ code: 400, status: "bad request", error: 'description (String) field is required' });
    if(!body.author || typeof body.author !== 'string' || body.author.trim().length == 0)
        return res.status(400).json({ code: 400, status: "bad request", error: 'author (String) field is required' });
    if(body.author.length > 20)
        return res.status(400).json({ code: 400, status: "bad request", error: 'the author field must have a maximum of 20 characters' });
    if(body.isComplete && typeof body.isComplete !== 'boolean')
        return res.status(400).json({ code: 400, status: "bad request", error: 'the isComplete field must be a boolean' });
    try{
        task = await db.models.todo.create(body);
    }catch(e){
        console.error(e);
        return res.status(500).json({ code: 500, status: "internal error", error: 'fail process' });
    }
    return res.status(201).json({ code: 201, status: "success", data: task });
};

export const putTask = async (req, res) => {
    let body = req.body;
    if(!/^\d+$/.test(req.params.id) || !req.params.id) 
        return res.status(400).json({ code: 400, status: "bad request", error: 'invalid :id' });
    if(body.name && (typeof body.name !== 'string' || body.name.trim().length == 0))
        return res.status(400).json({ code: 400, status: "bad request", error: 'name (String) field is required' });
    if(body.name && body.name.length > 20)
        return res.status(400).json({ code: 400, status: "bad request", error: 'the name field must have a maximum of 20 characters' });
    if(body.description && (typeof body.description !== 'string' || body.description.trim().length == 0))
        return res.status(400).json({ code: 400, status: "bad request", error: 'description (String) field is required' });
    if(body.author && (typeof body.author !== 'string' || body.author.trim().length == 0))
        return res.status(400).json({ code: 400, status: "bad request", error: 'author (String) field is required' });
    if(body.author && body.author.length > 20)
        return res.status(400).json({ code: 400, status: "bad request", error: 'the author field must have a maximum of 20 characters' });
    if(body.isComplete && typeof body.isComplete !== 'boolean')
        return res.status(400).json({ code: 400, status: "bad request", error: 'author (Boolean) field is required' });
    body.id = undefined;
    body.createdAt = undefined;
    body.updatedAt = undefined;
    body.deletedAt = undefined;
    let task = await db.models.todo.findOne({ where: { id: parseInt(req.params.id) }});
    if(!task)
        return res.status(404).json({ code: 404, status: "not found", error: ':id unknown'});
    Object.assign(task, body);
    try{
        await task.save();
    }catch(e){
        console.error(e);
        return res.status(500).json({ code: 500, status: "internal error", error: 'fail process' });
    }
    return res.json({ code: 200, status: "success", data: task });
};
  