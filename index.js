import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './src/routes/authRoute.js';
import userRoutes from './src/routes/userRoute.js';

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());

// Security middleware
app.use(cors({
  origin: ['http://localhost:' + port],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(helmet());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Setup Swagger Documentation
async function setupSwagger() {
    try {
        const swaggerUi = await import('swagger-ui-express')
        const { default: specs } = await import('./src/config/swagger.js')

        app.use('/api-docs', swaggerUi.default.serve, swaggerUi.default.setup(specs, {
            explorer: true,
            customCss: '.swagger-ui .topbar { display: none }',
            customSiteTitle: "User Management API Documentation"
        }))

        console.log('Swagger documentation available at: http://localhost:' + port + '/api-docs')
    } catch (error) {
        console.log('Swagger setup failed:', error.message)
    }
}

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Latihan Backend API',
        documentation: '/api-docs'
    })
})

// Initialize Swagger
setupSwagger()

app.listen(port, () => {
  console.log('Server running on localhost:' + port);
});