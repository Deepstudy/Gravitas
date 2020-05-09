
import App from '@app/app';
const PORT = 3000;
import Logger from '@app/services/Logger';

const app = new App().app;
app.listen(PORT, () => {
  Logger.info('Express server listening on port ' + PORT);
});
