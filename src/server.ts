import app from './app';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();

connectDB()
.then(() => {

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

})
.catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
})
