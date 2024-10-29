const express = require('express');
const bodyParser = require('body-parser');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

  

// Display contacts
app.get('/', async (req, res) => {
  const contacts = await Contact.findAll();
  res.render('index', { contacts });
});

// Add a contact
app.post('/add', async (req, res) => {
  const { name, phoneNumber } = req.body;
  try {
    await Contact.create({ name, phoneNumber });
    res.redirect('/?success=Contact added successfully');
  } catch (error) {
    res.redirect('/?error=Failed to add contact');
  }
});

// Update a contact
app.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber } = req.body;
  await Contact.update({ name, phoneNumber }, { where: { id } });
  res.redirect('/');
});
//delete
app.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.destroy({ where: { id } });
    res.redirect('/?success=Contact deleted successfully');
  } catch (error) {
    res.redirect('/?error=Failed to delete contact');
  }
});


// Clear all contacts
app.post('/clear', async (req, res) => {
  await Contact.destroy({ where: {} });
  res.redirect('/');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
