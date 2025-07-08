module.exports = {
  getIndex: (req, res) => {
    res.render('index', { title: 'Homepage' });
  },
};
