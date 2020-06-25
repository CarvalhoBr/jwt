class ProjectController{
    async verify(req, res){
        res.send({ok: true})
    }
}

module.exports = ProjectController