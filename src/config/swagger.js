import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'API documentation for User Management API',
            contact: {
                name: 'Nova Fajri',
                email: 'novafajri20@gmail.com'
            }
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 4000}`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    required: ['email', 'password', 'username'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'User ID',
                            example: '550e8400-e29b-41d4-a716-446655440000'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email',
                            example: 'user@example.com'
                        },
                        username: {
                            type: 'string',
                            description: 'User username',
                            example: 'johndoe'
                        },
                        role: {
                            type: 'string',
                            description: 'User role',
                            example: 'user',
                            enum: ['user', 'admin']
                        },
                        avatar_url: {
                            type: 'string',
                            description: 'Avatar Photo URL',
                            example: 'https://res.cloudinary.com/denw4pbvf/image/upload/v1760711731/avatars/xmrg6ibk2jjscmczuyu8.jpg',
                        },
                        created_at: {
                            type: 'string',
                            description: 'User Created Time',
                            example: '2025-10-17 22:57:06.083',
                        },
                        updated_at: {
                            type: 'string',
                            description: 'User Update Time',
                            example: '2025-10-18 22:57:06.083',
                        }
                    },
                },
                UserRegister: {
                    type: 'object',
                    required: ['email', 'password', 'username'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email',
                            example: 'user@example.com'
                        },
                        password: {
                            type: 'string',
                            minLength: 6,
                            description: 'User password',
                            example: 'password123'
                        },
                        username: {
                            type: 'string',
                            description: 'User username',
                            example: 'johndoe'
                        }
                    }
                },
                UserLogin: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email',
                            example: 'user@example.com'
                        },
                        password: {
                            type: 'string',
                            description: 'User password',
                            example: 'password123'
                        }
                    }
                },
                ApiResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'success'
                        },
                        statusCode: {
                            type: 'integer',
                            example: 200
                        },
                        message: {
                            type: 'string',
                            example: 'Operation successful'
                        },
                        data: {
                            type: 'object',
                            description: 'Response data'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'error'
                        },
                        statusCode: {
                            type: 'integer',
                            example: 400
                        },
                        message: {
                            type: 'string',
                            example: 'Error message'
                        }
                    }
                },
            }
        }
    },
    apis: ['./src/routes/*.js'], // Path to the API routes files
};

const specs = swaggerJSDoc(options);

export default specs;