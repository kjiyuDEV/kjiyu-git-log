import app from './app';
import config from './config';

//port 7000번에서 듣고있으면(7000번켜지면) 실행함수 실행해라
const { PORT } = config;
app.listen(PORT, () => {
    console.log(`server started on Port ${PORT}`);
});
