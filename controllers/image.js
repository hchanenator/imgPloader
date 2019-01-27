var fs = require('fs'),
  path = require('path'),
  sidebar = require('../helpers/sidebar');

module.exports = {
  index: (req, res) => {
    const ViewModel = {
      image: {
        uniqueId: 1,
        title: 'Sample Image 1',
        description: 'This is a sample.',
        filename: 'sample1.jpg',
        Views: 0,
        likes: 0,
        timestamp: Date.now()
      },
      comments: [{
        image_id: 1,
        email: 'test@testing.com',
        name: 'Test Tester',
        gravatar: 'http://lorempixel.com/75/75/animals/1',
        comment: 'This is a test comment...',
        timestamp: Date.now()
      }, {
        image_id: 1,
        email: 'test@testing.com',
        name: 'Test Tester',
        gravatar: 'http://lorempixel.com/75/75/animals/2',
        comment: 'Another followup comment!',
        timestamp: Date.now()
      }]
    };

    sidebar(ViewModel, (ViewModel) => {
      res.render('images', ViewModel);
    });

  },
  create(req, res) {
    const saveImage = () => {
      var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
        imgUrl = '';

      for (var i = 0; i < 6; i++) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      const tempPath = req.files.file.path,
        ext = path.extname(req.files.file.name).toLowerCase(),
        targetPath = path.resolve(`./public/upload/${imgUrl}${ext}`);

      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        fs.rename(tempPath, targetPath, (err) => {
          if (err) throw err;
          res.redirect(`/images/${imgUrl}`);
        });
      } else {
        fs.unlink(tempPath, () => {
          if (err) throw err;
          res.json((500, { error: 'Only image files are allowed.' }));
        });
      }
    };

    saveImage();
  },
  like(req, res) {
    res.send('The image:like POST controller');
  },
  comment(req, res) {
    res.send('The image:comment POST controller');
  }
};
