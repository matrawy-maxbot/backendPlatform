import { object, string, boolean, number } from 'joi';

// تعريف Schema للتحقق من الإعدادات
const graphqlSchema = object({
  GRAPHQL_ENDPOINT: string().uri({ allowRelative: true }).required(),
  GRAPHQL_PLAYGROUND: boolean().required(),
  GRAPHQL_INTROSPECTION: boolean().required(),
  GRAPHQL_DEPTH_LIMIT: number().integer().min(1).default(10),
  GRAPHQL_COMPLEXITY_LIMIT: number().integer().min(1).default(5000),
  GRAPHQL_TRACING: boolean().default(false),
}).unknown();

const { value: graphqlConfig, error } = graphqlSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(
    `GraphQL configuration validation error: ${error.details.map((x) => x.message).join(', ')}`
  );
}

export const {
  GRAPHQL_ENDPOINT,
  GRAPHQL_PLAYGROUND,
  GRAPHQL_INTROSPECTION,
  GRAPHQL_DEPTH_LIMIT,
  GRAPHQL_COMPLEXITY_LIMIT,
  GRAPHQL_TRACING,
} = graphqlConfig;
