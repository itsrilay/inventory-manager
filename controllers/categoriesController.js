let id = 0;

function createId() {
  id = id + 1;
  return id;
}

const categories = [
  {
    id: createId(),
    name: 'Peripherals',
  },
  {
    id: createId(),
    name: 'Desktops',
  },
  {
    id: createId(),
    name: 'Components',
  },
];

module.exports = {
  getCategories: (req, res) => {
    res.render('categoryList', {
      title: 'Category List',
      categories: categories,
    });
  },
};
