declare module 'swagger-jsdoc' {
    interface SwaggerDefinition {
        openapi: string;
        info: {
            title: string;
            version: string;
            description?: string;
        };
        servers?: {
            url: string;
            description?: string;
        }[];
        components?: Record<string, any>;
    }

    interface Options {
        definition: SwaggerDefinition;
        apis: string[];
    }

    export default function swaggerJSDoc(options: Options): object;
}
