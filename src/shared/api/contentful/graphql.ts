type GraphQLVariables = Record<string, unknown>;

export type ContentfulGraphQLConfig = {
  spaceId?: string;
  accessToken?: string;
  environment?: string;
  fetchImpl?: typeof fetch;
};

type ResolvedContentfulGraphQLConfig = Required<
  Pick<
    ContentfulGraphQLConfig,
    "spaceId" | "accessToken" | "environment" | "fetchImpl"
  >
>;

function resolveContentfulGraphQLConfig(
  config: ContentfulGraphQLConfig = {},
): ResolvedContentfulGraphQLConfig {
  const spaceId = config.spaceId ?? process.env.CONTENTFUL_SPACE_ID;
  const accessToken = config.accessToken ?? process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = config.environment ?? process.env.CONTENTFUL_ENVIRONMENT;
  const fetchImpl = config.fetchImpl ?? fetch;

  if (!spaceId) {
    throw new Error("CONTENTFUL_SPACE_ID is required");
  }

  if (!accessToken) {
    throw new Error("CONTENTFUL_ACCESS_TOKEN is required");
  }

  if (!environment) {
    throw new Error("CONTENTFUL_ENVIRONMENT is required");
  }

  return {
    spaceId,
    accessToken,
    environment,
    fetchImpl,
  };
}

export function buildContentfulGraphQLEndpoint(
  spaceId: string,
  environment: string,
) {
  return `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`;
}

export function buildContentfulGraphQLOptions(
  query: string,
  accessToken: string,
  variables?: GraphQLVariables,
) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
  };
}

export async function graphql<T>(
  query: string,
  variables?: GraphQLVariables,
  config?: ContentfulGraphQLConfig,
): Promise<T> {
  const { spaceId, accessToken, environment, fetchImpl } =
    resolveContentfulGraphQLConfig(config);

  const endpoint = buildContentfulGraphQLEndpoint(spaceId, environment);
  const options = buildContentfulGraphQLOptions(query, accessToken, variables);
  const response = await fetchImpl(endpoint, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `GraphQL request failed: ${response.status} ${response.statusText} - ${errorText}`,
    );
  }

  return await response.json();
}
