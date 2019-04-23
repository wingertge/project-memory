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
  JSON: any;
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
  hasConverter: Scalars["Boolean"];
  requiresIME: Scalars["Boolean"];
  hasPronunciation: Scalars["Boolean"];
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
  createPost?: Maybe<Array<Maybe<Post>>>;
  editPost?: Maybe<Post>;
  deletePost?: Maybe<Array<Maybe<Post>>>;
  updateNow: Scalars["ID"];
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

export type MutationCreatePostArgs = {
  input: PostInput;
  filter?: Maybe<PostFilterInput>;
};

export type MutationEditPostArgs = {
  id: Scalars["ID"];
  input: PostInput;
};

export type MutationDeletePostArgs = {
  id: Scalars["ID"];
  filter?: Maybe<PostFilterInput>;
};

export type Post = {
  id: Scalars["ID"];
  createdAt: Scalars["Date"];
  type: PostType;
  by: User;
  content?: Maybe<Scalars["String"]>;
  originalPost?: Maybe<Post>;
};

export type PostFilterInput = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  type?: Maybe<PostType>;
  sortBy?: Maybe<PostSortOption>;
  sortDirection?: Maybe<SortDirection>;
};

export type PostInput = {
  type?: Maybe<PostType>;
  content?: Maybe<Scalars["String"]>;
  originalPost?: Maybe<Scalars["ID"]>;
};

export type PostSortOption = "likes" | "reposts" | "createdAt";

export type PostType = "post" | "repost";

export type Query = {
  users?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
  languages?: Maybe<Array<Maybe<Language>>>;
  language?: Maybe<Language>;
  decks?: Maybe<Array<Maybe<Deck>>>;
  deck?: Maybe<Deck>;
  review?: Maybe<Review>;
  currentUserID: Scalars["ID"];
  loginExpiresAt: Scalars["ID"];
  now: Scalars["ID"];
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
  lessonsCount: Scalars["Int"];
  totalRating: Scalars["Int"];
  totalSubscribers: Scalars["Int"];
  badges: Array<Maybe<Scalars["String"]>>;
  introStep?: Maybe<Scalars["Int"]>;
  feed?: Maybe<Array<Maybe<Post>>>;
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

export type UserFeedArgs = {
  filter?: Maybe<PostFilterInput>;
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
  | "id"
  | "languageCode"
  | "name"
  | "nativeName"
  | "hasConverter"
  | "requiresIME"
  | "hasPronunciation"
>;

export type ShallowPostFieldsFragment = { __typename?: "Post" } & Pick<
  Post,
  "id" | "createdAt" | "type" | "content"
> & { by: { __typename?: "User" } & Pick<User, "id" | "username" | "picture"> };

export type AddPostMutationVariables = {
  input: PostInput;
  filter?: Maybe<PostFilterInput>;
};

export type AddPostMutation = { __typename?: "Mutation" } & {
  createPost: Maybe<
    Array<
      Maybe<
        { __typename?: "Post" } & {
          originalPost: Maybe<
            { __typename?: "Post" } & ShallowPostFieldsFragment
          >;
        } & ShallowPostFieldsFragment
      >
    >
  >;
};

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

export type DeletePostMutationVariables = {
  id: Scalars["ID"];
};

export type DeletePostMutation = { __typename?: "Mutation" } & {
  deletePost: Maybe<Array<Maybe<{ __typename?: "Post" } & Pick<Post, "id">>>>;
};

export type UpdateNowMutationVariables = {};

export type UpdateNowMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateNow"
>;

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

export type LoginExpiryQueryVariables = {};

export type LoginExpiryQuery = { __typename?: "Query" } & Pick<
  Query,
  "loginExpiresAt"
>;

export type NowQueryVariables = {};

export type NowQuery = { __typename?: "Query" } & Pick<Query, "now">;

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
      | "badges"
    >
  >;
};

export type FeedQueryVariables = {
  userId: Scalars["ID"];
  filter?: Maybe<PostFilterInput>;
};

export type FeedQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        feed: Maybe<
          Array<
            Maybe<
              { __typename?: "Post" } & {
                originalPost: Maybe<
                  { __typename?: "Post" } & ShallowPostFieldsFragment
                >;
              } & ShallowPostFieldsFragment
            >
          >
        >;
      }
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
                  > & {
                      deck: Maybe<
                        { __typename?: "Deck" } & {
                          language: {
                            __typename?: "Language";
                          } & LanguageFieldsFragment;
                        }
                      >;
                    };
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
                "id" | "box" | "correct" | "reviewedFields" | "nextReviewAt"
              > & {
                  card: { __typename?: "Card" } & Pick<
                    Card,
                    "id" | "meaning" | "pronunciation" | "translation"
                  > & {
                      deck: Maybe<
                        { __typename?: "Deck" } & {
                          language: {
                            __typename?: "Language";
                          } & LanguageFieldsFragment;
                        }
                      >;
                    };
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
  deck: Maybe<
    { __typename?: "Deck" } & Pick<Deck, "id" | "name"> & {
        language: { __typename?: "Language" } & LanguageFieldsFragment;
        nativeLanguage: { __typename?: "Language" } & LanguageFieldsFragment;
      }
  >;
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
import * as ReactApolloHooks from "react-apollo-hooks";
export const languageFieldsFragmentDoc = gql`
  fragment languageFields on Language {
    id
    languageCode
    name
    nativeName
    hasConverter
    requiresIME
    hasPronunciation
  }
`;
export const shallowPostFieldsFragmentDoc = gql`
  fragment shallowPostFields on Post {
    id
    createdAt
    type
    by {
      id
      username
      picture
    }
    content
  }
`;
export const AddPostDocument = gql`
  mutation AddPost($input: PostInput!, $filter: PostFilterInput) {
    createPost(input: $input, filter: $filter) {
      ...shallowPostFields
      originalPost {
        ...shallowPostFields
      }
    }
  }
  ${shallowPostFieldsFragmentDoc}
`;

export function useAddPostMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    AddPostMutation,
    AddPostMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    AddPostMutation,
    AddPostMutationVariables
  >(AddPostDocument, baseOptions);
}
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

export function useAddCardMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    AddCardMutation,
    AddCardMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    AddCardMutation,
    AddCardMutationVariables
  >(AddCardDocument, baseOptions);
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

export function useAddDeckMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    AddDeckMutation,
    AddDeckMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    AddDeckMutation,
    AddDeckMutationVariables
  >(AddDeckDocument, baseOptions);
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

export function useDeleteCardsMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteCardsMutation,
    DeleteCardsMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteCardsMutation,
    DeleteCardsMutationVariables
  >(DeleteCardsDocument, baseOptions);
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

export function useSubmitReviewMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    SubmitReviewMutation,
    SubmitReviewMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    SubmitReviewMutation,
    SubmitReviewMutationVariables
  >(SubmitReviewDocument, baseOptions);
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

export function useUpdateCardMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateCardMutation,
    UpdateCardMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateCardMutation,
    UpdateCardMutationVariables
  >(UpdateCardDocument, baseOptions);
}
export const UpdateDeckDocument = gql`
  mutation UpdateDeck($id: ID!, $deckInput: DeckInput!) {
    updateDeck(id: $id, input: $deckInput) {
      id
      name
    }
  }
`;

export function useUpdateDeckMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateDeckMutation,
    UpdateDeckMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateDeckMutation,
    UpdateDeckMutationVariables
  >(UpdateDeckDocument, baseOptions);
}
export const DeletePostDocument = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export function useDeletePostMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeletePostMutation,
    DeletePostMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(DeletePostDocument, baseOptions);
}
export const UpdateNowDocument = gql`
  mutation UpdateNow {
    updateNow @client
  }
`;

export function useUpdateNowMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateNowMutation,
    UpdateNowMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateNowMutation,
    UpdateNowMutationVariables
  >(UpdateNowDocument, baseOptions);
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

export function useAddLanguageToUserMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    AddLanguageToUserMutation,
    AddLanguageToUserMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    AddLanguageToUserMutation,
    AddLanguageToUserMutationVariables
  >(AddLanguageToUserDocument, baseOptions);
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

export function useChangeLikeStatusMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ChangeLikeStatusMutation,
    ChangeLikeStatusMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ChangeLikeStatusMutation,
    ChangeLikeStatusMutationVariables
  >(ChangeLikeStatusDocument, baseOptions);
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

export function useChangeSubscriptionStatusMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ChangeSubscriptionStatusMutation,
    ChangeSubscriptionStatusMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ChangeSubscriptionStatusMutation,
    ChangeSubscriptionStatusMutationVariables
  >(ChangeSubscriptionStatusDocument, baseOptions);
}
export const LoginDocument = gql`
  mutation Login($authorizationCode: ID!) {
    authenticate(code: $authorizationCode) {
      accessToken
      expiresIn
    }
  }
`;

export function useLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
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

export function useRemoveLanguageFromUserMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    RemoveLanguageFromUserMutation,
    RemoveLanguageFromUserMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    RemoveLanguageFromUserMutation,
    RemoveLanguageFromUserMutationVariables
  >(RemoveLanguageFromUserDocument, baseOptions);
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

export function useUpdateProfileMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument, baseOptions);
}
export const CurrentUserIdDocument = gql`
  query CurrentUserID {
    currentUserID @client
  }
`;

export function useCurrentUserIdQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<CurrentUserIdQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    CurrentUserIdQuery,
    CurrentUserIdQueryVariables
  >(CurrentUserIdDocument, baseOptions);
}
export const LoginExpiryDocument = gql`
  query LoginExpiry {
    loginExpiresAt @client
  }
`;

export function useLoginExpiryQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<LoginExpiryQueryVariables>
) {
  return ReactApolloHooks.useQuery<LoginExpiryQuery, LoginExpiryQueryVariables>(
    LoginExpiryDocument,
    baseOptions
  );
}
export const NowDocument = gql`
  query Now {
    now @client
  }
`;

export function useNowQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<NowQueryVariables>
) {
  return ReactApolloHooks.useQuery<NowQuery, NowQueryVariables>(
    NowDocument,
    baseOptions
  );
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
      badges
    }
  }
`;

export function useProfileQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ProfileQueryVariables>
) {
  return ReactApolloHooks.useQuery<ProfileQuery, ProfileQueryVariables>(
    ProfileDocument,
    baseOptions
  );
}
export const FeedDocument = gql`
  query Feed($userId: ID!, $filter: PostFilterInput) {
    user(id: $userId) {
      id
      feed(filter: $filter) {
        ...shallowPostFields
        originalPost {
          ...shallowPostFields
        }
      }
    }
  }
  ${shallowPostFieldsFragmentDoc}
`;

export function useFeedQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<FeedQueryVariables>
) {
  return ReactApolloHooks.useQuery<FeedQuery, FeedQueryVariables>(
    FeedDocument,
    baseOptions
  );
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

export function useGlobalDecksQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GlobalDecksQueryVariables>
) {
  return ReactApolloHooks.useQuery<GlobalDecksQuery, GlobalDecksQueryVariables>(
    GlobalDecksDocument,
    baseOptions
  );
}
export const LanguagesDocument = gql`
  query Languages {
    languages {
      ...languageFields
    }
  }
  ${languageFieldsFragmentDoc}
`;

export function useLanguagesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<LanguagesQueryVariables>
) {
  return ReactApolloHooks.useQuery<LanguagesQuery, LanguagesQueryVariables>(
    LanguagesDocument,
    baseOptions
  );
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
          deck {
            language {
              ...languageFields
            }
          }
        }
        reviewedFields
      }
    }
  }
  ${languageFieldsFragmentDoc}
`;

export function useLessonsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<LessonsQueryVariables>
) {
  return ReactApolloHooks.useQuery<LessonsQuery, LessonsQueryVariables>(
    LessonsDocument,
    baseOptions
  );
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

export function useNextReviewQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<NextReviewQueryVariables>
) {
  return ReactApolloHooks.useQuery<NextReviewQuery, NextReviewQueryVariables>(
    NextReviewDocument,
    baseOptions
  );
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
          deck {
            language {
              ...languageFields
            }
          }
        }
        reviewedFields
        nextReviewAt
      }
    }
  }
  ${languageFieldsFragmentDoc}
`;

export function useReviewsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ReviewsQueryVariables>
) {
  return ReactApolloHooks.useQuery<ReviewsQuery, ReviewsQueryVariables>(
    ReviewsDocument,
    baseOptions
  );
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

export function useCardsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<CardsQueryVariables>
) {
  return ReactApolloHooks.useQuery<CardsQuery, CardsQueryVariables>(
    CardsDocument,
    baseOptions
  );
}
export const DeckDetailsDocument = gql`
  query DeckDetails($deckID: ID!) {
    deck(id: $deckID) {
      id
      name
      language {
        ...languageFields
      }
      nativeLanguage {
        ...languageFields
      }
    }
  }
  ${languageFieldsFragmentDoc}
`;

export function useDeckDetailsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<DeckDetailsQueryVariables>
) {
  return ReactApolloHooks.useQuery<DeckDetailsQuery, DeckDetailsQueryVariables>(
    DeckDetailsDocument,
    baseOptions
  );
}
export const LessonsCountDocument = gql`
  query LessonsCount($userId: ID!) {
    user(id: $userId) {
      id
      lessonsCount
    }
  }
`;

export function useLessonsCountQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<LessonsCountQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    LessonsCountQuery,
    LessonsCountQueryVariables
  >(LessonsCountDocument, baseOptions);
}
export const ReviewsCountDocument = gql`
  query ReviewsCount($userId: ID!, $filter: ReviewFilterInput!) {
    user(id: $userId) {
      id
      reviewsCount(filter: $filter)
    }
  }
`;

export function useReviewsCountQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ReviewsCountQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    ReviewsCountQuery,
    ReviewsCountQueryVariables
  >(ReviewsCountDocument, baseOptions);
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

export function useShallowDecksQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ShallowDecksQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    ShallowDecksQuery,
    ShallowDecksQueryVariables
  >(ShallowDecksDocument, baseOptions);
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

export function useUserLanguagesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<UserLanguagesQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    UserLanguagesQuery,
    UserLanguagesQueryVariables
  >(UserLanguagesDocument, baseOptions);
}
