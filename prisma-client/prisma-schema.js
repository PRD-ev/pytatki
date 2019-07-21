module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.2). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateDirector {
  count: Int!
}

type AggregateMovie {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Director {
  id: ID!
  name: String!
  movies(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Movie!]
}

type DirectorConnection {
  pageInfo: PageInfo!
  edges: [DirectorEdge]!
  aggregate: AggregateDirector!
}

input DirectorCreateInput {
  id: ID
  name: String!
  movies: MovieCreateManyWithoutDirectorInput
}

input DirectorCreateOneWithoutMoviesInput {
  create: DirectorCreateWithoutMoviesInput
  connect: DirectorWhereUniqueInput
}

input DirectorCreateWithoutMoviesInput {
  id: ID
  name: String!
}

type DirectorEdge {
  node: Director!
  cursor: String!
}

enum DirectorOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
}

type DirectorPreviousValues {
  id: ID!
  name: String!
}

type DirectorSubscriptionPayload {
  mutation: MutationType!
  node: Director
  updatedFields: [String!]
  previousValues: DirectorPreviousValues
}

input DirectorSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: DirectorWhereInput
  AND: [DirectorSubscriptionWhereInput!]
}

input DirectorUpdateInput {
  name: String
  movies: MovieUpdateManyWithoutDirectorInput
}

input DirectorUpdateManyMutationInput {
  name: String
}

input DirectorUpdateOneRequiredWithoutMoviesInput {
  create: DirectorCreateWithoutMoviesInput
  update: DirectorUpdateWithoutMoviesDataInput
  upsert: DirectorUpsertWithoutMoviesInput
  connect: DirectorWhereUniqueInput
}

input DirectorUpdateWithoutMoviesDataInput {
  name: String
}

input DirectorUpsertWithoutMoviesInput {
  update: DirectorUpdateWithoutMoviesDataInput!
  create: DirectorCreateWithoutMoviesInput!
}

input DirectorWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  movies_some: MovieWhereInput
  AND: [DirectorWhereInput!]
}

input DirectorWhereUniqueInput {
  id: ID
}

scalar Long

type Movie {
  id: ID!
  title: String!
  duration: Int!
  director: Director!
}

type MovieConnection {
  pageInfo: PageInfo!
  edges: [MovieEdge]!
  aggregate: AggregateMovie!
}

input MovieCreateInput {
  id: ID
  title: String!
  duration: Int!
  director: DirectorCreateOneWithoutMoviesInput!
}

input MovieCreateManyWithoutDirectorInput {
  create: [MovieCreateWithoutDirectorInput!]
  connect: [MovieWhereUniqueInput!]
}

input MovieCreateWithoutDirectorInput {
  id: ID
  title: String!
  duration: Int!
}

type MovieEdge {
  node: Movie!
  cursor: String!
}

enum MovieOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  duration_ASC
  duration_DESC
}

type MoviePreviousValues {
  id: ID!
  title: String!
  duration: Int!
}

input MovieScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  duration: Int
  duration_not: Int
  duration_in: [Int!]
  duration_not_in: [Int!]
  duration_lt: Int
  duration_lte: Int
  duration_gt: Int
  duration_gte: Int
  AND: [MovieScalarWhereInput!]
  OR: [MovieScalarWhereInput!]
  NOT: [MovieScalarWhereInput!]
}

type MovieSubscriptionPayload {
  mutation: MutationType!
  node: Movie
  updatedFields: [String!]
  previousValues: MoviePreviousValues
}

input MovieSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MovieWhereInput
  AND: [MovieSubscriptionWhereInput!]
}

input MovieUpdateInput {
  title: String
  duration: Int
  director: DirectorUpdateOneRequiredWithoutMoviesInput
}

input MovieUpdateManyDataInput {
  title: String
  duration: Int
}

input MovieUpdateManyMutationInput {
  title: String
  duration: Int
}

input MovieUpdateManyWithoutDirectorInput {
  create: [MovieCreateWithoutDirectorInput!]
  delete: [MovieWhereUniqueInput!]
  connect: [MovieWhereUniqueInput!]
  set: [MovieWhereUniqueInput!]
  disconnect: [MovieWhereUniqueInput!]
  update: [MovieUpdateWithWhereUniqueWithoutDirectorInput!]
  upsert: [MovieUpsertWithWhereUniqueWithoutDirectorInput!]
  deleteMany: [MovieScalarWhereInput!]
  updateMany: [MovieUpdateManyWithWhereNestedInput!]
}

input MovieUpdateManyWithWhereNestedInput {
  where: MovieScalarWhereInput!
  data: MovieUpdateManyDataInput!
}

input MovieUpdateWithoutDirectorDataInput {
  title: String
  duration: Int
}

input MovieUpdateWithWhereUniqueWithoutDirectorInput {
  where: MovieWhereUniqueInput!
  data: MovieUpdateWithoutDirectorDataInput!
}

input MovieUpsertWithWhereUniqueWithoutDirectorInput {
  where: MovieWhereUniqueInput!
  update: MovieUpdateWithoutDirectorDataInput!
  create: MovieCreateWithoutDirectorInput!
}

input MovieWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  duration: Int
  duration_not: Int
  duration_in: [Int!]
  duration_not_in: [Int!]
  duration_lt: Int
  duration_lte: Int
  duration_gt: Int
  duration_gte: Int
  director: DirectorWhereInput
  AND: [MovieWhereInput!]
}

input MovieWhereUniqueInput {
  id: ID
}

type Mutation {
  createDirector(data: DirectorCreateInput!): Director!
  updateDirector(data: DirectorUpdateInput!, where: DirectorWhereUniqueInput!): Director
  updateManyDirectors(data: DirectorUpdateManyMutationInput!, where: DirectorWhereInput): BatchPayload!
  upsertDirector(where: DirectorWhereUniqueInput!, create: DirectorCreateInput!, update: DirectorUpdateInput!): Director!
  deleteDirector(where: DirectorWhereUniqueInput!): Director
  deleteManyDirectors(where: DirectorWhereInput): BatchPayload!
  createMovie(data: MovieCreateInput!): Movie!
  updateMovie(data: MovieUpdateInput!, where: MovieWhereUniqueInput!): Movie
  updateManyMovies(data: MovieUpdateManyMutationInput!, where: MovieWhereInput): BatchPayload!
  upsertMovie(where: MovieWhereUniqueInput!, create: MovieCreateInput!, update: MovieUpdateInput!): Movie!
  deleteMovie(where: MovieWhereUniqueInput!): Movie
  deleteManyMovies(where: MovieWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  director(where: DirectorWhereUniqueInput!): Director
  directors(where: DirectorWhereInput, orderBy: DirectorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Director]!
  directorsConnection(where: DirectorWhereInput, orderBy: DirectorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DirectorConnection!
  movie(where: MovieWhereUniqueInput!): Movie
  movies(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Movie]!
  moviesConnection(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MovieConnection!
  node(id: ID!): Node
}

type Subscription {
  director(where: DirectorSubscriptionWhereInput): DirectorSubscriptionPayload
  movie(where: MovieSubscriptionWhereInput): MovieSubscriptionPayload
}
`
      }
    