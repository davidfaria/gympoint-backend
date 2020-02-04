import app from './app';

const PORT = process.env.PORT;
const APP_NAME = process.env.APP_NAME;
app.listen(PORT, () => {
  console.log(`${APP_NAME} up! port: ${PORT}`);
});
