import app from './app';

const PORT = 4444;
app.listen(PORT, () => {
  console.log(`Server up! port: ${PORT}`);
});
