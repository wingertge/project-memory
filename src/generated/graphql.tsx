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
  deck?: Maybe<Deck>;
};

export type CardFilterInput = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  sortDirection?: Maybe<SortDirection>;
  sortBy?: Maybe<CardSortingOptions>;
};

export type CardInput = {
  translation?: Maybe<Scalars["String"]>;
  meaning?: Maybe<Scalars["String"]>;
  pronunciation?: Maybe<Scalars["String"]>;
  audioUrl?: Maybe<Scalars["String"]>;
  deck?: Maybe<Scalars["ID"]>;
};

export type CardSortingOptions = "meaning" | "pronunciation" | "translation";

export type Deck = {
  id: Scalars["ID"];
  name: Scalars["String"];
  owner: User;
  language: Language;
  nativeLanguage: Language;
  cards?: Maybe<Array<Maybe<Card>>>;
  cardCount: Scalars["Int"];
  subscribers?: Maybe<Array<Maybe<User>>>;
  subscriberCount: Scalars["Int"];
  rating: Scalars["Int"];
  isLikedBy: Scalars["Boolean"];
};

export type DeckCardsArgs = {
  filter?: Maybe<CardFilterInput>;
};

export type DeckSubscribersArgs = {
  filter?: Maybe<SubscriberFilterInput>;
};

export type DeckIsLikedByArgs = {
  userID: Scalars["ID"];
};

export type DeckFilterInput = {
  limit?: Maybe<Scalars["Int"]>;
  sortBy?: Maybe<DeckSortBy>;
  sortDirection?: Maybe<SortDirection>;
  search?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["ID"]>;
  languages?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  nativeLanguage?: Maybe<Scalars["ID"]>;
  cardContained?: Maybe<Scalars["ID"]>;
};

export type DeckInput = {
  name?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["String"]>;
  language?: Maybe<Scalars["ID"]>;
  nativeLanguage?: Maybe<Scalars["ID"]>;
  cards?: Maybe<Array<Maybe<CardInput>>>;
};

export type DeckSortBy = "name" | "cardCount" | "rating" | "subscribers";

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
  addLanguageToUser?: Maybe<User>;
  removeLanguageFromUser?: Maybe<User>;
  addDeck?: Maybe<User>;
  updateDeck?: Maybe<Deck>;
  deleteDeck?: Maybe<Deck>;
  changeSubscriptionStatus?: Maybe<User>;
  changeLikeStatus?: Maybe<Deck>;
  createCard?: Maybe<Deck>;
  editCard?: Maybe<Card>;
  deleteCards?: Maybe<Deck>;
  submitReview?: Maybe<Review>;
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

export type MutationAddLanguageToUserArgs = {
  id: Scalars["ID"];
  input: Scalars["ID"];
};

export type MutationRemoveLanguageFromUserArgs = {
  id: Scalars["ID"];
  language: Scalars["ID"];
};

export type MutationAddDeckArgs = {
  input: DeckInput;
};

export type MutationUpdateDeckArgs = {
  id: Scalars["ID"];
  input: DeckInput;
};

export type MutationDeleteDeckArgs = {
  id: Scalars["ID"];
};

export type MutationChangeSubscriptionStatusArgs = {
  id: Scalars["ID"];
  deckID: Scalars["ID"];
  value: Scalars["Boolean"];
};

export type MutationChangeLikeStatusArgs = {
  id: Scalars["ID"];
  userID: Scalars["ID"];
  value?: Maybe<Scalars["Boolean"]>;
};

export type MutationCreateCardArgs = {
  input: CardInput;
};

export type MutationEditCardArgs = {
  id: Scalars["ID"];
  input: CardInput;
};

export type MutationDeleteCardsArgs = {
  deck: Scalars["ID"];
  ids: Array<Maybe<Scalars["ID"]>>;
};

export type MutationSubmitReviewArgs = {
  id: Scalars["ID"];
  correct: Scalars["Boolean"];
  field: ReviewFields;
};

export type Query = {
  users?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
  languages?: Maybe<Array<Maybe<Language>>>;
  language?: Maybe<Language>;
  decks?: Maybe<Array<Maybe<Deck>>>;
  deck?: Maybe<Deck>;
  review?: Maybe<Review>;
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

export type QueryReviewArgs = {
  id: Scalars["ID"];
};

export type Review = {
  id: Scalars["ID"];
  nextReviewAt?: Maybe<Scalars["Date"]>;
  box: Scalars["Int"];
  card: Card;
  user: User;
  reviewedFields?: Maybe<Array<Maybe<ReviewFields>>>;
  correct?: Maybe<Scalars["Boolean"]>;
};

export type ReviewFields = "meaning" | "pronunciation" | "translation";

export type ReviewFilterInput = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  deck?: Maybe<Scalars["ID"]>;
  toBeReviewedBy?: Maybe<Scalars["Date"]>;
  sortBy?: Maybe<ReviewSortOptions>;
  sortDirection?: Maybe<SortDirection>;
  boxes?: Maybe<Array<Maybe<Scalars["Int"]>>>;
};

export type ReviewSortOptions = "reviewDate" | "box";

export type SortDirection = "asc" | "desc";

export type SubscriberFilterInput = {
  limit?: Maybe<Scalars["Int"]>;
};

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
  isSocial: Scalars["Boolean"];
  nativeLanguage?: Maybe<Language>;
  languages?: Maybe<Array<Maybe<Language>>>;
  ownedDecks?: Maybe<Array<Maybe<Deck>>>;
  subscribedDecks?: Maybe<Array<Maybe<Deck>>>;
  reviewQueue?: Maybe<Array<Maybe<Review>>>;
  reviewsCount?: Maybe<Scalars["Int"]>;
  nextReview?: Maybe<Review>;
  lessonQueue?: Maybe<Array<Maybe<Review>>>;
  lessonsCount?: Maybe<Scalars["Int"]>;
  introStep?: Maybe<Scalars["Int"]>;
};

export type UserReviewQueueArgs = {
  filter?: Maybe<ReviewFilterInput>;
};

export type UserReviewsCountArgs = {
  filter?: Maybe<ReviewFilterInput>;
};

export type UserLessonQueueArgs = {
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
  introStep?: Maybe<Scalars["Int"]>;
  nativeLanguage?: Maybe<Scalars["ID"]>;
};
export type LanguageFieldsFragment = { __typename?: "Language" } & Pick<
  Language,
  "id" | "languageCode" | "name" | "nativeName"
>;

export type AddCardMutationVariables = {
  card: CardInput;
  cardFilter?: Maybe<CardFilterInput>;
};

export type AddCardMutation = { __typename?: "Mutation" } & {
  createCard: Maybe<
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

export type AddDeckMutationVariables = {
  input: DeckInput;
};

export type AddDeckMutation = { __typename?: "Mutation" } & {
  addDeck: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        ownedDecks: Maybe<
          Array<
            Maybe<
              { __typename?: "Deck" } & Pick<
                Deck,
                "id" | "name" | "cardCount" | "subscriberCount"
              > & {
                  language: {
                    __typename?: "Language";
                  } & LanguageFieldsFragment;
                  nativeLanguage: {
                    __typename?: "Language";
                  } & LanguageFieldsFragment;
                }
            >
          >
        >;
      }
  >;
};

export type DeleteCardsMutationVariables = {
  deckId: Scalars["ID"];
  cardIds: Array<Maybe<Scalars["ID"]>>;
  cardFilter?: Maybe<CardFilterInput>;
};

export type DeleteCardsMutation = { __typename?: "Mutation" } & {
  deleteCards: Maybe<
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

export type SubmitReviewMutationVariables = {
  reviewId: Scalars["ID"];
  field: ReviewFields;
  correct: Scalars["Boolean"];
};

export type SubmitReviewMutation = { __typename?: "Mutation" } & {
  submitReview: Maybe<
    { __typename?: "Review" } & Pick<
      Review,
      "id" | "box" | "nextReviewAt" | "reviewedFields" | "correct"
    >
  >;
};

export type UpdateCardMutationVariables = {
  id: Scalars["ID"];
  card: CardInput;
};

export type UpdateCardMutation = { __typename?: "Mutation" } & {
  editCard: Maybe<
    { __typename?: "Card" } & Pick<
      Card,
      "id" | "meaning" | "pronunciation" | "translation" | "audioUrl"
    >
  >;
};

export type UpdateDeckMutationVariables = {
  id: Scalars["ID"];
  deckInput: DeckInput;
};

export type UpdateDeckMutation = { __typename?: "Mutation" } & {
  updateDeck: Maybe<{ __typename?: "Deck" } & Pick<Deck, "id" | "name">>;
};

export type AddLanguageToUserMutationVariables = {
  userId: Scalars["ID"];
  languageId: Scalars["ID"];
};

export type AddLanguageToUserMutation = { __typename?: "Mutation" } & {
  addLanguageToUser: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        languages: Maybe<
          Array<
            Maybe<
              { __typename?: "Language" } & Pick<
                Language,
                "id" | "name" | "nativeName" | "languageCode"
              >
            >
          >
        >;
      }
  >;
};

export type ChangeLikeStatusMutationVariables = {
  userId: Scalars["ID"];
  deckId: Scalars["ID"];
  value?: Maybe<Scalars["Boolean"]>;
};

export type ChangeLikeStatusMutation = { __typename?: "Mutation" } & {
  changeLikeStatus: Maybe<
    { __typename?: "Deck" } & Pick<Deck, "id" | "rating" | "isLikedBy">
  >;
};

export type ChangeSubscriptionStatusMutationVariables = {
  userId: Scalars["ID"];
  deckId: Scalars["ID"];
  value: Scalars["Boolean"];
};

export type ChangeSubscriptionStatusMutation = { __typename?: "Mutation" } & {
  changeSubscriptionStatus: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        subscribedDecks: Maybe<
          Array<
            Maybe<
              { __typename?: "Deck" } & Pick<
                Deck,
                "id" | "name" | "cardCount"
              > & {
                  owner: { __typename?: "User" } & Pick<
                    User,
                    "id" | "username"
                  >;
                }
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

export type RemoveLanguageFromUserMutationVariables = {
  userId: Scalars["ID"];
  languageId: Scalars["ID"];
};

export type RemoveLanguageFromUserMutation = { __typename?: "Mutation" } & {
  removeLanguageFromUser: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        languages: Maybe<
          Array<
            Maybe<
              { __typename?: "Language" } & Pick<
                Language,
                "id" | "name" | "nativeName" | "languageCode"
              >
            >
          >
        >;
      }
  >;
};

export type UpdateProfileMutationVariables = {
  id: Scalars["ID"];
  profile: UserInput;
};

export type UpdateProfileMutation = { __typename?: "Mutation" } & {
  editUser: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "username" | "email" | "name" | "introStep"
    > & {
        nativeLanguage: Maybe<
          { __typename?: "Language" } & Pick<
            Language,
            "id" | "name" | "nativeName" | "languageCode"
          >
        >;
      }
  >;
};

export type CurrentUserIdQueryVariables = {};

export type CurrentUserIdQuery = { __typename?: "Query" } & Pick<
  Query,
  "currentUserID"
>;

export type ProfileQueryVariables = {
  id?: Maybe<Scalars["ID"]>;
};

export type ProfileQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<
      User,
      | "id"
      | "username"
      | "email"
      | "name"
      | "picture"
      | "introStep"
      | "isSocial"
    >
  >;
};

export type GlobalDecksQueryVariables = {
  filter?: Maybe<DeckFilterInput>;
  userId: Scalars["ID"];
};

export type GlobalDecksQuery = { __typename?: "Query" } & {
  decks: Maybe<
    Array<
      Maybe<
        { __typename?: "Deck" } & Pick<
          Deck,
          "id" | "name" | "cardCount" | "rating" | "isLikedBy"
        > & {
            language: { __typename?: "Language" } & LanguageFieldsFragment;
            owner: { __typename?: "User" } & Pick<User, "id" | "username">;
          }
      >
    >
  >;
};

export type LanguagesQueryVariables = {};

export type LanguagesQuery = { __typename?: "Query" } & {
  languages: Maybe<
    Array<Maybe<{ __typename?: "Language" } & LanguageFieldsFragment>>
  >;
};

export type LessonsQueryVariables = {
  userId: Scalars["ID"];
  filter?: Maybe<ReviewFilterInput>;
};

export type LessonsQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        lessonQueue: Maybe<
          Array<
            Maybe<
              { __typename?: "Review" } & Pick<
                Review,
                "id" | "reviewedFields"
              > & {
                  card: { __typename?: "Card" } & Pick<
                    Card,
                    "id" | "meaning" | "pronunciation" | "translation"
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type NextReviewQueryVariables = {
  userId: Scalars["ID"];
};

export type NextReviewQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        nextReview: Maybe<
          { __typename?: "Review" } & Pick<Review, "id" | "reviewedFields"> & {
              card: { __typename?: "Card" } & Pick<
                Card,
                "id" | "meaning" | "pronunciation" | "translation"
              >;
            }
        >;
      }
  >;
};

export type ReviewsQueryVariables = {
  userId: Scalars["ID"];
  filter?: Maybe<ReviewFilterInput>;
};

export type ReviewsQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        reviewQueue: Maybe<
          Array<
            Maybe<
              { __typename?: "Review" } & Pick<
                Review,
                "id" | "box" | "correct" | "reviewedFields"
              > & {
                  card: { __typename?: "Card" } & Pick<
                    Card,
                    "id" | "meaning" | "pronunciation" | "translation"
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type CardsQueryVariables = {
  deckID: Scalars["ID"];
  filter?: Maybe<CardFilterInput>;
};

export type CardsQuery = { __typename?: "Query" } & {
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

export type DeckDetailsQueryVariables = {
  deckID: Scalars["ID"];
};

export type DeckDetailsQuery = { __typename?: "Query" } & {
  deck: Maybe<{ __typename?: "Deck" } & Pick<Deck, "id" | "name">>;
};

export type LessonsCountQueryVariables = {
  userId: Scalars["ID"];
};

export type LessonsCountQuery = { __typename?: "Query" } & {
  user: Maybe<{ __typename?: "User" } & Pick<User, "id" | "lessonsCount">>;
};

export type ReviewsCountQueryVariables = {
  userId: Scalars["ID"];
  filter: ReviewFilterInput;
};

export type ReviewsCountQuery = { __typename?: "Query" } & {
  user: Maybe<{ __typename?: "User" } & Pick<User, "id" | "reviewsCount">>;
};

export type ShallowDecksQueryVariables = {
  id: Scalars["ID"];
};

export type ShallowDecksQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        ownedDecks: Maybe<
          Array<
            Maybe<
              { __typename?: "Deck" } & Pick<
                Deck,
                "id" | "name" | "cardCount" | "rating" | "isLikedBy"
              > & {
                  language: {
                    __typename?: "Language";
                  } & LanguageFieldsFragment;
                }
            >
          >
        >;
        subscribedDecks: Maybe<
          Array<
            Maybe<
              { __typename?: "Deck" } & Pick<
                Deck,
                "id" | "name" | "cardCount" | "rating" | "isLikedBy"
              > & {
                  language: {
                    __typename?: "Language";
                  } & LanguageFieldsFragment;
                }
            >
          >
        >;
      }
  >;
};

export type UserLanguagesQueryVariables = {
  userId: Scalars["ID"];
};

export type UserLanguagesQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        languages: Maybe<
          Array<Maybe<{ __typename?: "Language" } & LanguageFieldsFragment>>
        >;
        nativeLanguage: Maybe<
          { __typename?: "Language" } & LanguageFieldsFragment
        >;
      }
  >;
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export const languageFieldsFragmentDoc = gql`
  fragment languageFields on Language {
    id
    languageCode
    name
    nativeName
  }
`;
export const AddCardDocument = gql`
  mutation AddCard($card: CardInput!, $cardFilter: CardFilterInput) {
    createCard(input: $card) {
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

export class AddCardComponent extends React.Component<
  Partial<ReactApollo.MutationProps<AddCardMutation, AddCardMutationVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<AddCardMutation, AddCardMutationVariables>
        mutation={AddCardDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AddCardProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<AddCardMutation, AddCardMutationVariables>
> &
  TChildProps;
export type AddCardMutationFn = ReactApollo.MutationFn<
  AddCardMutation,
  AddCardMutationVariables
>;
export function withAddCard<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AddCardMutation,
        AddCardMutationVariables,
        AddCardProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    AddCardMutation,
    AddCardMutationVariables,
    AddCardProps<TChildProps>
  >(AddCardDocument, operationOptions);
}
export const AddDeckDocument = gql`
  mutation AddDeck($input: DeckInput!) {
    addDeck(input: $input) {
      id
      ownedDecks {
        id
        name
        language {
          ...languageFields
        }
        nativeLanguage {
          ...languageFields
        }
        cardCount
        subscriberCount
      }
    }
  }
  ${languageFieldsFragmentDoc}
`;

export class AddDeckComponent extends React.Component<
  Partial<ReactApollo.MutationProps<AddDeckMutation, AddDeckMutationVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<AddDeckMutation, AddDeckMutationVariables>
        mutation={AddDeckDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AddDeckProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<AddDeckMutation, AddDeckMutationVariables>
> &
  TChildProps;
export type AddDeckMutationFn = ReactApollo.MutationFn<
  AddDeckMutation,
  AddDeckMutationVariables
>;
export function withAddDeck<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AddDeckMutation,
        AddDeckMutationVariables,
        AddDeckProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    AddDeckMutation,
    AddDeckMutationVariables,
    AddDeckProps<TChildProps>
  >(AddDeckDocument, operationOptions);
}
export const DeleteCardsDocument = gql`
  mutation DeleteCards(
    $deckId: ID!
    $cardIds: [ID]!
    $cardFilter: CardFilterInput
  ) {
    deleteCards(deck: $deckId, ids: $cardIds) {
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

export class DeleteCardsComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeleteCardsMutation, DeleteCardsMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteCardsMutation, DeleteCardsMutationVariables>
        mutation={DeleteCardsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteCardsProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteCardsMutation, DeleteCardsMutationVariables>
> &
  TChildProps;
export type DeleteCardsMutationFn = ReactApollo.MutationFn<
  DeleteCardsMutation,
  DeleteCardsMutationVariables
>;
export function withDeleteCards<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteCardsMutation,
        DeleteCardsMutationVariables,
        DeleteCardsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteCardsMutation,
    DeleteCardsMutationVariables,
    DeleteCardsProps<TChildProps>
  >(DeleteCardsDocument, operationOptions);
}
export const SubmitReviewDocument = gql`
  mutation SubmitReview(
    $reviewId: ID!
    $field: ReviewFields!
    $correct: Boolean!
  ) {
    submitReview(id: $reviewId, field: $field, correct: $correct) {
      id
      box
      nextReviewAt
      reviewedFields
      correct
    }
  }
`;

export class SubmitReviewComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      SubmitReviewMutation,
      SubmitReviewMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<SubmitReviewMutation, SubmitReviewMutationVariables>
        mutation={SubmitReviewDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SubmitReviewProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<SubmitReviewMutation, SubmitReviewMutationVariables>
> &
  TChildProps;
export type SubmitReviewMutationFn = ReactApollo.MutationFn<
  SubmitReviewMutation,
  SubmitReviewMutationVariables
>;
export function withSubmitReview<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SubmitReviewMutation,
        SubmitReviewMutationVariables,
        SubmitReviewProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    SubmitReviewMutation,
    SubmitReviewMutationVariables,
    SubmitReviewProps<TChildProps>
  >(SubmitReviewDocument, operationOptions);
}
export const UpdateCardDocument = gql`
  mutation UpdateCard($id: ID!, $card: CardInput!) {
    editCard(id: $id, input: $card) {
      id
      meaning
      pronunciation
      translation
      audioUrl
    }
  }
`;

export class UpdateCardComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpdateCardMutation, UpdateCardMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateCardMutation, UpdateCardMutationVariables>
        mutation={UpdateCardDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateCardProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateCardMutation, UpdateCardMutationVariables>
> &
  TChildProps;
export type UpdateCardMutationFn = ReactApollo.MutationFn<
  UpdateCardMutation,
  UpdateCardMutationVariables
>;
export function withUpdateCard<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateCardMutation,
        UpdateCardMutationVariables,
        UpdateCardProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateCardMutation,
    UpdateCardMutationVariables,
    UpdateCardProps<TChildProps>
  >(UpdateCardDocument, operationOptions);
}
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
export const AddLanguageToUserDocument = gql`
  mutation AddLanguageToUser($userId: ID!, $languageId: ID!) {
    addLanguageToUser(id: $userId, input: $languageId) {
      id
      languages {
        id
        name
        nativeName
        languageCode
      }
    }
  }
`;

export class AddLanguageToUserComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      AddLanguageToUserMutation,
      AddLanguageToUserMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        AddLanguageToUserMutation,
        AddLanguageToUserMutationVariables
      >
        mutation={AddLanguageToUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AddLanguageToUserProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    AddLanguageToUserMutation,
    AddLanguageToUserMutationVariables
  >
> &
  TChildProps;
export type AddLanguageToUserMutationFn = ReactApollo.MutationFn<
  AddLanguageToUserMutation,
  AddLanguageToUserMutationVariables
>;
export function withAddLanguageToUser<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AddLanguageToUserMutation,
        AddLanguageToUserMutationVariables,
        AddLanguageToUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    AddLanguageToUserMutation,
    AddLanguageToUserMutationVariables,
    AddLanguageToUserProps<TChildProps>
  >(AddLanguageToUserDocument, operationOptions);
}
export const ChangeLikeStatusDocument = gql`
  mutation ChangeLikeStatus($userId: ID!, $deckId: ID!, $value: Boolean) {
    changeLikeStatus(id: $deckId, userID: $userId, value: $value) {
      id
      rating
      isLikedBy(userID: $userId)
    }
  }
`;

export class ChangeLikeStatusComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      ChangeLikeStatusMutation,
      ChangeLikeStatusMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        ChangeLikeStatusMutation,
        ChangeLikeStatusMutationVariables
      >
        mutation={ChangeLikeStatusDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ChangeLikeStatusProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    ChangeLikeStatusMutation,
    ChangeLikeStatusMutationVariables
  >
> &
  TChildProps;
export type ChangeLikeStatusMutationFn = ReactApollo.MutationFn<
  ChangeLikeStatusMutation,
  ChangeLikeStatusMutationVariables
>;
export function withChangeLikeStatus<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ChangeLikeStatusMutation,
        ChangeLikeStatusMutationVariables,
        ChangeLikeStatusProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    ChangeLikeStatusMutation,
    ChangeLikeStatusMutationVariables,
    ChangeLikeStatusProps<TChildProps>
  >(ChangeLikeStatusDocument, operationOptions);
}
export const ChangeSubscriptionStatusDocument = gql`
  mutation ChangeSubscriptionStatus(
    $userId: ID!
    $deckId: ID!
    $value: Boolean!
  ) {
    changeSubscriptionStatus(id: $userId, deckID: $deckId, value: $value) {
      id
      subscribedDecks {
        id
        name
        cardCount
        owner {
          id
          username
        }
      }
    }
  }
`;

export class ChangeSubscriptionStatusComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      ChangeSubscriptionStatusMutation,
      ChangeSubscriptionStatusMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        ChangeSubscriptionStatusMutation,
        ChangeSubscriptionStatusMutationVariables
      >
        mutation={ChangeSubscriptionStatusDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ChangeSubscriptionStatusProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    ChangeSubscriptionStatusMutation,
    ChangeSubscriptionStatusMutationVariables
  >
> &
  TChildProps;
export type ChangeSubscriptionStatusMutationFn = ReactApollo.MutationFn<
  ChangeSubscriptionStatusMutation,
  ChangeSubscriptionStatusMutationVariables
>;
export function withChangeSubscriptionStatus<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ChangeSubscriptionStatusMutation,
        ChangeSubscriptionStatusMutationVariables,
        ChangeSubscriptionStatusProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    ChangeSubscriptionStatusMutation,
    ChangeSubscriptionStatusMutationVariables,
    ChangeSubscriptionStatusProps<TChildProps>
  >(ChangeSubscriptionStatusDocument, operationOptions);
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
export const RemoveLanguageFromUserDocument = gql`
  mutation RemoveLanguageFromUser($userId: ID!, $languageId: ID!) {
    removeLanguageFromUser(id: $userId, language: $languageId) {
      id
      languages {
        id
        name
        nativeName
        languageCode
      }
    }
  }
`;

export class RemoveLanguageFromUserComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      RemoveLanguageFromUserMutation,
      RemoveLanguageFromUserMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        RemoveLanguageFromUserMutation,
        RemoveLanguageFromUserMutationVariables
      >
        mutation={RemoveLanguageFromUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RemoveLanguageFromUserProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    RemoveLanguageFromUserMutation,
    RemoveLanguageFromUserMutationVariables
  >
> &
  TChildProps;
export type RemoveLanguageFromUserMutationFn = ReactApollo.MutationFn<
  RemoveLanguageFromUserMutation,
  RemoveLanguageFromUserMutationVariables
>;
export function withRemoveLanguageFromUser<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RemoveLanguageFromUserMutation,
        RemoveLanguageFromUserMutationVariables,
        RemoveLanguageFromUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    RemoveLanguageFromUserMutation,
    RemoveLanguageFromUserMutationVariables,
    RemoveLanguageFromUserProps<TChildProps>
  >(RemoveLanguageFromUserDocument, operationOptions);
}
export const UpdateProfileDocument = gql`
  mutation UpdateProfile($id: ID!, $profile: UserInput!) {
    editUser(id: $id, input: $profile) {
      id
      username
      email
      name
      introStep
      nativeLanguage {
        id
        name
        nativeName
        languageCode
      }
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
export const CurrentUserIdDocument = gql`
  query CurrentUserID {
    currentUserID @client
  }
`;

export class CurrentUserIdComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<CurrentUserIdQuery, CurrentUserIdQueryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<CurrentUserIdQuery, CurrentUserIdQueryVariables>
        query={CurrentUserIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CurrentUserIdProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<CurrentUserIdQuery, CurrentUserIdQueryVariables>
> &
  TChildProps;
export function withCurrentUserId<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CurrentUserIdQuery,
        CurrentUserIdQueryVariables,
        CurrentUserIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    CurrentUserIdQuery,
    CurrentUserIdQueryVariables,
    CurrentUserIdProps<TChildProps>
  >(CurrentUserIdDocument, operationOptions);
}
export const ProfileDocument = gql`
  query Profile($id: ID) {
    user(id: $id) {
      id
      username
      email
      name
      picture
      introStep
      isSocial
    }
  }
`;

export class ProfileComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ProfileQuery, ProfileQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ProfileQuery, ProfileQueryVariables>
        query={ProfileDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ProfileProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ProfileQuery, ProfileQueryVariables>
> &
  TChildProps;
export function withProfile<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ProfileQuery,
        ProfileQueryVariables,
        ProfileProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ProfileQuery,
    ProfileQueryVariables,
    ProfileProps<TChildProps>
  >(ProfileDocument, operationOptions);
}
export const GlobalDecksDocument = gql`
  query GlobalDecks($filter: DeckFilterInput, $userId: ID!) {
    decks(filter: $filter) {
      id
      name
      cardCount
      rating
      isLikedBy(userID: $userId)
      language {
        ...languageFields
      }
      owner {
        id
        username
      }
    }
  }
  ${languageFieldsFragmentDoc}
`;

export class GlobalDecksComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GlobalDecksQuery, GlobalDecksQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GlobalDecksQuery, GlobalDecksQueryVariables>
        query={GlobalDecksDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GlobalDecksProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GlobalDecksQuery, GlobalDecksQueryVariables>
> &
  TChildProps;
export function withGlobalDecks<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GlobalDecksQuery,
        GlobalDecksQueryVariables,
        GlobalDecksProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    GlobalDecksQuery,
    GlobalDecksQueryVariables,
    GlobalDecksProps<TChildProps>
  >(GlobalDecksDocument, operationOptions);
}
export const LanguagesDocument = gql`
  query Languages {
    languages {
      ...languageFields
    }
  }
  ${languageFieldsFragmentDoc}
`;

export class LanguagesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<LanguagesQuery, LanguagesQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<LanguagesQuery, LanguagesQueryVariables>
        query={LanguagesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LanguagesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LanguagesQuery, LanguagesQueryVariables>
> &
  TChildProps;
export function withLanguages<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LanguagesQuery,
        LanguagesQueryVariables,
        LanguagesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    LanguagesQuery,
    LanguagesQueryVariables,
    LanguagesProps<TChildProps>
  >(LanguagesDocument, operationOptions);
}
export const LessonsDocument = gql`
  query Lessons($userId: ID!, $filter: ReviewFilterInput) {
    user(id: $userId) {
      id
      lessonQueue(filter: $filter) {
        id
        card {
          id
          meaning
          pronunciation
          translation
        }
        reviewedFields
      }
    }
  }
`;

export class LessonsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<LessonsQuery, LessonsQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<LessonsQuery, LessonsQueryVariables>
        query={LessonsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LessonsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LessonsQuery, LessonsQueryVariables>
> &
  TChildProps;
export function withLessons<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LessonsQuery,
        LessonsQueryVariables,
        LessonsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    LessonsQuery,
    LessonsQueryVariables,
    LessonsProps<TChildProps>
  >(LessonsDocument, operationOptions);
}
export const NextReviewDocument = gql`
  query NextReview($userId: ID!) {
    user(id: $userId) {
      id
      nextReview {
        id
        card {
          id
          meaning
          pronunciation
          translation
        }
        reviewedFields
      }
    }
  }
`;

export class NextReviewComponent extends React.Component<
  Partial<ReactApollo.QueryProps<NextReviewQuery, NextReviewQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<NextReviewQuery, NextReviewQueryVariables>
        query={NextReviewDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type NextReviewProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<NextReviewQuery, NextReviewQueryVariables>
> &
  TChildProps;
export function withNextReview<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        NextReviewQuery,
        NextReviewQueryVariables,
        NextReviewProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    NextReviewQuery,
    NextReviewQueryVariables,
    NextReviewProps<TChildProps>
  >(NextReviewDocument, operationOptions);
}
export const ReviewsDocument = gql`
  query Reviews($userId: ID!, $filter: ReviewFilterInput) {
    user(id: $userId) {
      id
      reviewQueue(filter: $filter) {
        id
        box
        correct
        card {
          id
          meaning
          pronunciation
          translation
        }
        reviewedFields
      }
    }
  }
`;

export class ReviewsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ReviewsQuery, ReviewsQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ReviewsQuery, ReviewsQueryVariables>
        query={ReviewsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ReviewsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ReviewsQuery, ReviewsQueryVariables>
> &
  TChildProps;
export function withReviews<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ReviewsQuery,
        ReviewsQueryVariables,
        ReviewsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ReviewsQuery,
    ReviewsQueryVariables,
    ReviewsProps<TChildProps>
  >(ReviewsDocument, operationOptions);
}
export const CardsDocument = gql`
  query Cards($deckID: ID!, $filter: CardFilterInput) {
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

export class CardsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<CardsQuery, CardsQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<CardsQuery, CardsQueryVariables>
        query={CardsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CardsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<CardsQuery, CardsQueryVariables>
> &
  TChildProps;
export function withCards<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CardsQuery,
        CardsQueryVariables,
        CardsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    CardsQuery,
    CardsQueryVariables,
    CardsProps<TChildProps>
  >(CardsDocument, operationOptions);
}
export const DeckDetailsDocument = gql`
  query DeckDetails($deckID: ID!) {
    deck(id: $deckID) {
      id
      name
    }
  }
`;

export class DeckDetailsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<DeckDetailsQuery, DeckDetailsQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<DeckDetailsQuery, DeckDetailsQueryVariables>
        query={DeckDetailsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeckDetailsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<DeckDetailsQuery, DeckDetailsQueryVariables>
> &
  TChildProps;
export function withDeckDetails<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeckDetailsQuery,
        DeckDetailsQueryVariables,
        DeckDetailsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    DeckDetailsQuery,
    DeckDetailsQueryVariables,
    DeckDetailsProps<TChildProps>
  >(DeckDetailsDocument, operationOptions);
}
export const LessonsCountDocument = gql`
  query LessonsCount($userId: ID!) {
    user(id: $userId) {
      id
      lessonsCount
    }
  }
`;

export class LessonsCountComponent extends React.Component<
  Partial<ReactApollo.QueryProps<LessonsCountQuery, LessonsCountQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<LessonsCountQuery, LessonsCountQueryVariables>
        query={LessonsCountDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LessonsCountProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LessonsCountQuery, LessonsCountQueryVariables>
> &
  TChildProps;
export function withLessonsCount<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LessonsCountQuery,
        LessonsCountQueryVariables,
        LessonsCountProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    LessonsCountQuery,
    LessonsCountQueryVariables,
    LessonsCountProps<TChildProps>
  >(LessonsCountDocument, operationOptions);
}
export const ReviewsCountDocument = gql`
  query ReviewsCount($userId: ID!, $filter: ReviewFilterInput!) {
    user(id: $userId) {
      id
      reviewsCount(filter: $filter)
    }
  }
`;

export class ReviewsCountComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ReviewsCountQuery, ReviewsCountQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ReviewsCountQuery, ReviewsCountQueryVariables>
        query={ReviewsCountDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ReviewsCountProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ReviewsCountQuery, ReviewsCountQueryVariables>
> &
  TChildProps;
export function withReviewsCount<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ReviewsCountQuery,
        ReviewsCountQueryVariables,
        ReviewsCountProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ReviewsCountQuery,
    ReviewsCountQueryVariables,
    ReviewsCountProps<TChildProps>
  >(ReviewsCountDocument, operationOptions);
}
export const ShallowDecksDocument = gql`
  query ShallowDecks($id: ID!) {
    user(id: $id) {
      id
      ownedDecks {
        id
        name
        cardCount
        rating
        isLikedBy(userID: $id)
        language {
          ...languageFields
        }
      }
      subscribedDecks {
        id
        name
        cardCount
        rating
        isLikedBy(userID: $id)
        language {
          ...languageFields
        }
      }
    }
  }
  ${languageFieldsFragmentDoc}
`;

export class ShallowDecksComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ShallowDecksQuery, ShallowDecksQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ShallowDecksQuery, ShallowDecksQueryVariables>
        query={ShallowDecksDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ShallowDecksProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ShallowDecksQuery, ShallowDecksQueryVariables>
> &
  TChildProps;
export function withShallowDecks<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ShallowDecksQuery,
        ShallowDecksQueryVariables,
        ShallowDecksProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ShallowDecksQuery,
    ShallowDecksQueryVariables,
    ShallowDecksProps<TChildProps>
  >(ShallowDecksDocument, operationOptions);
}
export const UserLanguagesDocument = gql`
  query UserLanguages($userId: ID!) {
    user(id: $userId) {
      id
      languages {
        ...languageFields
      }
      nativeLanguage {
        ...languageFields
      }
    }
  }
  ${languageFieldsFragmentDoc}
`;

export class UserLanguagesComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<UserLanguagesQuery, UserLanguagesQueryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<UserLanguagesQuery, UserLanguagesQueryVariables>
        query={UserLanguagesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UserLanguagesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<UserLanguagesQuery, UserLanguagesQueryVariables>
> &
  TChildProps;
export function withUserLanguages<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UserLanguagesQuery,
        UserLanguagesQueryVariables,
        UserLanguagesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    UserLanguagesQuery,
    UserLanguagesQueryVariables,
    UserLanguagesProps<TChildProps>
  >(UserLanguagesDocument, operationOptions);
}
