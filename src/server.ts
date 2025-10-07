import app from './app';
const port = process.env.PORT || 4000;
const nodeEnv = process.env.NODE_ENV || 'development';

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port} (${nodeEnv})`);
});
