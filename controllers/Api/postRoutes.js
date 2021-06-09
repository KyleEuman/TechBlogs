const router = require('express').Router();
const { post } = require('../../models');

router.get('/', function (req, res) {
  sql.connect(sqlConfig, function() {
    const request = new sql.Request();
    request.query('select * from techblog_db', function(err, recordset) {
       if(err) console.log(err);
        res.end(JSON.stringify(recordset));
      });
    });
});





router.post('/', async (req, res) => {
  try {
    const newpost = await post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post created with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
