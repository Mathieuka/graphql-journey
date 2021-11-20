/* eslint-disable */
/* THIS IS A GENERATED FILE, DO NOT EDIT IT! */
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  body: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  post: Post;
};

export type CommentSubscriptionPayload = {
  __typename?: 'CommentSubscriptionPayload';
  data: Comment;
  mutation: MutationType;
};

export type CreateCommentInput = {
  author: Scalars['String'];
  body: Scalars['String'];
  post: Scalars['String'];
};

export type CreatePostInput = {
  author: Scalars['Int'];
  body: Scalars['String'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
};

export type CreateUserInput = {
  age?: Maybe<Scalars['Int']>;
  email: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<Comment>;
  createPost: Post;
  createUser: User;
  deletePost: Post;
  deleteUser: User;
  updateUser: User;
};


export type MutationCreateCommentArgs = {
  comment: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  post: CreatePostInput;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  args: UpdateUserInput;
  id: Scalars['Int'];
};

export enum MutationType {
  Created = 'CREATED',
  Deleted = 'DELETED'
}

export type Post = {
  __typename?: 'Post';
  authorId?: Maybe<Scalars['Int']>;
  body: Scalars['String'];
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
};

export type PostSubscriptionPayload = {
  __typename?: 'PostSubscriptionPayload';
  data: Post;
  mutation: MutationType;
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  greeting: Scalars['String'];
  me: User;
  posts: Array<Post>;
  users: Array<User>;
};


export type QueryGreetingArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  range?: Maybe<Range>;
};

export type Range = {
  max: Scalars['Int'];
  min: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  comment: CommentSubscriptionPayload;
  count: Scalars['Int'];
  post: PostSubscriptionPayload;
  userCreated: UserSubscriptionPayload;
};


export type SubscriptionCommentArgs = {
  postId: Scalars['String'];
};


export type SubscriptionUserCreatedArgs = {
  organization: Scalars['String'];
};

export type UpdateUserInput = {
  age: Scalars['Int'];
  email: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  age?: Maybe<Scalars['Int']>;
  comments: Array<Maybe<Comment>>;
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  organization: Scalars['String'];
  posts: Array<Maybe<Post>>;
};

export type UserSubscriptionPayload = {
  __typename?: 'UserSubscriptionPayload';
  data: User;
  mutation: MutationType;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentSubscriptionPayload: ResolverTypeWrapper<CommentSubscriptionPayload>;
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  CreateUserInput: CreateUserInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationType: MutationType;
  Post: ResolverTypeWrapper<Post>;
  PostSubscriptionPayload: ResolverTypeWrapper<PostSubscriptionPayload>;
  Query: ResolverTypeWrapper<{}>;
  Range: Range;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserSubscriptionPayload: ResolverTypeWrapper<UserSubscriptionPayload>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  CommentSubscriptionPayload: CommentSubscriptionPayload;
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  CreateUserInput: CreateUserInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Post: Post;
  PostSubscriptionPayload: PostSubscriptionPayload;
  Query: {};
  Range: Range;
  String: Scalars['String'];
  Subscription: {};
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserSubscriptionPayload: UserSubscriptionPayload;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentSubscriptionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentSubscriptionPayload'] = ResolversParentTypes['CommentSubscriptionPayload']> = {
  data?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  mutation?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'comment'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'post'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  deletePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'args' | 'id'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  authorId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostSubscriptionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostSubscriptionPayload'] = ResolversParentTypes['PostSubscriptionPayload']> = {
  data?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  mutation?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  greeting?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryGreetingArgs, never>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  comment?: SubscriptionResolver<ResolversTypes['CommentSubscriptionPayload'], "comment", ParentType, ContextType, RequireFields<SubscriptionCommentArgs, 'postId'>>;
  count?: SubscriptionResolver<ResolversTypes['Int'], "count", ParentType, ContextType>;
  post?: SubscriptionResolver<ResolversTypes['PostSubscriptionPayload'], "post", ParentType, ContextType>;
  userCreated?: SubscriptionResolver<ResolversTypes['UserSubscriptionPayload'], "userCreated", ParentType, ContextType, RequireFields<SubscriptionUserCreatedArgs, 'organization'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  comments?: Resolver<Array<Maybe<ResolversTypes['Comment']>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSubscriptionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSubscriptionPayload'] = ResolversParentTypes['UserSubscriptionPayload']> = {
  data?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  mutation?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  CommentSubscriptionPayload?: CommentSubscriptionPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostSubscriptionPayload?: PostSubscriptionPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserSubscriptionPayload?: UserSubscriptionPayloadResolvers<ContextType>;
};


export default {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Comment"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"body"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"author"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"post"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"CommentSubscriptionPayload"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"mutation"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationType"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"data"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"CreateCommentInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"body"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"author"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"post"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"CreatePostInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"body"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"published"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"author"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"CreateUserInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"email"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"age"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"user"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"args"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"post"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostInput"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"comment"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCommentInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"directives":[]}]},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"MutationType"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"CREATED"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"DELETED"},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Post"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"body"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"published"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"authorId"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"PostSubscriptionPayload"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"mutation"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationType"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"data"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"greeting"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"range"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Range"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"me"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"posts"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"comments"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}}}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"Range"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"min"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"max"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Subscription"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"userCreated"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"organization"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserSubscriptionPayload"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"count"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"comment"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"postId"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommentSubscriptionPayload"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"post"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostSubscriptionPayload"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"UpdateUserInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"age"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"email"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"User"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"organization"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"email"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"age"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"posts"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"comments"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"UserSubscriptionPayload"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"mutation"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationType"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"data"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}}},"directives":[]}]},{"kind":"SchemaDefinition","directives":[],"operationTypes":[{"kind":"OperationTypeDefinition","operation":"query","type":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}}},{"kind":"OperationTypeDefinition","operation":"mutation","type":{"kind":"NamedType","name":{"kind":"Name","value":"Mutation"}}},{"kind":"OperationTypeDefinition","operation":"subscription","type":{"kind":"NamedType","name":{"kind":"Name","value":"Subscription"}}}]}],"loc":{"start":0,"end":1581}} as any as import('graphql').DocumentNode