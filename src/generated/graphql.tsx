type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents a date in time */
  Date: any;
};

export type AuthResult = {
  accessToken: Scalars["String"];
  idToken: Scalars["String"];
  tokenType: Scalars["String"];
  expiresIn: Scalars["Int"];
};

export type Card = {
  id: Scalars["ID"];
  translation: Scalars["String"];
  meaning: Scalars["String"];
  pronunciation?: Maybe<Scalars["String"]>;
  audioUrl?: Maybe<Scalars["String"]>;
  language?: Maybe<Language>;
  creator: User;
  containingDecks?: Maybe<Array<Maybe<Deck>>>;
};

export type CardFilterInput = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  sortDirection?: Maybe<SortDirection>;
  sortBy?: Maybe<CardSortingOptions>;
  creator?: Maybe<Scalars["ID"]>;
  language?: Maybe<Scalars["ID"]>;
  containedInDeck?: Maybe<Scalars["ID"]>;
};

export type CardInput = {
  translation?: Maybe<Scalars["String"]>;
  meaning?: Maybe<Scalars["String"]>;
  pronunciation?: Maybe<Scalars["String"]>;
  audioUrl?: Maybe<Scalars["String"]>;
  language?: Maybe<Scalars["ID"]>;
  id?: Maybe<Scalars["ID"]>;
};

export type CardSortingOptions = "meaning" | "pronunciation" | "translation";

export type Deck = {
  id: Scalars["ID"];
  name: Scalars["String"];
  owner: User;
  language?: Maybe<Language>;
  cards?: Maybe<Array<Maybe<Card>>>;
  cardCount?: Maybe<Scalars["Int"]>;
};

export type DeckCardsArgs = {
  filter?: Maybe<CardFilterInput>;
};

export type DeckFilterInput = {
  limit?: Maybe<Scalars["Int"]>;
  search?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["ID"]>;
  language?: Maybe<Scalars["ID"]>;
  cardContained?: Maybe<Scalars["ID"]>;
};

export type DeckInput = {
  name?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["String"]>;
  language?: Maybe<Scalars["ID"]>;
  cards?: Maybe<Array<Maybe<CardInput>>>;
};

export type Identity = {
  userId: Scalars["ID"];
  provider: Scalars["String"];
  connection: Scalars["String"];
  isSocial: Scalars["Boolean"];
};

export type Language = {
  id: Scalars["ID"];
  name: Scalars["String"];
  nativeName: Scalars["String"];
  languageCode: Scalars["String"];
};

export type Mutation = {
  authenticate?: Maybe<AuthResult>;
  logout?: Maybe<Scalars["Boolean"]>;
  initUser?: Maybe<User>;
  editUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  addDeck?: Maybe<Deck>;
  updateDeck?: Maybe<Deck>;
  upsertCardInDeck?: Maybe<Deck>;
  removeCardsFromDeck?: Maybe<Deck>;
  deleteDeck?: Maybe<Deck>;
  createCard?: Maybe<Card>;
  editCard?: Maybe<Card>;
  deleteCard?: Maybe<Card>;
};

export type MutationAuthenticateArgs = {
  code: Scalars["ID"];
};

export type MutationInitUserArgs = {
  id: Scalars["ID"];
};

export type MutationEditUserArgs = {
  id: Scalars["ID"];
  input: UserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

export type MutationAddDeckArgs = {
  input: DeckInput;
};

export type MutationUpdateDeckArgs = {
  id: Scalars["ID"];
  input: DeckInput;
};

export type MutationUpsertCardInDeckArgs = {
  id: Scalars["ID"];
  card: CardInput;
};

export type MutationRemoveCardsFromDeckArgs = {
  id: Scalars["ID"];
  cards?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type MutationDeleteDeckArgs = {
  id: Scalars["ID"];
};

export type MutationCreateCardArgs = {
  input: CardInput;
};

export type MutationEditCardArgs = {
  id: Scalars["ID"];
  input: CardInput;
};

export type MutationDeleteCardArgs = {
  id: Scalars["ID"];
};

export type Query = {
  users?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
  languages?: Maybe<Array<Maybe<Language>>>;
  language?: Maybe<Language>;
  decks?: Maybe<Array<Maybe<Deck>>>;
  deck?: Maybe<Deck>;
  currentUserID: Scalars["ID"];
};

export type QueryUsersArgs = {
  filter?: Maybe<UserFilterInput>;
};

export type QueryUserArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type QueryLanguageArgs = {
  languageCode: Scalars["String"];
};

export type QueryDecksArgs = {
  filter?: Maybe<DeckFilterInput>;
};

export type QueryDeckArgs = {
  id: Scalars["ID"];
};

export type Review = {
  id: Scalars["ID"];
  date: Scalars["Date"];
  card: Card;
};

export type ReviewFilterInput = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  deck?: Maybe<Scalars["ID"]>;
  maxTime?: Maybe<Scalars["Date"]>;
};

export type SortDirection = "asc" | "desc";

export type User = {
  sub?: Maybe<Scalars["ID"]>;
  id: Scalars["ID"];
  email?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  username: Scalars["String"];
  picture: Scalars["String"];
  gender: Scalars["String"];
  locale?: Maybe<Scalars["String"]>;
  identities?: Maybe<Array<Maybe<Identity>>>;
  languages?: Maybe<Array<Maybe<Language>>>;
  ownedDecks?: Maybe<Array<Maybe<Deck>>>;
  subscribedDecks?: Maybe<Array<Maybe<Deck>>>;
  reviewQueue?: Maybe<Array<Maybe<Review>>>;
  reviewQueueLength?: Maybe<Scalars["Int"]>;
};

export type UserReviewQueueArgs = {
  filter?: Maybe<ReviewFilterInput>;
};

export type UserReviewQueueLengthArgs = {
  filter?: Maybe<ReviewFilterInput>;
};

export type UserFilterInput = {
  limit?: Maybe<Scalars["Int"]>;
};

export type UserInput = {
  name?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  oldPassword?: Maybe<Scalars["String"]>;
};
export type UpdateDeckMutationVariables = {
  id: Scalars["ID"];
  deckInput: DeckInput;
};

export type UpdateDeckMutation = { __typename?: "Mutation" } & {
  updateDeck: Maybe<{ __typename?: "Deck" } & Pick<Deck, "id" | "name">>;
};

export type UpsertCardMutationVariables = {
  deckID: Scalars["ID"];
  card: CardInput;
  cardFilter?: Maybe<CardFilterInput>;
};

export type UpsertCardMutation = { __typename?: "Mutation" } & {
  upsertCardInDeck: Maybe<
    { __typename?: "Deck" } & Pick<Deck, "id"> & {
        cards: Maybe<
          Array<
            Maybe<
              { __typename?: "Card" } & Pick<
                Card,
                "id" | "meaning" | "pronunciation" | "translation"
              >
            >
          >
        >;
      }
  >;
};

export type LoginMutationVariables = {
  authorizationCode: Scalars["ID"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  authenticate: Maybe<
    { __typename?: "AuthResult" } & Pick<
      AuthResult,
      "accessToken" | "expiresIn"
    >
  >;
};

export type UpdateProfileMutationVariables = {
  id: Scalars["ID"];
  profile: UserInput;
};

export type UpdateProfileMutation = { __typename?: "Mutation" } & {
  editUser: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "username" | "email" | "name">
  >;
};

export type GetCurrentUserIdQueryVariables = {};

export type GetCurrentUserIdQuery = { __typename?: "Query" } & Pick<
  Query,
  "currentUserID"
>;

export type GetProfileQueryVariables = {
  id?: Maybe<Scalars["ID"]>;
};

export type GetProfileQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<
      User,
      | "sub"
      | "id"
      | "username"
      | "email"
      | "name"
      | "picture"
      | "reviewQueueLength"
    > & {
        identities: Maybe<
          Array<
            Maybe<
              { __typename?: "Identity" } & Pick<
                Identity,
                "isSocial" | "provider"
              >
            >
          >
        >;
      }
  >;
};

export type GetUserLanguagesQueryVariables = {
  id: Scalars["ID"];
};

export type GetUserLanguagesQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        languages: Maybe<
          Array<
            Maybe<
              { __typename?: "Language" } & Pick<
                Language,
                "id" | "languageCode" | "name" | "nativeName"
              >
            >
          >
        >;
      }
  >;
};

export type GetCardsQueryVariables = {
  deckID: Scalars["ID"];
  filter?: Maybe<CardFilterInput>;
};

export type GetCardsQuery = { __typename?: "Query" } & {
  deck: Maybe<
    { __typename?: "Deck" } & Pick<Deck, "id" | "cardCount"> & {
        cards: Maybe<
          Array<
            Maybe<
              { __typename?: "Card" } & Pick<
                Card,
                "id" | "meaning" | "pronunciation" | "translation"
              >
            >
          >
        >;
      }
  >;
};

export type GetDeckDetailsQueryVariables = {
  deckID: Scalars["ID"];
};

export type GetDeckDetailsQuery = { __typename?: "Query" } & {
  deck: Maybe<{ __typename?: "Deck" } & Pick<Deck, "id" | "name">>;
};

export type GetDecksShallowQueryVariables = {
  id: Scalars["ID"];
};

export type GetDecksShallowQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        ownedDecks: Maybe<
          Array<Maybe<{ __typename?: "Deck" } & Pick<Deck, "id" | "cardCount">>>
        >;
        subscribedDecks: Maybe<
          Array<Maybe<{ __typename?: "Deck" } & Pick<Deck, "id" | "cardCount">>>
        >;
      }
  >;
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";

export const UpdateDeckDocument = gql`
  mutation UpdateDeck($id: ID!, $deckInput: DeckInput!) {
    updateDeck(id: $id, input: $deckInput) {
      id
      name
    }
  }
`;

export class UpdateDeckComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpdateDeckMutation, UpdateDeckMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateDeckMutation, UpdateDeckMutationVariables>
        mutation={UpdateDeckDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateDeckProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateDeckMutation, UpdateDeckMutationVariables>
> &
  TChildProps;
export type UpdateDeckMutationFn = ReactApollo.MutationFn<
  UpdateDeckMutation,
  UpdateDeckMutationVariables
>;
export function withUpdateDeck<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateDeckMutation,
        UpdateDeckMutationVariables,
        UpdateDeckProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateDeckMutation,
    UpdateDeckMutationVariables,
    UpdateDeckProps<TChildProps>
  >(UpdateDeckDocument, operationOptions);
}
export const UpsertCardDocument = gql`
  mutation UpsertCard(
    $deckID: ID!
    $card: CardInput!
    $cardFilter: CardFilterInput
  ) {
    upsertCardInDeck(id: $deckID, card: $card) {
      id
      cards(filter: $cardFilter) {
        id
        meaning
        pronunciation
        translation
      }
    }
  }
`;

export class UpsertCardComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpsertCardMutation, UpsertCardMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpsertCardMutation, UpsertCardMutationVariables>
        mutation={UpsertCardDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpsertCardProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpsertCardMutation, UpsertCardMutationVariables>
> &
  TChildProps;
export type UpsertCardMutationFn = ReactApollo.MutationFn<
  UpsertCardMutation,
  UpsertCardMutationVariables
>;
export function withUpsertCard<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpsertCardMutation,
        UpsertCardMutationVariables,
        UpsertCardProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    UpsertCardMutation,
    UpsertCardMutationVariables,
    UpsertCardProps<TChildProps>
  >(UpsertCardDocument, operationOptions);
}
export const LoginDocument = gql`
  mutation Login($authorizationCode: ID!) {
    authenticate(code: $authorizationCode) {
      accessToken
      expiresIn
    }
  }
`;

export class LoginComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LoginMutation, LoginMutationVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LoginMutation, LoginMutationVariables>
        mutation={LoginDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LoginProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginMutationVariables>
> &
  TChildProps;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LoginMutation,
        LoginMutationVariables,
        LoginProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, operationOptions);
}
export const UpdateProfileDocument = gql`
  mutation UpdateProfile($id: ID!, $profile: UserInput!) {
    editUser(id: $id, input: $profile) {
      id
      username
      email
      name
    }
  }
`;

export class UpdateProfileComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      UpdateProfileMutation,
      UpdateProfileMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        UpdateProfileMutation,
        UpdateProfileMutationVariables
      >
        mutation={UpdateProfileDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateProfileProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateProfileMutation, UpdateProfileMutationVariables>
> &
  TChildProps;
export type UpdateProfileMutationFn = ReactApollo.MutationFn<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
export function withUpdateProfile<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateProfileMutation,
        UpdateProfileMutationVariables,
        UpdateProfileProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateProfileMutation,
    UpdateProfileMutationVariables,
    UpdateProfileProps<TChildProps>
  >(UpdateProfileDocument, operationOptions);
}
export const GetCurrentUserIdDocument = gql`
  query GetCurrentUserID {
    currentUserID @client
  }
`;

export class GetCurrentUserIdComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      GetCurrentUserIdQuery,
      GetCurrentUserIdQueryVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetCurrentUserIdQuery, GetCurrentUserIdQueryVariables>
        query={GetCurrentUserIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetCurrentUserIdProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetCurrentUserIdQuery, GetCurrentUserIdQueryVariables>
> &
  TChildProps;
export function withGetCurrentUserId<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetCurrentUserIdQuery,
        GetCurrentUserIdQueryVariables,
        GetCurrentUserIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    GetCurrentUserIdQuery,
    GetCurrentUserIdQueryVariables,
    GetCurrentUserIdProps<TChildProps>
  >(GetCurrentUserIdDocument, operationOptions);
}
export const GetProfileDocument = gql`
  query GetProfile($id: ID) {
    user(id: $id) {
      sub
      id
      username
      email
      name
      picture
      reviewQueueLength
      identities {
        isSocial
        provider
      }
    }
  }
`;

export class GetProfileComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetProfileQuery, GetProfileQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetProfileQuery, GetProfileQueryVariables>
        query={GetProfileDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetProfileProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetProfileQuery, GetProfileQueryVariables>
> &
  TChildProps;
export function withGetProfile<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetProfileQuery,
        GetProfileQueryVariables,
        GetProfileProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    GetProfileQuery,
    GetProfileQueryVariables,
    GetProfileProps<TChildProps>
  >(GetProfileDocument, operationOptions);
}
export const GetUserLanguagesDocument = gql`
  query GetUserLanguages($id: ID!) {
    user(id: $id) {
      id
      languages {
        id
        languageCode
        name
        nativeName
      }
    }
  }
`;

export class GetUserLanguagesComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      GetUserLanguagesQuery,
      GetUserLanguagesQueryVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetUserLanguagesQuery, GetUserLanguagesQueryVariables>
        query={GetUserLanguagesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetUserLanguagesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetUserLanguagesQuery, GetUserLanguagesQueryVariables>
> &
  TChildProps;
export function withGetUserLanguages<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetUserLanguagesQuery,
        GetUserLanguagesQueryVariables,
        GetUserLanguagesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    GetUserLanguagesQuery,
    GetUserLanguagesQueryVariables,
    GetUserLanguagesProps<TChildProps>
  >(GetUserLanguagesDocument, operationOptions);
}
export const GetCardsDocument = gql`
  query GetCards($deckID: ID!, $filter: CardFilterInput) {
    deck(id: $deckID) {
      id
      cardCount
      cards(filter: $filter) {
        id
        meaning
        pronunciation
        translation
      }
    }
  }
`;

export class GetCardsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetCardsQuery, GetCardsQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetCardsQuery, GetCardsQueryVariables>
        query={GetCardsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetCardsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetCardsQuery, GetCardsQueryVariables>
> &
  TChildProps;
export function withGetCards<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetCardsQuery,
        GetCardsQueryVariables,
        GetCardsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    GetCardsQuery,
    GetCardsQueryVariables,
    GetCardsProps<TChildProps>
  >(GetCardsDocument, operationOptions);
}
export const GetDeckDetailsDocument = gql`
  query GetDeckDetails($deckID: ID!) {
    deck(id: $deckID) {
      id
      name
    }
  }
`;

export class GetDeckDetailsComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetDeckDetailsQuery, GetDeckDetailsQueryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetDeckDetailsQuery, GetDeckDetailsQueryVariables>
        query={GetDeckDetailsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetDeckDetailsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetDeckDetailsQuery, GetDeckDetailsQueryVariables>
> &
  TChildProps;
export function withGetDeckDetails<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetDeckDetailsQuery,
        GetDeckDetailsQueryVariables,
        GetDeckDetailsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    GetDeckDetailsQuery,
    GetDeckDetailsQueryVariables,
    GetDeckDetailsProps<TChildProps>
  >(GetDeckDetailsDocument, operationOptions);
}
export const GetDecksShallowDocument = gql`
  query GetDecksShallow($id: ID!) {
    user(id: $id) {
      id
      ownedDecks {
        id
        cardCount
      }
      subscribedDecks {
        id
        cardCount
      }
    }
  }
`;

export class GetDecksShallowComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetDecksShallowQuery, GetDecksShallowQueryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetDecksShallowQuery, GetDecksShallowQueryVariables>
        query={GetDecksShallowDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetDecksShallowProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetDecksShallowQuery, GetDecksShallowQueryVariables>
> &
  TChildProps;
export function withGetDecksShallow<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetDecksShallowQuery,
        GetDecksShallowQueryVariables,
        GetDecksShallowProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    GetDecksShallowQuery,
    GetDecksShallowQueryVariables,
    GetDecksShallowProps<TChildProps>
  >(GetDecksShallowDocument, operationOptions);
}
