const Events = require('../model/eventModel');

const getEvents = async (req,res) => {
    try{

        if(Object.keys(req.query).length > 0){

            if('type' in req.query){
                const list = await Events.find({sport : req.query.type});

             return res.json(list);
            }
            return res.json('Type no encontrado');
        }
        const list = await Events.find();

        return res.json(list);
    }catch(error){

    }
}

const getEventById = async (req,res) => {
    try{
        const event = await Events.findById(req.params.id);

        return res.json(event);
    }catch(error){

    }
}

const createEvent = async (req,res) => {
    try{

        if (!req.body.name || typeof req.body.name !== 'string' || req.body.name.trim().length === 0) {
            errors.push('El nombre es obligatorio y debe ser un texto no vacío.');
        }
        
        if (!req.body.description || typeof req.body.description !== 'string' || req.body.description.trim().length === 0) {
            errors.push('La descripcion es obligatoria y debe ser un texto no vacío.');
        }
        
        if (!req.body.place || typeof req.body.place !== 'string' || req.body.place.trim().length === 0) {
            errors.push('La ubicacion es obligatoria y debe ser un texto no vacío.');
        }
        
        if (!req.body.sport || typeof req.body.sport !== 'string' || req.body.sport.trim().length === 0) {
            errors.push('El tipo de deporte es obligatoria y debe ser un texto no vacío.');
        }

        const parsedDate = new Date(req.body.date);

        if (isNaN(parsedDate.getTime())) {
            errors.push('La fecha proporcionada no es válida.');
        }
    
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const data = req.body;

        data.organicer = req.user.username;

        const event = new Events(data);
        const createdEvent = await event.save();
        res.json(createdEvent);
    }catch(error){

    }
}

const updateEvent = async (req,res) => {
    try{
        
        if (!req.body.name || typeof req.body.name !== 'string' || req.body.name.trim().length === 0) {
            errors.push('El nombre es obligatorio y debe ser un texto no vacío.');
        }
        
        if (!req.body.description || typeof req.body.description !== 'string' || req.body.description.trim().length === 0) {
            errors.push('La descripcion es obligatoria y debe ser un texto no vacío.');
        }
        
        if (!req.body.place || typeof req.body.place !== 'string' || req.body.place.trim().length === 0) {
            errors.push('La ubicacion es obligatoria y debe ser un texto no vacío.');
        }

        if (!req.body.sport || typeof req.body.sport !== 'string' || req.body.sport.trim().length === 0) {
            errors.push('El tipo de deporte es obligatoria y debe ser un texto no vacío.');
        }

        const parsedDate = new Date(req.body.date);

        if (isNaN(parsedDate.getTime())) {
            errors.push('La fecha proporcionada no es válida.');
        }
    
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const newEvent = await Events.findByIdAndUpdate(req.params.id, req.body,{new:true});
        
        res.json(newEvent);
    }catch(error){

    }
}

const deleteEvent = async(req, res)=>{
    try {
        const deleteEvent = await Events.findByIdAndDelete(req.params.id,{new:true});

        return res.json(deleteEvent);
    } catch (error) {
        
    }
}

const upcoming = async(req, res)=>{
    try {
        const list = await Events.find().sort({date : 1});

        return res.json(list);
    } catch (error) {

    }
}

const dateRange = async(req, res)=>{
    try {

        if('from' in req.query && 'to' in req.query){

            const filter = {
                date: {
                    $gte: req.query.from,
                    $lte: req.query.to
                }
            };

            const events = await Events.find(filter).sort({ date: 1 });

            return res.json(events);
        }

        return res.json('Valores no validos');
    } catch (error) {

    }
}


module.exports = {getEvents, getEventById, createEvent, 
    updateEvent, deleteEvent, upcoming, dateRange};