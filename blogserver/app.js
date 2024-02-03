import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

// Routes
import postRoutes from './routes/api/post';
import userRoutes from './routes/api/user';
import authRoutes from './routes/api/auth';

import morgan from 'morgan';

const app = express();
const { MONGO_URI, PORT } = config;
console.log(MONGO_URI, '<<MONGO_URI');

const prod = process.env.NODE_ENV === 'production';

app.use(hpp());
app.use(helmet({ contentSecurityPolicy: false }));
if (prod) {
    app.use({
        origin: ['https://kjiyulog.com', /\.kjiyulog\.com$/],
        credentials: true,
    });
} else {
    app.use(morgan('dev'));
    app.use(
        cors({
            origin: true,
            credentials: true,
        }),
    );
}
// app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

app.use(express.json());

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connecting Success!!'))
    .catch((e) => console.log(e));

// Use routes
if (prod)
    app.all('*', (req, res, next) => {
        let protocol = req.headers['x-forward-proto'] || req.protocol;
        if (protocol === 'https') {
            next();
        } else {
            let to = `https://${req.hostname}${req.url}`;
            res.redirect(to);
        }
    });
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
if (prod) {
    app.use(express.static(path.join(__dirname, '../blogclient/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../blogclient/build', 'index.html'));
    });
}

export default app;
