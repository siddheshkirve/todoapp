exports.user = async (req,res) => {
    try {
        await user.save(req.body)
    } catch (error) {
        res.status(400).send(error.message)
    }
    
}
