export type Maybe<T> = T | null;
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
  cards: Array<Card>;
  cardCount: Scalars["Int"];
  subscribers: Array<User>;
  subscriberCount: Scalars["Int"];
  rating: Scalars["Int"];
  isLikedBy: Scalars["Boolean"];
  tags: Array<Scalars["String"]>;
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
  offset?: Maybe<Scalars["Int"]>;
  sortBy?: Maybe<DeckSortBy>;
  sortDirection?: Maybe<SortDirection>;
  search?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["ID"]>;
  languages?: Maybe<Array<Scalars["ID"]>>;
  nativeLanguage?: Maybe<Scalars["ID"]>;
  tags?: Maybe<Array<Scalars["String"]>>;
};

export type DeckInput = {
  name?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["String"]>;
  language?: Maybe<Scalars["ID"]>;
  nativeLanguage?: Maybe<Scalars["ID"]>;
  cards?: Maybe<Array<Maybe<CardInput>>>;
};

export type DeckSortBy = "name" | "cardsCount" | "rating" | "subscribersCount";

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
  editUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  changeFollowingStatus?: Maybe<User>;
  addLanguageToUser?: Maybe<User>;
  removeLanguageFromUser?: Maybe<User>;
  createCard?: Maybe<Deck>;
  editCard?: Maybe<Card>;
  deleteCards?: Maybe<Deck>;
  submitReview?: Maybe<Review>;
  createPost?: Maybe<Array<Maybe<Post>>>;
  editPost?: Maybe<Post>;
  deletePost?: Maybe<Array<Maybe<Post>>>;
  addDeck?: Maybe<User>;
  updateDeck?: Maybe<Deck>;
  deleteDeck: User;
  changeSubscriptionStatus?: Maybe<User>;
  changeLikeStatus?: Maybe<Deck>;
  addTagToDeck?: Maybe<Deck>;
  removeTagFromDeck?: Maybe<Deck>;
  updateNow: Scalars["ID"];
};

export type MutationAuthenticateArgs = {
  code: Scalars["ID"];
};

export type MutationEditUserArgs = {
  id: Scalars["ID"];
  input: UserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

export type MutationChangeFollowingStatusArgs = {
  id: Scalars["ID"];
  followID: Scalars["ID"];
  value: Scalars["Boolean"];
};

export type MutationAddLanguageToUserArgs = {
  id: Scalars["ID"];
  input: Scalars["ID"];
};

export type MutationRemoveLanguageFromUserArgs = {
  id: Scalars["ID"];
  language: Scalars["ID"];
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

export type MutationAddTagToDeckArgs = {
  id: Scalars["ID"];
  tag: Scalars["String"];
};

export type MutationRemoveTagFromDeckArgs = {
  id: Scalars["ID"];
  tag: Scalars["String"];
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
  tags: Array<Scalars["String"]>;
  review?: Maybe<Review>;
  currentUserID: Scalars["ID"];
  loginExpiresAt: Scalars["ID"];
  now: Scalars["ID"];
};

export type QueryUsersArgs = {
  filter?: Maybe<UserFilterInput>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
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

export type QueryTagsArgs = {
  search: Scalars["String"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
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
  id: Scalars["ID"];
  email?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  username: Scalars["String"];
  picture: Scalars["String"];
  gender?: Maybe<Scalars["String"]>;
  locale?: Maybe<Scalars["String"]>;
  identities?: Maybe<Array<Identity>>;
  isSocial: Scalars["Boolean"];
  nativeLanguage: Language;
  languages: Array<Language>;
  ownedDecks: Array<Deck>;
  subscribedDecks: Array<Deck>;
  reviewQueue: Array<Review>;
  reviewsCount: Scalars["Int"];
  nextReview?: Maybe<Review>;
  lessonQueue: Array<Review>;
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

export type AddTagMutationVariables = {
  deckId: Scalars["ID"];
  tag: Scalars["String"];
};

export type AddTagMutation = { __typename?: "Mutation" } & {
  addTagToDeck: Maybe<{ __typename?: "Deck" } & Pick<Deck, "id" | "tags">>;
};

export type AddCardMutationVariables = {
  card: CardInput;
  cardFilter?: Maybe<CardFilterInput>;
};

export type AddCardMutation = { __typename?: "Mutation" } & {
  createCard: Maybe<
    { __typename?: "Deck" } & Pick<Deck, "id"> & {
        cards: Array<
          { __typename?: "Card" } & Pick<
            Card,
            "id" | "meaning" | "pronunciation" | "translation"
          >
        >;
      }
  >;
};

export type AddDeckMutationVariables = {
  input: DeckInput;
};

export type AddDeckMutation = { __typename?: "Mutation" } & {
  addDeck: Maybe<{ __typename?: "User" } & Pick<User, "id">>;
};

export type DeleteCardsMutationVariables = {
  deckId: Scalars["ID"];
  cardIds: Array<Maybe<Scalars["ID"]>>;
  cardFilter?: Maybe<CardFilterInput>;
};

export type DeleteCardsMutation = { __typename?: "Mutation" } & {
  deleteCards: Maybe<
    { __typename?: "Deck" } & Pick<Deck, "id"> & {
        cards: Array<
          { __typename?: "Card" } & Pick<
            Card,
            "id" | "meaning" | "pronunciation" | "translation"
          >
        >;
      }
  >;
};

export type DeleteDeckMutationVariables = {
  id: Scalars["ID"];
};

export type DeleteDeckMutation = { __typename?: "Mutation" } & {
  deleteDeck: { __typename?: "User" } & Pick<User, "id">;
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

export type RemoveTagMutationVariables = {
  deckId: Scalars["ID"];
  tag: Scalars["String"];
};

export type RemoveTagMutation = { __typename?: "Mutation" } & {
  removeTagFromDeck: Maybe<{ __typename?: "Deck" } & Pick<Deck, "id" | "tags">>;
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
        languages: Array<
          { __typename?: "Language" } & Pick<
            Language,
            "id" | "name" | "nativeName" | "languageCode"
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
        subscribedDecks: Array<
          { __typename?: "Deck" } & Pick<Deck, "id" | "name" | "cardCount"> & {
              owner: { __typename?: "User" } & Pick<User, "id" | "username">;
            }
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
        languages: Array<
          { __typename?: "Language" } & Pick<
            Language,
            "id" | "name" | "nativeName" | "languageCode"
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
        nativeLanguage: { __typename?: "Language" } & Pick<
          Language,
          "id" | "name" | "nativeName" | "languageCode"
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
  id: Scalars["ID"];
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

export type GlobalTagsQueryVariables = {
  search: Scalars["String"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type GlobalTagsQuery = { __typename?: "Query" } & Pick<Query, "tags">;

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
        lessonQueue: Array<
          { __typename?: "Review" } & Pick<Review, "id" | "reviewedFields"> & {
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
        reviewQueue: Array<
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
        >;
      }
  >;
};

export type TagSearchQueryVariables = {
  search: Scalars["String"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type TagSearchQuery = { __typename?: "Query" } & Pick<Query, "tags">;

export type CardsQueryVariables = {
  deckID: Scalars["ID"];
  filter?: Maybe<CardFilterInput>;
};

export type CardsQuery = { __typename?: "Query" } & {
  deck: Maybe<
    { __typename?: "Deck" } & Pick<Deck, "id" | "cardCount"> & {
        cards: Array<
          { __typename?: "Card" } & Pick<
            Card,
            "id" | "meaning" | "pronunciation" | "translation"
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
    { __typename?: "Deck" } & Pick<Deck, "id" | "name" | "tags"> & {
        language: { __typename?: "Language" } & LanguageFieldsFragment;
        nativeLanguage: { __typename?: "Language" } & LanguageFieldsFragment;
        owner: { __typename?: "User" } & Pick<User, "id" | "username">;
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
        ownedDecks: Array<
          { __typename?: "Deck" } & Pick<
            Deck,
            "id" | "name" | "cardCount" | "rating" | "isLikedBy"
          > & { language: { __typename?: "Language" } & LanguageFieldsFragment }
        >;
        subscribedDecks: Array<
          { __typename?: "Deck" } & Pick<
            Deck,
            "id" | "name" | "cardCount" | "rating" | "isLikedBy"
          > & { language: { __typename?: "Language" } & LanguageFieldsFragment }
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
        languages: Array<{ __typename?: "Language" } & LanguageFieldsFragment>;
        nativeLanguage: { __typename?: "Language" } & LanguageFieldsFragment;
      }
  >;
};

import gql from "graphql-tag";
import * as ReactApollo from "react-apollo";
import * as ReactApolloHooks from "react-apollo-hooks";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
export type AddPostMutationFn = ReactApollo.MutationFn<
  AddPostMutation,
  AddPostMutationVariables
>;
export type AddPostProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<AddPostMutation, AddPostMutationVariables>
> &
  TChildProps;
export function withAddPost<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AddPostMutation,
    AddPostMutationVariables,
    AddPostProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    AddPostMutation,
    AddPostMutationVariables,
    AddPostProps<TChildProps>
  >(AddPostDocument, {
    alias: "withAddPost",
    ...operationOptions
  });
}

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
export const AddTagDocument = gql`
  mutation AddTag($deckId: ID!, $tag: String!) {
    addTagToDeck(id: $deckId, tag: $tag) {
      id
      tags
    }
  }
`;
export type AddTagMutationFn = ReactApollo.MutationFn<
  AddTagMutation,
  AddTagMutationVariables
>;
export type AddTagProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<AddTagMutation, AddTagMutationVariables>
> &
  TChildProps;
export function withAddTag<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AddTagMutation,
    AddTagMutationVariables,
    AddTagProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    AddTagMutation,
    AddTagMutationVariables,
    AddTagProps<TChildProps>
  >(AddTagDocument, {
    alias: "withAddTag",
    ...operationOptions
  });
}

export function useAddTagMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    AddTagMutation,
    AddTagMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<AddTagMutation, AddTagMutationVariables>(
    AddTagDocument,
    baseOptions
  );
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
export type AddCardMutationFn = ReactApollo.MutationFn<
  AddCardMutation,
  AddCardMutationVariables
>;
export type AddCardProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<AddCardMutation, AddCardMutationVariables>
> &
  TChildProps;
export function withAddCard<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AddCardMutation,
    AddCardMutationVariables,
    AddCardProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    AddCardMutation,
    AddCardMutationVariables,
    AddCardProps<TChildProps>
  >(AddCardDocument, {
    alias: "withAddCard",
    ...operationOptions
  });
}

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
    }
  }
`;
export type AddDeckMutationFn = ReactApollo.MutationFn<
  AddDeckMutation,
  AddDeckMutationVariables
>;
export type AddDeckProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<AddDeckMutation, AddDeckMutationVariables>
> &
  TChildProps;
export function withAddDeck<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AddDeckMutation,
    AddDeckMutationVariables,
    AddDeckProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    AddDeckMutation,
    AddDeckMutationVariables,
    AddDeckProps<TChildProps>
  >(AddDeckDocument, {
    alias: "withAddDeck",
    ...operationOptions
  });
}

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
export type DeleteCardsMutationFn = ReactApollo.MutationFn<
  DeleteCardsMutation,
  DeleteCardsMutationVariables
>;
export type DeleteCardsProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteCardsMutation, DeleteCardsMutationVariables>
> &
  TChildProps;
export function withDeleteCards<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DeleteCardsMutation,
    DeleteCardsMutationVariables,
    DeleteCardsProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteCardsMutation,
    DeleteCardsMutationVariables,
    DeleteCardsProps<TChildProps>
  >(DeleteCardsDocument, {
    alias: "withDeleteCards",
    ...operationOptions
  });
}

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
export const DeleteDeckDocument = gql`
  mutation DeleteDeck($id: ID!) {
    deleteDeck(id: $id) {
      id
    }
  }
`;
export type DeleteDeckMutationFn = ReactApollo.MutationFn<
  DeleteDeckMutation,
  DeleteDeckMutationVariables
>;
export type DeleteDeckProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteDeckMutation, DeleteDeckMutationVariables>
> &
  TChildProps;
export function withDeleteDeck<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DeleteDeckMutation,
    DeleteDeckMutationVariables,
    DeleteDeckProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteDeckMutation,
    DeleteDeckMutationVariables,
    DeleteDeckProps<TChildProps>
  >(DeleteDeckDocument, {
    alias: "withDeleteDeck",
    ...operationOptions
  });
}

export function useDeleteDeckMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteDeckMutation,
    DeleteDeckMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteDeckMutation,
    DeleteDeckMutationVariables
  >(DeleteDeckDocument, baseOptions);
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
export type SubmitReviewMutationFn = ReactApollo.MutationFn<
  SubmitReviewMutation,
  SubmitReviewMutationVariables
>;
export type SubmitReviewProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<SubmitReviewMutation, SubmitReviewMutationVariables>
> &
  TChildProps;
export function withSubmitReview<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SubmitReviewMutation,
    SubmitReviewMutationVariables,
    SubmitReviewProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    SubmitReviewMutation,
    SubmitReviewMutationVariables,
    SubmitReviewProps<TChildProps>
  >(SubmitReviewDocument, {
    alias: "withSubmitReview",
    ...operationOptions
  });
}

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
export type UpdateCardMutationFn = ReactApollo.MutationFn<
  UpdateCardMutation,
  UpdateCardMutationVariables
>;
export type UpdateCardProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateCardMutation, UpdateCardMutationVariables>
> &
  TChildProps;
export function withUpdateCard<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UpdateCardMutation,
    UpdateCardMutationVariables,
    UpdateCardProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateCardMutation,
    UpdateCardMutationVariables,
    UpdateCardProps<TChildProps>
  >(UpdateCardDocument, {
    alias: "withUpdateCard",
    ...operationOptions
  });
}

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
export type UpdateDeckMutationFn = ReactApollo.MutationFn<
  UpdateDeckMutation,
  UpdateDeckMutationVariables
>;
export type UpdateDeckProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateDeckMutation, UpdateDeckMutationVariables>
> &
  TChildProps;
export function withUpdateDeck<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UpdateDeckMutation,
    UpdateDeckMutationVariables,
    UpdateDeckProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateDeckMutation,
    UpdateDeckMutationVariables,
    UpdateDeckProps<TChildProps>
  >(UpdateDeckDocument, {
    alias: "withUpdateDeck",
    ...operationOptions
  });
}

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
export type DeletePostMutationFn = ReactApollo.MutationFn<
  DeletePostMutation,
  DeletePostMutationVariables
>;
export type DeletePostProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeletePostMutation, DeletePostMutationVariables>
> &
  TChildProps;
export function withDeletePost<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DeletePostMutation,
    DeletePostMutationVariables,
    DeletePostProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    DeletePostMutation,
    DeletePostMutationVariables,
    DeletePostProps<TChildProps>
  >(DeletePostDocument, {
    alias: "withDeletePost",
    ...operationOptions
  });
}

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
export const RemoveTagDocument = gql`
  mutation RemoveTag($deckId: ID!, $tag: String!) {
    removeTagFromDeck(id: $deckId, tag: $tag) {
      id
      tags
    }
  }
`;
export type RemoveTagMutationFn = ReactApollo.MutationFn<
  RemoveTagMutation,
  RemoveTagMutationVariables
>;
export type RemoveTagProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<RemoveTagMutation, RemoveTagMutationVariables>
> &
  TChildProps;
export function withRemoveTag<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    RemoveTagMutation,
    RemoveTagMutationVariables,
    RemoveTagProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    RemoveTagMutation,
    RemoveTagMutationVariables,
    RemoveTagProps<TChildProps>
  >(RemoveTagDocument, {
    alias: "withRemoveTag",
    ...operationOptions
  });
}

export function useRemoveTagMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    RemoveTagMutation,
    RemoveTagMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    RemoveTagMutation,
    RemoveTagMutationVariables
  >(RemoveTagDocument, baseOptions);
}
export const UpdateNowDocument = gql`
  mutation UpdateNow {
    updateNow @client
  }
`;
export type UpdateNowMutationFn = ReactApollo.MutationFn<
  UpdateNowMutation,
  UpdateNowMutationVariables
>;
export type UpdateNowProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateNowMutation, UpdateNowMutationVariables>
> &
  TChildProps;
export function withUpdateNow<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UpdateNowMutation,
    UpdateNowMutationVariables,
    UpdateNowProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateNowMutation,
    UpdateNowMutationVariables,
    UpdateNowProps<TChildProps>
  >(UpdateNowDocument, {
    alias: "withUpdateNow",
    ...operationOptions
  });
}

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
export type AddLanguageToUserMutationFn = ReactApollo.MutationFn<
  AddLanguageToUserMutation,
  AddLanguageToUserMutationVariables
>;
export type AddLanguageToUserProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    AddLanguageToUserMutation,
    AddLanguageToUserMutationVariables
  >
> &
  TChildProps;
export function withAddLanguageToUser<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AddLanguageToUserMutation,
    AddLanguageToUserMutationVariables,
    AddLanguageToUserProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    AddLanguageToUserMutation,
    AddLanguageToUserMutationVariables,
    AddLanguageToUserProps<TChildProps>
  >(AddLanguageToUserDocument, {
    alias: "withAddLanguageToUser",
    ...operationOptions
  });
}

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
export type ChangeLikeStatusMutationFn = ReactApollo.MutationFn<
  ChangeLikeStatusMutation,
  ChangeLikeStatusMutationVariables
>;
export type ChangeLikeStatusProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    ChangeLikeStatusMutation,
    ChangeLikeStatusMutationVariables
  >
> &
  TChildProps;
export function withChangeLikeStatus<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ChangeLikeStatusMutation,
    ChangeLikeStatusMutationVariables,
    ChangeLikeStatusProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ChangeLikeStatusMutation,
    ChangeLikeStatusMutationVariables,
    ChangeLikeStatusProps<TChildProps>
  >(ChangeLikeStatusDocument, {
    alias: "withChangeLikeStatus",
    ...operationOptions
  });
}

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
export type ChangeSubscriptionStatusMutationFn = ReactApollo.MutationFn<
  ChangeSubscriptionStatusMutation,
  ChangeSubscriptionStatusMutationVariables
>;
export type ChangeSubscriptionStatusProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    ChangeSubscriptionStatusMutation,
    ChangeSubscriptionStatusMutationVariables
  >
> &
  TChildProps;
export function withChangeSubscriptionStatus<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ChangeSubscriptionStatusMutation,
    ChangeSubscriptionStatusMutationVariables,
    ChangeSubscriptionStatusProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ChangeSubscriptionStatusMutation,
    ChangeSubscriptionStatusMutationVariables,
    ChangeSubscriptionStatusProps<TChildProps>
  >(ChangeSubscriptionStatusDocument, {
    alias: "withChangeSubscriptionStatus",
    ...operationOptions
  });
}

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
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;
export type LoginProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginMutationVariables>
> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, {
    alias: "withLogin",
    ...operationOptions
  });
}

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
export type RemoveLanguageFromUserMutationFn = ReactApollo.MutationFn<
  RemoveLanguageFromUserMutation,
  RemoveLanguageFromUserMutationVariables
>;
export type RemoveLanguageFromUserProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    RemoveLanguageFromUserMutation,
    RemoveLanguageFromUserMutationVariables
  >
> &
  TChildProps;
export function withRemoveLanguageFromUser<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    RemoveLanguageFromUserMutation,
    RemoveLanguageFromUserMutationVariables,
    RemoveLanguageFromUserProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    RemoveLanguageFromUserMutation,
    RemoveLanguageFromUserMutationVariables,
    RemoveLanguageFromUserProps<TChildProps>
  >(RemoveLanguageFromUserDocument, {
    alias: "withRemoveLanguageFromUser",
    ...operationOptions
  });
}

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
export type UpdateProfileMutationFn = ReactApollo.MutationFn<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
export type UpdateProfileProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateProfileMutation, UpdateProfileMutationVariables>
> &
  TChildProps;
export function withUpdateProfile<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UpdateProfileMutation,
    UpdateProfileMutationVariables,
    UpdateProfileProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateProfileMutation,
    UpdateProfileMutationVariables,
    UpdateProfileProps<TChildProps>
  >(UpdateProfileDocument, {
    alias: "withUpdateProfile",
    ...operationOptions
  });
}

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
export type CurrentUserIdProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<CurrentUserIdQuery, CurrentUserIdQueryVariables>
> &
  TChildProps;
export function withCurrentUserId<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CurrentUserIdQuery,
    CurrentUserIdQueryVariables,
    CurrentUserIdProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    CurrentUserIdQuery,
    CurrentUserIdQueryVariables,
    CurrentUserIdProps<TChildProps>
  >(CurrentUserIdDocument, {
    alias: "withCurrentUserId",
    ...operationOptions
  });
}

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
export type LoginExpiryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LoginExpiryQuery, LoginExpiryQueryVariables>
> &
  TChildProps;
export function withLoginExpiry<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginExpiryQuery,
    LoginExpiryQueryVariables,
    LoginExpiryProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    LoginExpiryQuery,
    LoginExpiryQueryVariables,
    LoginExpiryProps<TChildProps>
  >(LoginExpiryDocument, {
    alias: "withLoginExpiry",
    ...operationOptions
  });
}

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
export type NowProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<NowQuery, NowQueryVariables>
> &
  TChildProps;
export function withNow<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    NowQuery,
    NowQueryVariables,
    NowProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    NowQuery,
    NowQueryVariables,
    NowProps<TChildProps>
  >(NowDocument, {
    alias: "withNow",
    ...operationOptions
  });
}

export function useNowQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<NowQueryVariables>
) {
  return ReactApolloHooks.useQuery<NowQuery, NowQueryVariables>(
    NowDocument,
    baseOptions
  );
}
export const ProfileDocument = gql`
  query Profile($id: ID!) {
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
export type ProfileProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ProfileQuery, ProfileQueryVariables>
> &
  TChildProps;
export function withProfile<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ProfileQuery,
    ProfileQueryVariables,
    ProfileProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    ProfileQuery,
    ProfileQueryVariables,
    ProfileProps<TChildProps>
  >(ProfileDocument, {
    alias: "withProfile",
    ...operationOptions
  });
}

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
export type FeedProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<FeedQuery, FeedQueryVariables>
> &
  TChildProps;
export function withFeed<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    FeedQuery,
    FeedQueryVariables,
    FeedProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    FeedQuery,
    FeedQueryVariables,
    FeedProps<TChildProps>
  >(FeedDocument, {
    alias: "withFeed",
    ...operationOptions
  });
}

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
export type GlobalDecksProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GlobalDecksQuery, GlobalDecksQueryVariables>
> &
  TChildProps;
export function withGlobalDecks<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GlobalDecksQuery,
    GlobalDecksQueryVariables,
    GlobalDecksProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GlobalDecksQuery,
    GlobalDecksQueryVariables,
    GlobalDecksProps<TChildProps>
  >(GlobalDecksDocument, {
    alias: "withGlobalDecks",
    ...operationOptions
  });
}

export function useGlobalDecksQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GlobalDecksQueryVariables>
) {
  return ReactApolloHooks.useQuery<GlobalDecksQuery, GlobalDecksQueryVariables>(
    GlobalDecksDocument,
    baseOptions
  );
}
export const GlobalTagsDocument = gql`
  query GlobalTags($search: String!, $limit: Int, $offset: Int) {
    tags(search: $search, limit: $limit, offset: $offset)
  }
`;
export type GlobalTagsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GlobalTagsQuery, GlobalTagsQueryVariables>
> &
  TChildProps;
export function withGlobalTags<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GlobalTagsQuery,
    GlobalTagsQueryVariables,
    GlobalTagsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GlobalTagsQuery,
    GlobalTagsQueryVariables,
    GlobalTagsProps<TChildProps>
  >(GlobalTagsDocument, {
    alias: "withGlobalTags",
    ...operationOptions
  });
}

export function useGlobalTagsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GlobalTagsQueryVariables>
) {
  return ReactApolloHooks.useQuery<GlobalTagsQuery, GlobalTagsQueryVariables>(
    GlobalTagsDocument,
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
export type LanguagesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LanguagesQuery, LanguagesQueryVariables>
> &
  TChildProps;
export function withLanguages<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LanguagesQuery,
    LanguagesQueryVariables,
    LanguagesProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    LanguagesQuery,
    LanguagesQueryVariables,
    LanguagesProps<TChildProps>
  >(LanguagesDocument, {
    alias: "withLanguages",
    ...operationOptions
  });
}

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
export type LessonsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LessonsQuery, LessonsQueryVariables>
> &
  TChildProps;
export function withLessons<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LessonsQuery,
    LessonsQueryVariables,
    LessonsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    LessonsQuery,
    LessonsQueryVariables,
    LessonsProps<TChildProps>
  >(LessonsDocument, {
    alias: "withLessons",
    ...operationOptions
  });
}

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
export type NextReviewProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<NextReviewQuery, NextReviewQueryVariables>
> &
  TChildProps;
export function withNextReview<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    NextReviewQuery,
    NextReviewQueryVariables,
    NextReviewProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    NextReviewQuery,
    NextReviewQueryVariables,
    NextReviewProps<TChildProps>
  >(NextReviewDocument, {
    alias: "withNextReview",
    ...operationOptions
  });
}

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
export type ReviewsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ReviewsQuery, ReviewsQueryVariables>
> &
  TChildProps;
export function withReviews<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ReviewsQuery,
    ReviewsQueryVariables,
    ReviewsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    ReviewsQuery,
    ReviewsQueryVariables,
    ReviewsProps<TChildProps>
  >(ReviewsDocument, {
    alias: "withReviews",
    ...operationOptions
  });
}

export function useReviewsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ReviewsQueryVariables>
) {
  return ReactApolloHooks.useQuery<ReviewsQuery, ReviewsQueryVariables>(
    ReviewsDocument,
    baseOptions
  );
}
export const TagSearchDocument = gql`
  query TagSearch($search: String!, $limit: Int, $offset: Int) {
    tags(search: $search, limit: $limit, offset: $offset)
  }
`;
export type TagSearchProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<TagSearchQuery, TagSearchQueryVariables>
> &
  TChildProps;
export function withTagSearch<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    TagSearchQuery,
    TagSearchQueryVariables,
    TagSearchProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    TagSearchQuery,
    TagSearchQueryVariables,
    TagSearchProps<TChildProps>
  >(TagSearchDocument, {
    alias: "withTagSearch",
    ...operationOptions
  });
}

export function useTagSearchQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<TagSearchQueryVariables>
) {
  return ReactApolloHooks.useQuery<TagSearchQuery, TagSearchQueryVariables>(
    TagSearchDocument,
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
export type CardsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<CardsQuery, CardsQueryVariables>
> &
  TChildProps;
export function withCards<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CardsQuery,
    CardsQueryVariables,
    CardsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    CardsQuery,
    CardsQueryVariables,
    CardsProps<TChildProps>
  >(CardsDocument, {
    alias: "withCards",
    ...operationOptions
  });
}

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
      owner {
        id
        username
      }
      tags
    }
  }
  ${languageFieldsFragmentDoc}
`;
export type DeckDetailsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<DeckDetailsQuery, DeckDetailsQueryVariables>
> &
  TChildProps;
export function withDeckDetails<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DeckDetailsQuery,
    DeckDetailsQueryVariables,
    DeckDetailsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    DeckDetailsQuery,
    DeckDetailsQueryVariables,
    DeckDetailsProps<TChildProps>
  >(DeckDetailsDocument, {
    alias: "withDeckDetails",
    ...operationOptions
  });
}

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
export type LessonsCountProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LessonsCountQuery, LessonsCountQueryVariables>
> &
  TChildProps;
export function withLessonsCount<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LessonsCountQuery,
    LessonsCountQueryVariables,
    LessonsCountProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    LessonsCountQuery,
    LessonsCountQueryVariables,
    LessonsCountProps<TChildProps>
  >(LessonsCountDocument, {
    alias: "withLessonsCount",
    ...operationOptions
  });
}

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
export type ReviewsCountProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ReviewsCountQuery, ReviewsCountQueryVariables>
> &
  TChildProps;
export function withReviewsCount<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ReviewsCountQuery,
    ReviewsCountQueryVariables,
    ReviewsCountProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    ReviewsCountQuery,
    ReviewsCountQueryVariables,
    ReviewsCountProps<TChildProps>
  >(ReviewsCountDocument, {
    alias: "withReviewsCount",
    ...operationOptions
  });
}

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
export type ShallowDecksProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ShallowDecksQuery, ShallowDecksQueryVariables>
> &
  TChildProps;
export function withShallowDecks<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ShallowDecksQuery,
    ShallowDecksQueryVariables,
    ShallowDecksProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    ShallowDecksQuery,
    ShallowDecksQueryVariables,
    ShallowDecksProps<TChildProps>
  >(ShallowDecksDocument, {
    alias: "withShallowDecks",
    ...operationOptions
  });
}

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
export type UserLanguagesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<UserLanguagesQuery, UserLanguagesQueryVariables>
> &
  TChildProps;
export function withUserLanguages<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UserLanguagesQuery,
    UserLanguagesQueryVariables,
    UserLanguagesProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    UserLanguagesQuery,
    UserLanguagesQueryVariables,
    UserLanguagesProps<TChildProps>
  >(UserLanguagesDocument, {
    alias: "withUserLanguages",
    ...operationOptions
  });
}

export function useUserLanguagesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<UserLanguagesQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    UserLanguagesQuery,
    UserLanguagesQueryVariables
  >(UserLanguagesDocument, baseOptions);
}
