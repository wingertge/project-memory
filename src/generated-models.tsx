export type Maybe<T> = T | null;

export interface UserFilterInput {
  limit?: Maybe<number>;
}

export interface DeckFilterInput {
  limit?: Maybe<number>;

  search?: Maybe<string>;

  owner?: Maybe<string>;

  language?: Maybe<string>;

  cardContained?: Maybe<string>;
}

export interface CardFilterInput {
  limit?: Maybe<number>;

  creator?: Maybe<string>;

  language?: Maybe<string>;

  containedInDeck?: Maybe<string>;
}

export interface UserInput {
  name?: Maybe<string>;

  username?: Maybe<string>;

  email?: Maybe<string>;

  password?: Maybe<string>;

  oldPassword?: Maybe<string>;
}

export interface DeckInput {
  name?: Maybe<string>;

  owner?: Maybe<string>;

  language: string;

  cards?: Maybe<(Maybe<CardInput>)[]>;
}

export interface CardInput {
  translation?: Maybe<string>;

  meaning?: Maybe<string>;

  pronunciation?: Maybe<string>;

  audioUrl?: Maybe<string>;

  language?: Maybe<string>;

  containingDecks?: Maybe<(Maybe<string>)[]>;
}

// ====================================================
// Documents
// ====================================================

export namespace Login {
  export type Variables = {
    authorizationCode: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    authenticate: Maybe<Authenticate>;
  };

  export type Authenticate = {
    __typename?: "AuthResult";

    accessToken: string;

    expiresIn: number;
  };
}

export namespace UpdateProfile {
  export type Variables = {
    sub: string;
    profile: UserInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    editUser: Maybe<EditUser>;
  };

  export type EditUser = {
    __typename?: "User";

    sub: string;
  };
}

export namespace GetProfile {
  export type Variables = {
    sub?: Maybe<string>;
  };

  export type Query = {
    __typename?: "Query";

    user: Maybe<User>;
  };

  export type User = {
    __typename?: "User";

    sub: string;

    username: string;

    email: string;

    name: string;

    picture: string;

    identities: Maybe<(Maybe<Identities>)[]>;

    languages: Maybe<(Maybe<Languages>)[]>;
  };

  export type Identities = {
    __typename?: "Identity";

    isSocial: boolean;

    provider: string;
  };

  export type Languages = {
    __typename?: "Language";

    id: string;

    languageCode: string;

    name: string;

    nativeName: string;
  };
}

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";

// ====================================================
// Components
// ====================================================

export namespace Login {
  export const Document = gql`
    mutation Login($authorizationCode: ID!) {
      authenticate(code: $authorizationCode) {
        accessToken
        expiresIn
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace UpdateProfile {
  export const Document = gql`
    mutation UpdateProfile($sub: ID!, $profile: UserInput!) {
      editUser(sub: $sub, input: $profile) {
        sub
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace GetProfile {
  export const Document = gql`
    query GetProfile($sub: ID) {
      user(sub: $sub) {
        sub
        username
        email
        name
        picture
        identities {
          isSocial
          provider
        }
        languages {
          id
          languageCode
          name
          nativeName
        }
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
