export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  /** Custom scalar representing a Slate rich text AST */
  RichTextAST: any;
  /** Represents a date in time */
  Date: any;
  /** Raw JSON value */
  Json: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values.
   * Long can represent values between -(2^63) and 2^63 - 1.
   */
  Long: any;
  Upload: any;
  /** Custom scalar representing the hex color code value */
  HEX: any;
  /** Custom scalar representing the hue part of a rgba value. Value ranges from 0 - 255 */
  RGBAHue: any;
  /** Custom scalar representing the transparency part of a rgba value. Value ranges from 0 - 1 */
  RGBATransparency: any;
};

export type AggregateAsset = {
  count: Scalars["Int"];
};

export type AggregateHelpPage = {
  count: Scalars["Int"];
};

export type AggregateLocation = {
  count: Scalars["Int"];
};

export type AggregatePage = {
  count: Scalars["Int"];
};

export type Asset = Node & {
  status: Status;
  updatedAt: Scalars["DateTime"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  handle: Scalars["String"];
  fileName: Scalars["String"];
  height?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  mimeType?: Maybe<Scalars["String"]>;
  mainImagePage?: Maybe<Array<Page>>;
  mainImageHelpPage?: Maybe<Array<HelpPage>>;
  /** Get the url for the asset with provided transformations applied. */
  url: Scalars["String"];
};

export type AssetMainImagePageArgs = {
  where?: Maybe<PageWhereInput>;
  orderBy?: Maybe<PageOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type AssetMainImageHelpPageArgs = {
  where?: Maybe<HelpPageWhereInput>;
  orderBy?: Maybe<HelpPageOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type AssetUrlArgs = {
  transformation?: Maybe<AssetTransformationInput>;
};

/** A connection to a list of items. */
export type AssetConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Array<Maybe<AssetEdge>>;
  aggregate: AggregateAsset;
};

export type AssetCreateInput = {
  status?: Maybe<Status>;
  handle: Scalars["String"];
  fileName: Scalars["String"];
  height?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  mimeType?: Maybe<Scalars["String"]>;
  mainImagePage?: Maybe<PageCreateManyWithoutMainImageInput>;
  mainImageHelpPage?: Maybe<HelpPageCreateManyWithoutMainImageInput>;
};

export type AssetCreateOneWithoutMainImageHelpPageInput = {
  create?: Maybe<AssetCreateWithoutMainImageHelpPageInput>;
  connect?: Maybe<AssetWhereUniqueInput>;
};

export type AssetCreateOneWithoutMainImagePageInput = {
  create?: Maybe<AssetCreateWithoutMainImagePageInput>;
  connect?: Maybe<AssetWhereUniqueInput>;
};

export type AssetCreateWithoutMainImageHelpPageInput = {
  status?: Maybe<Status>;
  handle: Scalars["String"];
  fileName: Scalars["String"];
  height?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  mimeType?: Maybe<Scalars["String"]>;
  mainImagePage?: Maybe<PageCreateManyWithoutMainImageInput>;
};

export type AssetCreateWithoutMainImagePageInput = {
  status?: Maybe<Status>;
  handle: Scalars["String"];
  fileName: Scalars["String"];
  height?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  mimeType?: Maybe<Scalars["String"]>;
  mainImageHelpPage?: Maybe<HelpPageCreateManyWithoutMainImageInput>;
};

/** An edge in a connection. */
export type AssetEdge = {
  /** The item at the end of the edge. */
  node: Asset;
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
};

export type AssetOrderByInput =
  | "status_ASC"
  | "status_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "id_ASC"
  | "id_DESC"
  | "handle_ASC"
  | "handle_DESC"
  | "fileName_ASC"
  | "fileName_DESC"
  | "height_ASC"
  | "height_DESC"
  | "width_ASC"
  | "width_DESC"
  | "size_ASC"
  | "size_DESC"
  | "mimeType_ASC"
  | "mimeType_DESC";

export type AssetPreviousValues = {
  status: Status;
  updatedAt: Scalars["DateTime"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  handle: Scalars["String"];
  fileName: Scalars["String"];
  height?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  mimeType?: Maybe<Scalars["String"]>;
};

export type AssetSubscriptionPayload = {
  mutation: MutationType;
  node?: Maybe<Asset>;
  updatedFields?: Maybe<Array<Scalars["String"]>>;
  previousValues?: Maybe<AssetPreviousValues>;
};

export type AssetSubscriptionWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<AssetSubscriptionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<AssetSubscriptionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<AssetSubscriptionWhereInput>>;
  /** The subscription event gets dispatched when it's listed in mutation_in */
  mutation_in?: Maybe<Array<MutationType>>;
  /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
  updatedFields_contains?: Maybe<Scalars["String"]>;
  /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
  updatedFields_contains_every?: Maybe<Array<Scalars["String"]>>;
  /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
  updatedFields_contains_some?: Maybe<Array<Scalars["String"]>>;
  node?: Maybe<AssetWhereInput>;
};

/** Transformations for Assets */
export type AssetTransformationInput = {
  image?: Maybe<ImageTransformationInput>;
  document?: Maybe<DocumentTransformationInput>;
  /** Pass `true` if you want to validate the passed transformation parameters */
  validateOptions?: Maybe<Scalars["Boolean"]>;
};

export type AssetUpdateInput = {
  status?: Maybe<Status>;
  handle?: Maybe<Scalars["String"]>;
  fileName?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  mimeType?: Maybe<Scalars["String"]>;
  mainImagePage?: Maybe<PageUpdateManyWithoutMainImageInput>;
  mainImageHelpPage?: Maybe<HelpPageUpdateManyWithoutMainImageInput>;
};

export type AssetUpdateManyMutationInput = {
  status?: Maybe<Status>;
  handle?: Maybe<Scalars["String"]>;
  fileName?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  mimeType?: Maybe<Scalars["String"]>;
};

export type AssetUpdateOneWithoutMainImageHelpPageInput = {
  create?: Maybe<AssetCreateWithoutMainImageHelpPageInput>;
  connect?: Maybe<AssetWhereUniqueInput>;
  disconnect?: Maybe<Scalars["Boolean"]>;
  delete?: Maybe<Scalars["Boolean"]>;
  update?: Maybe<AssetUpdateWithoutMainImageHelpPageDataInput>;
  upsert?: Maybe<AssetUpsertWithoutMainImageHelpPageInput>;
};

export type AssetUpdateOneWithoutMainImagePageInput = {
  create?: Maybe<AssetCreateWithoutMainImagePageInput>;
  connect?: Maybe<AssetWhereUniqueInput>;
  disconnect?: Maybe<Scalars["Boolean"]>;
  delete?: Maybe<Scalars["Boolean"]>;
  update?: Maybe<AssetUpdateWithoutMainImagePageDataInput>;
  upsert?: Maybe<AssetUpsertWithoutMainImagePageInput>;
};

export type AssetUpdateWithoutMainImageHelpPageDataInput = {
  status?: Maybe<Status>;
  handle?: Maybe<Scalars["String"]>;
  fileName?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  mimeType?: Maybe<Scalars["String"]>;
  mainImagePage?: Maybe<PageUpdateManyWithoutMainImageInput>;
};

export type AssetUpdateWithoutMainImagePageDataInput = {
  status?: Maybe<Status>;
  handle?: Maybe<Scalars["String"]>;
  fileName?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  mimeType?: Maybe<Scalars["String"]>;
  mainImageHelpPage?: Maybe<HelpPageUpdateManyWithoutMainImageInput>;
};

export type AssetUpsertWithoutMainImageHelpPageInput = {
  update: AssetUpdateWithoutMainImageHelpPageDataInput;
  create: AssetCreateWithoutMainImageHelpPageInput;
};

export type AssetUpsertWithoutMainImagePageInput = {
  update: AssetUpdateWithoutMainImagePageDataInput;
  create: AssetCreateWithoutMainImagePageInput;
};

export type AssetWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<AssetWhereInput>>;
  status?: Maybe<Status>;
  /** All values that are not equal to given value. */
  status_not?: Maybe<Status>;
  /** All values that are contained in given list. */
  status_in?: Maybe<Array<Status>>;
  /** All values that are not contained in given list. */
  status_not_in?: Maybe<Array<Status>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars["DateTime"]>;
  id?: Maybe<Scalars["ID"]>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars["ID"]>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars["ID"]>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars["ID"]>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars["ID"]>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars["ID"]>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars["ID"]>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars["ID"]>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars["ID"]>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars["ID"]>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars["ID"]>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars["ID"]>;
  handle?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  handle_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  handle_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  handle_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  handle_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  handle_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  handle_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  handle_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  handle_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  handle_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  handle_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  handle_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  handle_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  handle_not_ends_with?: Maybe<Scalars["String"]>;
  fileName?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  fileName_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  fileName_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  fileName_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  fileName_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  fileName_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  fileName_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  fileName_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  fileName_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  fileName_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  fileName_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  fileName_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  fileName_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  fileName_not_ends_with?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["Float"]>;
  /** All values that are not equal to given value. */
  height_not?: Maybe<Scalars["Float"]>;
  /** All values that are contained in given list. */
  height_in?: Maybe<Array<Scalars["Float"]>>;
  /** All values that are not contained in given list. */
  height_not_in?: Maybe<Array<Scalars["Float"]>>;
  /** All values less than the given value. */
  height_lt?: Maybe<Scalars["Float"]>;
  /** All values less than or equal the given value. */
  height_lte?: Maybe<Scalars["Float"]>;
  /** All values greater than the given value. */
  height_gt?: Maybe<Scalars["Float"]>;
  /** All values greater than or equal the given value. */
  height_gte?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  /** All values that are not equal to given value. */
  width_not?: Maybe<Scalars["Float"]>;
  /** All values that are contained in given list. */
  width_in?: Maybe<Array<Scalars["Float"]>>;
  /** All values that are not contained in given list. */
  width_not_in?: Maybe<Array<Scalars["Float"]>>;
  /** All values less than the given value. */
  width_lt?: Maybe<Scalars["Float"]>;
  /** All values less than or equal the given value. */
  width_lte?: Maybe<Scalars["Float"]>;
  /** All values greater than the given value. */
  width_gt?: Maybe<Scalars["Float"]>;
  /** All values greater than or equal the given value. */
  width_gte?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  /** All values that are not equal to given value. */
  size_not?: Maybe<Scalars["Float"]>;
  /** All values that are contained in given list. */
  size_in?: Maybe<Array<Scalars["Float"]>>;
  /** All values that are not contained in given list. */
  size_not_in?: Maybe<Array<Scalars["Float"]>>;
  /** All values less than the given value. */
  size_lt?: Maybe<Scalars["Float"]>;
  /** All values less than or equal the given value. */
  size_lte?: Maybe<Scalars["Float"]>;
  /** All values greater than the given value. */
  size_gt?: Maybe<Scalars["Float"]>;
  /** All values greater than or equal the given value. */
  size_gte?: Maybe<Scalars["Float"]>;
  mimeType?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  mimeType_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  mimeType_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  mimeType_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  mimeType_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  mimeType_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  mimeType_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  mimeType_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  mimeType_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  mimeType_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  mimeType_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  mimeType_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  mimeType_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  mimeType_not_ends_with?: Maybe<Scalars["String"]>;
  mainImagePage_every?: Maybe<PageWhereInput>;
  mainImagePage_some?: Maybe<PageWhereInput>;
  mainImagePage_none?: Maybe<PageWhereInput>;
  mainImageHelpPage_every?: Maybe<HelpPageWhereInput>;
  mainImageHelpPage_some?: Maybe<HelpPageWhereInput>;
  mainImageHelpPage_none?: Maybe<HelpPageWhereInput>;
};

export type AssetWhereUniqueInput = {
  id?: Maybe<Scalars["ID"]>;
  handle?: Maybe<Scalars["String"]>;
};

export type AuthResult = {
  accessToken: Scalars["String"];
  idToken: Scalars["String"];
  tokenType: Scalars["String"];
  expiresIn: Scalars["Int"];
};

export type BatchPayload = {
  /** The number of nodes that have been affected by the Batch operation. */
  count: Scalars["Long"];
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
  search?: Maybe<Scalars["String"]>;
};

export type CardInput = {
  translation?: Maybe<Scalars["String"]>;
  meaning?: Maybe<Scalars["String"]>;
  pronunciation?: Maybe<Scalars["String"]>;
  audioUrl?: Maybe<Scalars["String"]>;
  deck?: Maybe<Scalars["ID"]>;
};

export type CardSortingOptions = "meaning" | "pronunciation" | "translation";

export type CardSortInput = {
  sortBy?: Maybe<CardSortingOptions>;
  sortDirection?: Maybe<SortDirection>;
};

/** Representing a color value comprising of HEX, RGBA and css color values */
export type Color = {
  hex: Scalars["HEX"];
  rgba: Rgba;
  css: Scalars["String"];
};

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
export type ColorInput = {
  hex?: Maybe<Scalars["HEX"]>;
  rgba?: Maybe<RgbaInput>;
};

export type DateComparator = {
  gt?: Maybe<Scalars["Date"]>;
  lt?: Maybe<Scalars["Date"]>;
  eq?: Maybe<Scalars["Date"]>;
  ne?: Maybe<Scalars["Date"]>;
  gte?: Maybe<Scalars["Date"]>;
  lte?: Maybe<Scalars["Date"]>;
  in?: Maybe<Array<Scalars["Date"]>>;
  nin?: Maybe<Array<Scalars["Date"]>>;
  all?: Maybe<Array<Scalars["Date"]>>;
};

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
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<CardFilterInput>;
  sort?: Maybe<CardSortInput>;
};

export type DeckSubscribersArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<UserFilterInput>;
  sort?: Maybe<UserSortInput>;
};

export type DeckIsLikedByArgs = {
  userID: Scalars["ID"];
};

export type DeckFilterInput = {
  search?: Maybe<Scalars["String"]>;
  owner?: Maybe<IdComparator>;
  language?: Maybe<IdComparator>;
  nativeLanguage?: Maybe<IdComparator>;
  tags?: Maybe<StringComparator>;
  subscribers?: Maybe<IdComparator>;
  id?: Maybe<IdComparator>;
};

export type DeckInput = {
  name?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["String"]>;
  language?: Maybe<Scalars["ID"]>;
  nativeLanguage?: Maybe<Scalars["ID"]>;
  cards?: Maybe<Array<Maybe<CardInput>>>;
};

export type DeckSortInput = {
  sortBy?: Maybe<DeckSortOptions>;
  sortDirection?: Maybe<SortDirection>;
};

export type DeckSortOptions =
  | "name"
  | "cardCount"
  | "rating"
  | "subscriberCount";

export type DisplayType = "Public" | "Unlisted" | "Private";

export type DocumentFileTypes =
  | "jpg"
  | "odp"
  | "ods"
  | "odt"
  | "png"
  | "svg"
  | "txt"
  | "webp"
  | "docx"
  | "html"
  | "pdf"
  | "doc"
  | "xlsx"
  | "xls"
  | "pptx"
  | "ppt";

export type DocumentOutputInput = {
  /** Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * PDF:	jpg, odp, ods, odt, png, svg, txt, and webp
   * DOC:	docx, html, jpg, odt, pdf, png, svg, txt, and webp
   * DOCX:	doc, html, jpg, odt, pdf, png, svg, txt, and webp
   * ODT:	doc, docx, html, jpg, pdf, png, svg, txt, and webp
   * XLS:	jpg, pdf, ods, png, svg, xlsx, and webp
   * XLSX:	jpg, pdf, ods, png, svg, xls, and webp
   * ODS:	jpg, pdf, png, xls, svg, xlsx, and webp
   * PPT:	jpg, odp, pdf, png, svg, pptx, and webp
   * PPTX:	jpg, odp, pdf, png, svg, ppt, and webp
   * ODP:	jpg, pdf, png, ppt, svg, pptx, and webp
   * BMP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * GIF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * JPG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * PNG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * WEBP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * TIFF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * AI:	    jpg, odp, ods, odt, pdf, png, svg, and webp
   * PSD:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * SVG:	jpg, odp, ods, odt, pdf, png, and webp
   * HTML:	jpg, odt, pdf, svg, txt, and webp
   * TXT:	jpg, html, odt, pdf, svg, and webp
   */
  format?: Maybe<DocumentFileTypes>;
};

/** Transformations for Documents */
export type DocumentTransformationInput = {
  /** Changes the output for the file. */
  output?: Maybe<DocumentOutputInput>;
};

export type HelpPage = Node & {
  status: Status;
  updatedAt: Scalars["DateTime"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  slug: Scalars["String"];
  header?: Maybe<Scalars["String"]>;
  mainImage?: Maybe<Asset>;
  intro?: Maybe<RichText>;
  main?: Maybe<RichText>;
  outro?: Maybe<RichText>;
  references?: Maybe<RichText>;
  title: Scalars["String"];
  displayType?: Maybe<DisplayType>;
  folds: Array<RichText>;
  foldTitles: Array<Scalars["String"]>;
};

/** A connection to a list of items. */
export type HelpPageConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Array<Maybe<HelpPageEdge>>;
  aggregate: AggregateHelpPage;
};

export type HelpPageCreatefoldsInput = {
  set?: Maybe<Array<Scalars["RichTextAST"]>>;
};

export type HelpPageCreatefoldTitlesInput = {
  set?: Maybe<Array<Scalars["String"]>>;
};

export type HelpPageCreateInput = {
  status?: Maybe<Status>;
  slug: Scalars["String"];
  header?: Maybe<Scalars["String"]>;
  intro?: Maybe<Scalars["RichTextAST"]>;
  main?: Maybe<Scalars["RichTextAST"]>;
  outro?: Maybe<Scalars["RichTextAST"]>;
  references?: Maybe<Scalars["RichTextAST"]>;
  title: Scalars["String"];
  displayType?: Maybe<DisplayType>;
  folds?: Maybe<HelpPageCreatefoldsInput>;
  foldTitles?: Maybe<HelpPageCreatefoldTitlesInput>;
  mainImage?: Maybe<AssetCreateOneWithoutMainImageHelpPageInput>;
};

export type HelpPageCreateManyWithoutMainImageInput = {
  create?: Maybe<Array<HelpPageCreateWithoutMainImageInput>>;
  connect?: Maybe<Array<HelpPageWhereUniqueInput>>;
};

export type HelpPageCreateWithoutMainImageInput = {
  status?: Maybe<Status>;
  slug: Scalars["String"];
  header?: Maybe<Scalars["String"]>;
  intro?: Maybe<Scalars["Json"]>;
  main?: Maybe<Scalars["Json"]>;
  outro?: Maybe<Scalars["Json"]>;
  references?: Maybe<Scalars["Json"]>;
  title: Scalars["String"];
  displayType?: Maybe<DisplayType>;
  folds?: Maybe<HelpPageCreatefoldsInput>;
  foldTitles?: Maybe<HelpPageCreatefoldTitlesInput>;
};

/** An edge in a connection. */
export type HelpPageEdge = {
  /** The item at the end of the edge. */
  node: HelpPage;
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
};

export type HelpPageOrderByInput =
  | "status_ASC"
  | "status_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "id_ASC"
  | "id_DESC"
  | "slug_ASC"
  | "slug_DESC"
  | "header_ASC"
  | "header_DESC"
  | "intro_ASC"
  | "intro_DESC"
  | "main_ASC"
  | "main_DESC"
  | "outro_ASC"
  | "outro_DESC"
  | "references_ASC"
  | "references_DESC"
  | "title_ASC"
  | "title_DESC"
  | "displayType_ASC"
  | "displayType_DESC";

export type HelpPagePreviousValues = {
  status: Status;
  updatedAt: Scalars["DateTime"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  slug: Scalars["String"];
  header?: Maybe<Scalars["String"]>;
  intro?: Maybe<RichText>;
  main?: Maybe<RichText>;
  outro?: Maybe<RichText>;
  references?: Maybe<RichText>;
  title: Scalars["String"];
  displayType?: Maybe<DisplayType>;
  folds: Array<RichText>;
  foldTitles: Array<Scalars["String"]>;
};

export type HelpPageScalarWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<HelpPageScalarWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<HelpPageScalarWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<HelpPageScalarWhereInput>>;
  status?: Maybe<Status>;
  /** All values that are not equal to given value. */
  status_not?: Maybe<Status>;
  /** All values that are contained in given list. */
  status_in?: Maybe<Array<Status>>;
  /** All values that are not contained in given list. */
  status_not_in?: Maybe<Array<Status>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars["DateTime"]>;
  id?: Maybe<Scalars["ID"]>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars["ID"]>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars["ID"]>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars["ID"]>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars["ID"]>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars["ID"]>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars["ID"]>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars["ID"]>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars["ID"]>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars["ID"]>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars["ID"]>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  slug_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  slug_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  slug_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  slug_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  slug_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  slug_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  slug_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  slug_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  slug_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  slug_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  slug_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  slug_not_ends_with?: Maybe<Scalars["String"]>;
  header?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  header_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  header_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  header_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  header_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  header_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  header_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  header_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  header_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  header_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  header_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  header_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  header_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  header_not_ends_with?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  title_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  title_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  title_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  title_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  title_not_ends_with?: Maybe<Scalars["String"]>;
  displayType?: Maybe<DisplayType>;
  /** All values that are not equal to given value. */
  displayType_not?: Maybe<DisplayType>;
  /** All values that are contained in given list. */
  displayType_in?: Maybe<Array<DisplayType>>;
  /** All values that are not contained in given list. */
  displayType_not_in?: Maybe<Array<DisplayType>>;
};

export type HelpPageSubscriptionPayload = {
  mutation: MutationType;
  node?: Maybe<HelpPage>;
  updatedFields?: Maybe<Array<Scalars["String"]>>;
  previousValues?: Maybe<HelpPagePreviousValues>;
};

export type HelpPageSubscriptionWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<HelpPageSubscriptionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<HelpPageSubscriptionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<HelpPageSubscriptionWhereInput>>;
  /** The subscription event gets dispatched when it's listed in mutation_in */
  mutation_in?: Maybe<Array<MutationType>>;
  /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
  updatedFields_contains?: Maybe<Scalars["String"]>;
  /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
  updatedFields_contains_every?: Maybe<Array<Scalars["String"]>>;
  /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
  updatedFields_contains_some?: Maybe<Array<Scalars["String"]>>;
  node?: Maybe<HelpPageWhereInput>;
};

export type HelpPageUpdatefoldsInput = {
  set?: Maybe<Array<Scalars["RichTextAST"]>>;
};

export type HelpPageUpdatefoldTitlesInput = {
  set?: Maybe<Array<Scalars["String"]>>;
};

export type HelpPageUpdateInput = {
  status?: Maybe<Status>;
  slug?: Maybe<Scalars["String"]>;
  header?: Maybe<Scalars["String"]>;
  intro?: Maybe<Scalars["RichTextAST"]>;
  main?: Maybe<Scalars["RichTextAST"]>;
  outro?: Maybe<Scalars["RichTextAST"]>;
  references?: Maybe<Scalars["RichTextAST"]>;
  title?: Maybe<Scalars["String"]>;
  displayType?: Maybe<DisplayType>;
  folds?: Maybe<HelpPageUpdatefoldsInput>;
  foldTitles?: Maybe<HelpPageUpdatefoldTitlesInput>;
  mainImage?: Maybe<AssetUpdateOneWithoutMainImageHelpPageInput>;
};

export type HelpPageUpdateManyDataInput = {
  status?: Maybe<Status>;
  slug?: Maybe<Scalars["String"]>;
  header?: Maybe<Scalars["String"]>;
  intro?: Maybe<Scalars["Json"]>;
  main?: Maybe<Scalars["Json"]>;
  outro?: Maybe<Scalars["Json"]>;
  references?: Maybe<Scalars["Json"]>;
  title?: Maybe<Scalars["String"]>;
  displayType?: Maybe<DisplayType>;
  folds?: Maybe<HelpPageUpdatefoldsInput>;
  foldTitles?: Maybe<HelpPageUpdatefoldTitlesInput>;
};

export type HelpPageUpdateManyMutationInput = {
  status?: Maybe<Status>;
  slug?: Maybe<Scalars["String"]>;
  header?: Maybe<Scalars["String"]>;
  intro?: Maybe<Scalars["RichTextAST"]>;
  main?: Maybe<Scalars["RichTextAST"]>;
  outro?: Maybe<Scalars["RichTextAST"]>;
  references?: Maybe<Scalars["RichTextAST"]>;
  title?: Maybe<Scalars["String"]>;
  displayType?: Maybe<DisplayType>;
  folds?: Maybe<HelpPageUpdatefoldsInput>;
  foldTitles?: Maybe<HelpPageUpdatefoldTitlesInput>;
};

export type HelpPageUpdateManyWithoutMainImageInput = {
  create?: Maybe<Array<HelpPageCreateWithoutMainImageInput>>;
  connect?: Maybe<Array<HelpPageWhereUniqueInput>>;
  set?: Maybe<Array<HelpPageWhereUniqueInput>>;
  disconnect?: Maybe<Array<HelpPageWhereUniqueInput>>;
  delete?: Maybe<Array<HelpPageWhereUniqueInput>>;
  update?: Maybe<Array<HelpPageUpdateWithWhereUniqueWithoutMainImageInput>>;
  updateMany?: Maybe<Array<HelpPageUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<HelpPageScalarWhereInput>>;
  upsert?: Maybe<Array<HelpPageUpsertWithWhereUniqueWithoutMainImageInput>>;
};

export type HelpPageUpdateManyWithWhereNestedInput = {
  where: HelpPageScalarWhereInput;
  data: HelpPageUpdateManyDataInput;
};

export type HelpPageUpdateWithoutMainImageDataInput = {
  status?: Maybe<Status>;
  slug?: Maybe<Scalars["String"]>;
  header?: Maybe<Scalars["String"]>;
  intro?: Maybe<Scalars["Json"]>;
  main?: Maybe<Scalars["Json"]>;
  outro?: Maybe<Scalars["Json"]>;
  references?: Maybe<Scalars["Json"]>;
  title?: Maybe<Scalars["String"]>;
  displayType?: Maybe<DisplayType>;
  folds?: Maybe<HelpPageUpdatefoldsInput>;
  foldTitles?: Maybe<HelpPageUpdatefoldTitlesInput>;
};

export type HelpPageUpdateWithWhereUniqueWithoutMainImageInput = {
  where: HelpPageWhereUniqueInput;
  data: HelpPageUpdateWithoutMainImageDataInput;
};

export type HelpPageUpsertWithWhereUniqueWithoutMainImageInput = {
  where: HelpPageWhereUniqueInput;
  update: HelpPageUpdateWithoutMainImageDataInput;
  create: HelpPageCreateWithoutMainImageInput;
};

export type HelpPageWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<HelpPageWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<HelpPageWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<HelpPageWhereInput>>;
  status?: Maybe<Status>;
  /** All values that are not equal to given value. */
  status_not?: Maybe<Status>;
  /** All values that are contained in given list. */
  status_in?: Maybe<Array<Status>>;
  /** All values that are not contained in given list. */
  status_not_in?: Maybe<Array<Status>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars["DateTime"]>;
  id?: Maybe<Scalars["ID"]>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars["ID"]>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars["ID"]>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars["ID"]>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars["ID"]>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars["ID"]>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars["ID"]>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars["ID"]>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars["ID"]>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars["ID"]>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars["ID"]>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  slug_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  slug_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  slug_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  slug_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  slug_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  slug_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  slug_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  slug_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  slug_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  slug_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  slug_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  slug_not_ends_with?: Maybe<Scalars["String"]>;
  header?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  header_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  header_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  header_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  header_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  header_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  header_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  header_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  header_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  header_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  header_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  header_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  header_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  header_not_ends_with?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  title_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  title_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  title_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  title_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  title_not_ends_with?: Maybe<Scalars["String"]>;
  displayType?: Maybe<DisplayType>;
  /** All values that are not equal to given value. */
  displayType_not?: Maybe<DisplayType>;
  /** All values that are contained in given list. */
  displayType_in?: Maybe<Array<DisplayType>>;
  /** All values that are not contained in given list. */
  displayType_not_in?: Maybe<Array<DisplayType>>;
  mainImage?: Maybe<AssetWhereInput>;
};

export type HelpPageWhereUniqueInput = {
  id?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
};

export type IdComparator = {
  eq?: Maybe<Scalars["ID"]>;
  ne?: Maybe<Scalars["ID"]>;
  in?: Maybe<Array<Scalars["ID"]>>;
  nin?: Maybe<Array<Scalars["ID"]>>;
  all?: Maybe<Array<Scalars["ID"]>>;
};

export type Identity = {
  userId: Scalars["ID"];
  provider: Scalars["String"];
  connection: Scalars["String"];
  isSocial: Scalars["Boolean"];
};

export type ImageFit =
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  | "clip"
  /** Resizes the image to fit the specified parameters exactly by removing any
   * parts of the image that don't fit within the boundaries.
   */
  | "crop"
  /** Resizes the image to fit the specified parameters exactly by scaling the image
   * to the desired size. The aspect ratio of the image is not respected and the
   * image can be distorted using this method.
   */
  | "scale"
  /** Resizes the image to fit within the parameters, but as opposed to 'fit:clip'
   * will not scale the image if the image is smaller than the output size.
   */
  | "max";

export type ImageResizeInput = {
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width?: Maybe<Scalars["Int"]>;
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height?: Maybe<Scalars["Int"]>;
  /** The default value for the fit parameter is fit:clip. */
  fit?: Maybe<ImageFit>;
};

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Resizes the image */
  resize?: Maybe<ImageResizeInput>;
};

export type Issue = {
  id: Scalars["ID"];
  title: Scalars["String"];
  content: Scalars["String"];
  replies: Array<IssueReply>;
  replyCount: Scalars["Int"];
  by: User;
  postedAt: Scalars["Date"];
  lastActivity: Scalars["Date"];
  editedOn?: Maybe<Scalars["Date"]>;
  isReportedBy: Scalars["Boolean"];
};

export type IssueRepliesArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<IssueReplyFilterInput>;
  sort?: Maybe<IssueReplySortInput>;
};

export type IssueIsReportedByArgs = {
  id: Scalars["ID"];
};

export type IssueFilterInput = {
  title?: Maybe<Scalars["String"]>;
  textSearch?: Maybe<Scalars["String"]>;
  replyCount?: Maybe<NumberComparator>;
  by?: Maybe<Scalars["ID"]>;
  postedAt?: Maybe<DateComparator>;
  lastActivity?: Maybe<DateComparator>;
};

export type IssueInput = {
  title?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
};

export type IssueReply = {
  id: Scalars["ID"];
  content: Scalars["String"];
  by: User;
  postedAt: Scalars["Date"];
  editedOn?: Maybe<Scalars["Date"]>;
  isReportedBy: Scalars["Boolean"];
};

export type IssueReplyIsReportedByArgs = {
  id: Scalars["ID"];
};

export type IssueReplyFilterInput = {
  by?: Maybe<Scalars["ID"]>;
  postedAt?: Maybe<DateComparator>;
};

export type IssueReplySortBy = "postedAt";

export type IssueReplySortInput = {
  sortDirection?: Maybe<SortDirection>;
  sortBy?: Maybe<IssueReplySortBy>;
};

export type IssueSortBy = "replyCount" | "postedAt" | "lastActivity";

export type IssueSortingInput = {
  sortDirection?: Maybe<SortDirection>;
  sortBy?: Maybe<IssueSortBy>;
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

export type Locale = "EN";

export type Location = Node & {
  updatedAt: Scalars["DateTime"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
};

/** A connection to a list of items. */
export type LocationConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Array<Maybe<LocationEdge>>;
  aggregate: AggregateLocation;
};

/** An edge in a connection. */
export type LocationEdge = {
  /** The item at the end of the edge. */
  node: Location;
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
};

export type LocationOrderByInput =
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "id_ASC"
  | "id_DESC";

export type LocationPreviousValues = {
  updatedAt: Scalars["DateTime"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
};

export type LocationSubscriptionPayload = {
  mutation: MutationType;
  node?: Maybe<Location>;
  updatedFields?: Maybe<Array<Scalars["String"]>>;
  previousValues?: Maybe<LocationPreviousValues>;
};

export type LocationSubscriptionWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<LocationSubscriptionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<LocationSubscriptionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<LocationSubscriptionWhereInput>>;
  /** The subscription event gets dispatched when it's listed in mutation_in */
  mutation_in?: Maybe<Array<MutationType>>;
  /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
  updatedFields_contains?: Maybe<Scalars["String"]>;
  /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
  updatedFields_contains_every?: Maybe<Array<Scalars["String"]>>;
  /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
  updatedFields_contains_some?: Maybe<Array<Scalars["String"]>>;
  node?: Maybe<LocationWhereInput>;
};

export type LocationWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<LocationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<LocationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<LocationWhereInput>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars["DateTime"]>;
  id?: Maybe<Scalars["ID"]>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars["ID"]>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars["ID"]>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars["ID"]>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars["ID"]>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars["ID"]>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars["ID"]>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars["ID"]>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars["ID"]>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars["ID"]>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars["ID"]>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars["ID"]>;
};

export type LocationWhereUniqueInput = {
  id?: Maybe<Scalars["ID"]>;
};

export type Mutation = {
  createAsset: Asset;
  createLocation: Location;
  createPage: Page;
  createHelpPage: HelpPage;
  updateAsset?: Maybe<Asset>;
  updatePage?: Maybe<Page>;
  updateHelpPage?: Maybe<HelpPage>;
  deleteAsset?: Maybe<Asset>;
  deleteLocation?: Maybe<Location>;
  deletePage?: Maybe<Page>;
  deleteHelpPage?: Maybe<HelpPage>;
  upsertAsset: Asset;
  upsertPage: Page;
  upsertHelpPage: HelpPage;
  updateManyAssets: BatchPayload;
  updateManyPages: BatchPayload;
  updateManyHelpPages: BatchPayload;
  deleteManyAssets: BatchPayload;
  deleteManyLocations: BatchPayload;
  deleteManyPages: BatchPayload;
  deleteManyHelpPages: BatchPayload;
  authenticate?: Maybe<AuthResult>;
  logout?: Maybe<Scalars["Boolean"]>;
  editUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  changeFollowingStatus?: Maybe<User>;
  uploadProfilePicture?: Maybe<User>;
  addLanguageToUser?: Maybe<User>;
  removeLanguageFromUser?: Maybe<User>;
  createCard?: Maybe<Deck>;
  editCard?: Maybe<Card>;
  deleteCards?: Maybe<Deck>;
  submitReview?: Maybe<Review>;
  createPost?: Maybe<Array<Post>>;
  editPost?: Maybe<Post>;
  deletePost?: Maybe<Array<Post>>;
  changePostLikeStatus?: Maybe<Post>;
  addReportToPost?: Maybe<Post>;
  addDeck?: Maybe<User>;
  updateDeck?: Maybe<Deck>;
  deleteDeck: User;
  changeSubscriptionStatus?: Maybe<User>;
  changeLikeStatus?: Maybe<Deck>;
  addTagToDeck?: Maybe<Deck>;
  removeTagFromDeck?: Maybe<Deck>;
  createIssue?: Maybe<Issue>;
  editIssue?: Maybe<Issue>;
  deleteIssue?: Maybe<Issue>;
  replyToIssue?: Maybe<Issue>;
  editIssueReply?: Maybe<IssueReply>;
  deleteIssueReply?: Maybe<Issue>;
  reportIssue?: Maybe<Issue>;
  reportIssueReply?: Maybe<IssueReply>;
  updateNow: Scalars["ID"];
};

export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};

export type MutationCreatePageArgs = {
  data: PageCreateInput;
};

export type MutationCreateHelpPageArgs = {
  data: HelpPageCreateInput;
};

export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput;
  where: AssetWhereUniqueInput;
};

export type MutationUpdatePageArgs = {
  data: PageUpdateInput;
  where: PageWhereUniqueInput;
};

export type MutationUpdateHelpPageArgs = {
  data: HelpPageUpdateInput;
  where: HelpPageWhereUniqueInput;
};

export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput;
};

export type MutationDeleteLocationArgs = {
  where: LocationWhereUniqueInput;
};

export type MutationDeletePageArgs = {
  where: PageWhereUniqueInput;
};

export type MutationDeleteHelpPageArgs = {
  where: HelpPageWhereUniqueInput;
};

export type MutationUpsertAssetArgs = {
  where: AssetWhereUniqueInput;
  create: AssetCreateInput;
  update: AssetUpdateInput;
};

export type MutationUpsertPageArgs = {
  where: PageWhereUniqueInput;
  create: PageCreateInput;
  update: PageUpdateInput;
};

export type MutationUpsertHelpPageArgs = {
  where: HelpPageWhereUniqueInput;
  create: HelpPageCreateInput;
  update: HelpPageUpdateInput;
};

export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyMutationInput;
  where?: Maybe<AssetWhereInput>;
};

export type MutationUpdateManyPagesArgs = {
  data: PageUpdateManyMutationInput;
  where?: Maybe<PageWhereInput>;
};

export type MutationUpdateManyHelpPagesArgs = {
  data: HelpPageUpdateManyMutationInput;
  where?: Maybe<HelpPageWhereInput>;
};

export type MutationDeleteManyAssetsArgs = {
  where?: Maybe<AssetWhereInput>;
};

export type MutationDeleteManyLocationsArgs = {
  where?: Maybe<LocationWhereInput>;
};

export type MutationDeleteManyPagesArgs = {
  where?: Maybe<PageWhereInput>;
};

export type MutationDeleteManyHelpPagesArgs = {
  where?: Maybe<HelpPageWhereInput>;
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
  followerID: Scalars["ID"];
  value: Scalars["Boolean"];
};

export type MutationUploadProfilePictureArgs = {
  userId: Scalars["ID"];
  file: Scalars["Upload"];
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
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<PostFilterInput>;
  sort?: Maybe<PostSortInput>;
};

export type MutationEditPostArgs = {
  id: Scalars["ID"];
  input: PostInput;
};

export type MutationDeletePostArgs = {
  id: Scalars["ID"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<PostFilterInput>;
  sort?: Maybe<PostSortInput>;
};

export type MutationChangePostLikeStatusArgs = {
  id: Scalars["ID"];
  userID: Scalars["ID"];
  value: Scalars["Boolean"];
};

export type MutationAddReportToPostArgs = {
  id: Scalars["ID"];
  reportedBy: Scalars["ID"];
  reason: ReportReason;
  message?: Maybe<Scalars["String"]>;
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
  value: Scalars["Boolean"];
};

export type MutationAddTagToDeckArgs = {
  id: Scalars["ID"];
  tag: Scalars["String"];
};

export type MutationRemoveTagFromDeckArgs = {
  id: Scalars["ID"];
  tag: Scalars["String"];
};

export type MutationCreateIssueArgs = {
  input: IssueInput;
};

export type MutationEditIssueArgs = {
  id: Scalars["ID"];
  input: IssueInput;
};

export type MutationDeleteIssueArgs = {
  id: Scalars["ID"];
};

export type MutationReplyToIssueArgs = {
  id: Scalars["ID"];
  content: Scalars["String"];
};

export type MutationEditIssueReplyArgs = {
  id: Scalars["ID"];
  content: Scalars["String"];
};

export type MutationDeleteIssueReplyArgs = {
  id: Scalars["ID"];
};

export type MutationReportIssueArgs = {
  id: Scalars["ID"];
  reason: ReportReason;
  message?: Maybe<Scalars["String"]>;
};

export type MutationReportIssueReplyArgs = {
  id: Scalars["ID"];
  reason: ReportReason;
  message?: Maybe<Scalars["String"]>;
};

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars["ID"];
};

export type NumberComparator = {
  gt?: Maybe<Scalars["Int"]>;
  lt?: Maybe<Scalars["Int"]>;
  eq?: Maybe<Scalars["Int"]>;
  ne?: Maybe<Scalars["Int"]>;
  gte?: Maybe<Scalars["Int"]>;
  lte?: Maybe<Scalars["Int"]>;
  in?: Maybe<Array<Scalars["Int"]>>;
  nin?: Maybe<Array<Scalars["Int"]>>;
  all?: Maybe<Array<Scalars["Int"]>>;
};

export type Page = Node & {
  status: Status;
  updatedAt: Scalars["DateTime"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  header?: Maybe<Scalars["String"]>;
  mainImage?: Maybe<Asset>;
  imageHeader?: Maybe<Scalars["String"]>;
  imageSubheader?: Maybe<Scalars["String"]>;
  slug: Scalars["String"];
  intro?: Maybe<RichText>;
  main?: Maybe<RichText>;
  blurbs: Array<RichText>;
  outro?: Maybe<RichText>;
};

/** A connection to a list of items. */
export type PageConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Array<Maybe<PageEdge>>;
  aggregate: AggregatePage;
};

export type PageCreateblurbsInput = {
  set?: Maybe<Array<Scalars["RichTextAST"]>>;
};

export type PageCreateInput = {
  status?: Maybe<Status>;
  header?: Maybe<Scalars["String"]>;
  imageHeader?: Maybe<Scalars["String"]>;
  imageSubheader?: Maybe<Scalars["String"]>;
  slug: Scalars["String"];
  intro?: Maybe<Scalars["RichTextAST"]>;
  main?: Maybe<Scalars["RichTextAST"]>;
  outro?: Maybe<Scalars["RichTextAST"]>;
  blurbs?: Maybe<PageCreateblurbsInput>;
  mainImage?: Maybe<AssetCreateOneWithoutMainImagePageInput>;
};

export type PageCreateManyWithoutMainImageInput = {
  create?: Maybe<Array<PageCreateWithoutMainImageInput>>;
  connect?: Maybe<Array<PageWhereUniqueInput>>;
};

export type PageCreateWithoutMainImageInput = {
  status?: Maybe<Status>;
  header?: Maybe<Scalars["String"]>;
  imageHeader?: Maybe<Scalars["String"]>;
  imageSubheader?: Maybe<Scalars["String"]>;
  slug: Scalars["String"];
  intro?: Maybe<Scalars["Json"]>;
  main?: Maybe<Scalars["Json"]>;
  outro?: Maybe<Scalars["Json"]>;
  blurbs?: Maybe<PageCreateblurbsInput>;
};

/** An edge in a connection. */
export type PageEdge = {
  /** The item at the end of the edge. */
  node: Page;
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]>;
};

export type PageOrderByInput =
  | "status_ASC"
  | "status_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "id_ASC"
  | "id_DESC"
  | "header_ASC"
  | "header_DESC"
  | "imageHeader_ASC"
  | "imageHeader_DESC"
  | "imageSubheader_ASC"
  | "imageSubheader_DESC"
  | "slug_ASC"
  | "slug_DESC"
  | "intro_ASC"
  | "intro_DESC"
  | "main_ASC"
  | "main_DESC"
  | "outro_ASC"
  | "outro_DESC";

export type PagePreviousValues = {
  status: Status;
  updatedAt: Scalars["DateTime"];
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  header?: Maybe<Scalars["String"]>;
  imageHeader?: Maybe<Scalars["String"]>;
  imageSubheader?: Maybe<Scalars["String"]>;
  slug: Scalars["String"];
  intro?: Maybe<RichText>;
  main?: Maybe<RichText>;
  blurbs: Array<RichText>;
  outro?: Maybe<RichText>;
};

export type PageScalarWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<PageScalarWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<PageScalarWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<PageScalarWhereInput>>;
  status?: Maybe<Status>;
  /** All values that are not equal to given value. */
  status_not?: Maybe<Status>;
  /** All values that are contained in given list. */
  status_in?: Maybe<Array<Status>>;
  /** All values that are not contained in given list. */
  status_not_in?: Maybe<Array<Status>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars["DateTime"]>;
  id?: Maybe<Scalars["ID"]>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars["ID"]>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars["ID"]>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars["ID"]>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars["ID"]>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars["ID"]>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars["ID"]>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars["ID"]>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars["ID"]>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars["ID"]>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars["ID"]>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars["ID"]>;
  header?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  header_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  header_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  header_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  header_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  header_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  header_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  header_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  header_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  header_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  header_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  header_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  header_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  header_not_ends_with?: Maybe<Scalars["String"]>;
  imageHeader?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  imageHeader_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  imageHeader_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  imageHeader_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  imageHeader_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  imageHeader_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  imageHeader_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  imageHeader_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  imageHeader_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  imageHeader_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  imageHeader_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  imageHeader_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  imageHeader_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  imageHeader_not_ends_with?: Maybe<Scalars["String"]>;
  imageSubheader?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  imageSubheader_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  imageSubheader_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  imageSubheader_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  imageSubheader_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  imageSubheader_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  imageSubheader_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  imageSubheader_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  imageSubheader_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  imageSubheader_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  imageSubheader_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  imageSubheader_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  imageSubheader_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  imageSubheader_not_ends_with?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  slug_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  slug_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  slug_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  slug_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  slug_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  slug_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  slug_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  slug_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  slug_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  slug_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  slug_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  slug_not_ends_with?: Maybe<Scalars["String"]>;
};

export type PageSubscriptionPayload = {
  mutation: MutationType;
  node?: Maybe<Page>;
  updatedFields?: Maybe<Array<Scalars["String"]>>;
  previousValues?: Maybe<PagePreviousValues>;
};

export type PageSubscriptionWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<PageSubscriptionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<PageSubscriptionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<PageSubscriptionWhereInput>>;
  /** The subscription event gets dispatched when it's listed in mutation_in */
  mutation_in?: Maybe<Array<MutationType>>;
  /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
  updatedFields_contains?: Maybe<Scalars["String"]>;
  /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
  updatedFields_contains_every?: Maybe<Array<Scalars["String"]>>;
  /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
  updatedFields_contains_some?: Maybe<Array<Scalars["String"]>>;
  node?: Maybe<PageWhereInput>;
};

export type PageUpdateblurbsInput = {
  set?: Maybe<Array<Scalars["RichTextAST"]>>;
};

export type PageUpdateInput = {
  status?: Maybe<Status>;
  header?: Maybe<Scalars["String"]>;
  imageHeader?: Maybe<Scalars["String"]>;
  imageSubheader?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  intro?: Maybe<Scalars["RichTextAST"]>;
  main?: Maybe<Scalars["RichTextAST"]>;
  outro?: Maybe<Scalars["RichTextAST"]>;
  blurbs?: Maybe<PageUpdateblurbsInput>;
  mainImage?: Maybe<AssetUpdateOneWithoutMainImagePageInput>;
};

export type PageUpdateManyDataInput = {
  status?: Maybe<Status>;
  header?: Maybe<Scalars["String"]>;
  imageHeader?: Maybe<Scalars["String"]>;
  imageSubheader?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  intro?: Maybe<Scalars["Json"]>;
  main?: Maybe<Scalars["Json"]>;
  outro?: Maybe<Scalars["Json"]>;
  blurbs?: Maybe<PageUpdateblurbsInput>;
};

export type PageUpdateManyMutationInput = {
  status?: Maybe<Status>;
  header?: Maybe<Scalars["String"]>;
  imageHeader?: Maybe<Scalars["String"]>;
  imageSubheader?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  intro?: Maybe<Scalars["RichTextAST"]>;
  main?: Maybe<Scalars["RichTextAST"]>;
  outro?: Maybe<Scalars["RichTextAST"]>;
  blurbs?: Maybe<PageUpdateblurbsInput>;
};

export type PageUpdateManyWithoutMainImageInput = {
  create?: Maybe<Array<PageCreateWithoutMainImageInput>>;
  connect?: Maybe<Array<PageWhereUniqueInput>>;
  set?: Maybe<Array<PageWhereUniqueInput>>;
  disconnect?: Maybe<Array<PageWhereUniqueInput>>;
  delete?: Maybe<Array<PageWhereUniqueInput>>;
  update?: Maybe<Array<PageUpdateWithWhereUniqueWithoutMainImageInput>>;
  updateMany?: Maybe<Array<PageUpdateManyWithWhereNestedInput>>;
  deleteMany?: Maybe<Array<PageScalarWhereInput>>;
  upsert?: Maybe<Array<PageUpsertWithWhereUniqueWithoutMainImageInput>>;
};

export type PageUpdateManyWithWhereNestedInput = {
  where: PageScalarWhereInput;
  data: PageUpdateManyDataInput;
};

export type PageUpdateWithoutMainImageDataInput = {
  status?: Maybe<Status>;
  header?: Maybe<Scalars["String"]>;
  imageHeader?: Maybe<Scalars["String"]>;
  imageSubheader?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  intro?: Maybe<Scalars["Json"]>;
  main?: Maybe<Scalars["Json"]>;
  outro?: Maybe<Scalars["Json"]>;
  blurbs?: Maybe<PageUpdateblurbsInput>;
};

export type PageUpdateWithWhereUniqueWithoutMainImageInput = {
  where: PageWhereUniqueInput;
  data: PageUpdateWithoutMainImageDataInput;
};

export type PageUpsertWithWhereUniqueWithoutMainImageInput = {
  where: PageWhereUniqueInput;
  update: PageUpdateWithoutMainImageDataInput;
  create: PageCreateWithoutMainImageInput;
};

export type PageWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<PageWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<PageWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<PageWhereInput>>;
  status?: Maybe<Status>;
  /** All values that are not equal to given value. */
  status_not?: Maybe<Status>;
  /** All values that are contained in given list. */
  status_in?: Maybe<Array<Status>>;
  /** All values that are not contained in given list. */
  status_not_in?: Maybe<Array<Status>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars["DateTime"]>;
  id?: Maybe<Scalars["ID"]>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars["ID"]>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars["ID"]>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars["ID"]>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars["ID"]>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars["ID"]>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars["ID"]>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars["ID"]>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars["ID"]>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars["ID"]>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars["ID"]>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars["ID"]>;
  header?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  header_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  header_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  header_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  header_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  header_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  header_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  header_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  header_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  header_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  header_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  header_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  header_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  header_not_ends_with?: Maybe<Scalars["String"]>;
  imageHeader?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  imageHeader_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  imageHeader_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  imageHeader_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  imageHeader_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  imageHeader_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  imageHeader_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  imageHeader_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  imageHeader_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  imageHeader_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  imageHeader_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  imageHeader_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  imageHeader_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  imageHeader_not_ends_with?: Maybe<Scalars["String"]>;
  imageSubheader?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  imageSubheader_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  imageSubheader_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  imageSubheader_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  imageSubheader_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  imageSubheader_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  imageSubheader_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  imageSubheader_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  imageSubheader_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  imageSubheader_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  imageSubheader_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  imageSubheader_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  imageSubheader_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  imageSubheader_not_ends_with?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  slug_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  slug_in?: Maybe<Array<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  slug_not_in?: Maybe<Array<Scalars["String"]>>;
  /** All values less than the given value. */
  slug_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  slug_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  slug_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  slug_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  slug_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  slug_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  slug_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  slug_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  slug_not_ends_with?: Maybe<Scalars["String"]>;
  mainImage?: Maybe<AssetWhereInput>;
};

export type PageWhereUniqueInput = {
  id?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
};

export type Post = {
  id: Scalars["ID"];
  createdAt: Scalars["Date"];
  type: PostType;
  by: User;
  content?: Maybe<Scalars["String"]>;
  originalPost?: Maybe<Post>;
  likeCount: Scalars["Int"];
  isLikedBy: Scalars["Boolean"];
  isReportedBy: Scalars["Boolean"];
  editedOn?: Maybe<Scalars["Date"]>;
};

export type PostIsLikedByArgs = {
  userID: Scalars["ID"];
};

export type PostIsReportedByArgs = {
  userID: Scalars["ID"];
};

export type PostFilterInput = {
  type?: Maybe<PostType>;
};

export type PostInput = {
  type?: Maybe<PostType>;
  content?: Maybe<Scalars["String"]>;
  originalPost?: Maybe<Scalars["ID"]>;
};

export type PostSortInput = {
  sortBy?: Maybe<PostSortOption>;
  sortDirection?: Maybe<SortDirection>;
};

export type PostSortOption = "likes" | "reposts" | "createdAt";

export type PostType = "post" | "repost";

export type Query = {
  assets: Array<Maybe<Asset>>;
  locations: Array<Maybe<Location>>;
  pages: Array<Maybe<Page>>;
  helpPages: Array<Maybe<HelpPage>>;
  asset?: Maybe<Asset>;
  location?: Maybe<Location>;
  page?: Maybe<Page>;
  helpPage?: Maybe<HelpPage>;
  assetsConnection: AssetConnection;
  locationsConnection: LocationConnection;
  pagesConnection: PageConnection;
  helpPagesConnection: HelpPageConnection;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  users?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
  languages?: Maybe<Array<Maybe<Language>>>;
  language?: Maybe<Language>;
  decks?: Maybe<Array<Maybe<Deck>>>;
  deck?: Maybe<Deck>;
  tags: Array<Scalars["String"]>;
  review?: Maybe<Review>;
  issue?: Maybe<Issue>;
  issues: Array<Issue>;
  issuesCount: Scalars["Int"];
  currentUserID: Scalars["ID"];
  loginExpiresAt: Scalars["ID"];
  now: Scalars["ID"];
};

export type QueryAssetsArgs = {
  where?: Maybe<AssetWhereInput>;
  orderBy?: Maybe<AssetOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryLocationsArgs = {
  where?: Maybe<LocationWhereInput>;
  orderBy?: Maybe<LocationOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryPagesArgs = {
  where?: Maybe<PageWhereInput>;
  orderBy?: Maybe<PageOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryHelpPagesArgs = {
  where?: Maybe<HelpPageWhereInput>;
  orderBy?: Maybe<HelpPageOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryAssetArgs = {
  where: AssetWhereUniqueInput;
};

export type QueryLocationArgs = {
  where: LocationWhereUniqueInput;
};

export type QueryPageArgs = {
  where: PageWhereUniqueInput;
};

export type QueryHelpPageArgs = {
  where: HelpPageWhereUniqueInput;
};

export type QueryAssetsConnectionArgs = {
  where?: Maybe<AssetWhereInput>;
  orderBy?: Maybe<AssetOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryLocationsConnectionArgs = {
  where?: Maybe<LocationWhereInput>;
  orderBy?: Maybe<LocationOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryPagesConnectionArgs = {
  where?: Maybe<PageWhereInput>;
  orderBy?: Maybe<PageOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryHelpPagesConnectionArgs = {
  where?: Maybe<HelpPageWhereInput>;
  orderBy?: Maybe<HelpPageOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryNodeArgs = {
  id: Scalars["ID"];
};

export type QueryUsersArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<UserFilterInput>;
  sort?: Maybe<UserSortInput>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryLanguageArgs = {
  languageCode: Scalars["String"];
};

export type QueryDecksArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<DeckFilterInput>;
  sort?: Maybe<DeckSortInput>;
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

export type QueryIssueArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type QueryIssuesArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<IssueFilterInput>;
  sort?: Maybe<IssueSortingInput>;
};

export type QueryIssuesCountArgs = {
  filter?: Maybe<IssueFilterInput>;
};

export type ReportReason =
  | "inappropriate"
  | "copyright"
  | "spam"
  | "hatespeech"
  | "harassment";

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
  deck?: Maybe<IdComparator>;
  nextReviewAt?: Maybe<DateComparator>;
  box?: Maybe<NumberComparator>;
};

export type ReviewSortInput = {
  sortBy?: Maybe<ReviewSortOptions>;
  sortDirection?: Maybe<SortDirection>;
};

export type ReviewSortOptions = "nextReviewAt" | "box";

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type Rgba = {
  r: Scalars["RGBAHue"];
  g: Scalars["RGBAHue"];
  b: Scalars["RGBAHue"];
  a: Scalars["RGBATransparency"];
};

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type RgbaInput = {
  r: Scalars["RGBAHue"];
  g: Scalars["RGBAHue"];
  b: Scalars["RGBAHue"];
  a: Scalars["RGBATransparency"];
};

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
export type RichText = {
  raw?: Maybe<Scalars["RichTextAST"]>;
  html?: Maybe<Scalars["String"]>;
  markdown?: Maybe<Scalars["String"]>;
  text?: Maybe<Scalars["String"]>;
};

export type SortDirection = "asc" | "desc";

export type Status = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type StringComparator = {
  eq?: Maybe<Scalars["String"]>;
  ne?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Scalars["String"]>>;
  nin?: Maybe<Array<Scalars["String"]>>;
  all?: Maybe<Array<Scalars["String"]>>;
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
  nativeLanguage?: Maybe<Language>;
  languages: Array<Language>;
  ownedDecks: Array<Deck>;
  subscribedDecks: Array<Deck>;
  reviewQueue: Array<Review>;
  reviewsCount: Scalars["Int"];
  totalRating: Scalars["Int"];
  totalSubscribers: Scalars["Int"];
  badges: Array<Maybe<Scalars["String"]>>;
  isFollowedBy: Scalars["Boolean"];
  introStep?: Maybe<Scalars["Int"]>;
  feed: Array<Post>;
  subscriptionFeed: Array<Post>;
};

export type UserReviewQueueArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<ReviewFilterInput>;
  sort?: Maybe<ReviewSortInput>;
};

export type UserReviewsCountArgs = {
  filter?: Maybe<ReviewFilterInput>;
};

export type UserIsFollowedByArgs = {
  id: Scalars["ID"];
};

export type UserFeedArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<PostFilterInput>;
  sort?: Maybe<PostSortInput>;
};

export type UserSubscriptionFeedArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<PostFilterInput>;
  sort?: Maybe<PostSortInput>;
};

export type UserFilterInput = {
  search?: Maybe<Scalars["String"]>;
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

export type UserSortInput = {
  sortBy?: Maybe<UserSortOptions>;
  sortDirection?: Maybe<SortDirection>;
};

export type UserSortOptions =
  | "username"
  | "totalLikes"
  | "totalFavorites"
  | "followerCount";
export type ImageFragment = { __typename?: "Asset" } & Pick<
  Asset,
  "id" | "url" | "width" | "height"
>;

export type ShallowIssueFragment = { __typename?: "Issue" } & Pick<
  Issue,
  "id" | "title" | "postedAt" | "lastActivity" | "replyCount" | "editedOn"
> & { by: { __typename?: "User" } & Pick<User, "id" | "username" | "picture"> };

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
  "id" | "createdAt" | "type" | "content" | "likeCount" | "editedOn"
> & { by: { __typename?: "User" } & Pick<User, "id" | "username" | "picture"> };

export type AddPostMutationVariables = {
  input: PostInput;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<PostFilterInput>;
  sort?: Maybe<PostSortInput>;
};

export type AddPostMutation = { __typename?: "Mutation" } & {
  createPost: Maybe<
    Array<
      { __typename?: "Post" } & {
        originalPost: Maybe<
          { __typename?: "Post" } & ShallowPostFieldsFragment
        >;
      } & ShallowPostFieldsFragment
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

export type ChangePostLikeMutationVariables = {
  id: Scalars["ID"];
  userId: Scalars["ID"];
  value: Scalars["Boolean"];
};

export type ChangePostLikeMutation = { __typename?: "Mutation" } & {
  changePostLikeStatus: Maybe<
    { __typename?: "Post" } & Pick<Post, "id" | "isLikedBy" | "likeCount">
  >;
};

export type CreateIssueMutationVariables = {
  input: IssueInput;
};

export type CreateIssueMutation = { __typename?: "Mutation" } & {
  createIssue: Maybe<{ __typename?: "Issue" } & Pick<Issue, "id">>;
};

export type AddCardMutationVariables = {
  card: CardInput;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<CardFilterInput>;
  sort?: Maybe<CardSortInput>;
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
  userId: Scalars["ID"];
};

export type AddDeckMutation = { __typename?: "Mutation" } & {
  addDeck: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        ownedDecks: Array<
          { __typename?: "Deck" } & Pick<
            Deck,
            "id" | "name" | "cardCount" | "rating" | "isLikedBy"
          > & { language: { __typename?: "Language" } & LanguageFieldsFragment }
        >;
      }
  >;
};

export type DeleteCardsMutationVariables = {
  deckId: Scalars["ID"];
  cardIds: Array<Maybe<Scalars["ID"]>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<CardFilterInput>;
  sort?: Maybe<CardSortInput>;
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

export type DeleteIssueMutationVariables = {
  id: Scalars["ID"];
};

export type DeleteIssueMutation = { __typename?: "Mutation" } & {
  deleteIssue: Maybe<{ __typename?: "Issue" } & Pick<Issue, "id">>;
};

export type DeleteIssueReplyMutationVariables = {
  id: Scalars["ID"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<IssueReplyFilterInput>;
  sort?: Maybe<IssueReplySortInput>;
};

export type DeleteIssueReplyMutation = { __typename?: "Mutation" } & {
  deleteIssueReply: Maybe<
    { __typename?: "Issue" } & Pick<Issue, "id" | "replyCount"> & {
        replies: Array<{ __typename?: "IssueReply" } & Pick<IssueReply, "id">>;
      }
  >;
};

export type DeletePostMutationVariables = {
  id: Scalars["ID"];
};

export type DeletePostMutation = { __typename?: "Mutation" } & {
  deletePost: Maybe<Array<{ __typename?: "Post" } & Pick<Post, "id">>>;
};

export type EditIssueMutationVariables = {
  id: Scalars["ID"];
  input: IssueInput;
};

export type EditIssueMutation = { __typename?: "Mutation" } & {
  editIssue: Maybe<
    { __typename?: "Issue" } & Pick<Issue, "id" | "title" | "content">
  >;
};

export type EditIssueReplyMutationVariables = {
  id: Scalars["ID"];
  content: Scalars["String"];
};

export type EditIssueReplyMutation = { __typename?: "Mutation" } & {
  editIssueReply: Maybe<
    { __typename?: "IssueReply" } & Pick<IssueReply, "id" | "content">
  >;
};

export type RemoveTagMutationVariables = {
  deckId: Scalars["ID"];
  tag: Scalars["String"];
};

export type RemoveTagMutation = { __typename?: "Mutation" } & {
  removeTagFromDeck: Maybe<{ __typename?: "Deck" } & Pick<Deck, "id" | "tags">>;
};

export type ReplyToIssueMutationVariables = {
  id: Scalars["ID"];
  content: Scalars["String"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<IssueReplyFilterInput>;
  sort?: Maybe<IssueReplySortInput>;
};

export type ReplyToIssueMutation = { __typename?: "Mutation" } & {
  replyToIssue: Maybe<
    { __typename?: "Issue" } & Pick<Issue, "id" | "replyCount"> & {
        replies: Array<
          { __typename?: "IssueReply" } & Pick<
            IssueReply,
            "id" | "content" | "postedAt" | "editedOn"
          > & {
              by: { __typename?: "User" } & Pick<
                User,
                "id" | "username" | "picture"
              >;
            }
        >;
      }
  >;
};

export type ReportIssueMutationVariables = {
  id: Scalars["ID"];
  reason: ReportReason;
  message?: Maybe<Scalars["String"]>;
  userId: Scalars["ID"];
};

export type ReportIssueMutation = { __typename?: "Mutation" } & {
  reportIssue: Maybe<
    { __typename?: "Issue" } & Pick<Issue, "id" | "isReportedBy">
  >;
};

export type ReportIssueReplyMutationVariables = {
  id: Scalars["ID"];
  reason: ReportReason;
  message?: Maybe<Scalars["String"]>;
  userId: Scalars["ID"];
};

export type ReportIssueReplyMutation = { __typename?: "Mutation" } & {
  reportIssueReply: Maybe<
    { __typename?: "IssueReply" } & Pick<IssueReply, "id" | "isReportedBy">
  >;
};

export type ReportPostMutationVariables = {
  postId: Scalars["ID"];
  userId: Scalars["ID"];
  reason: ReportReason;
  message?: Maybe<Scalars["String"]>;
};

export type ReportPostMutation = { __typename?: "Mutation" } & {
  addReportToPost: Maybe<
    { __typename?: "Post" } & Pick<Post, "id" | "isReportedBy">
  >;
};

export type UpdateNowMutationVariables = {};

export type UpdateNowMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateNow"
>;

export type UpdatePostMutationVariables = {
  id: Scalars["ID"];
  content?: Maybe<Scalars["String"]>;
};

export type UpdatePostMutation = { __typename?: "Mutation" } & {
  editPost: Maybe<
    { __typename?: "Post" } & Pick<Post, "id" | "content" | "editedOn">
  >;
};

export type UploadProfilePictureMutationVariables = {
  userId: Scalars["ID"];
  file: Scalars["Upload"];
};

export type UploadProfilePictureMutation = { __typename?: "Mutation" } & {
  uploadProfilePicture: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "picture">
  >;
};

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

export type ChangeFollowingStatusMutationVariables = {
  userId: Scalars["ID"];
  currentUserId: Scalars["ID"];
  value: Scalars["Boolean"];
};

export type ChangeFollowingStatusMutation = { __typename?: "Mutation" } & {
  changeFollowingStatus: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "isFollowedBy">
  >;
};

export type ChangeLikeStatusMutationVariables = {
  userId: Scalars["ID"];
  deckId: Scalars["ID"];
  value: Scalars["Boolean"];
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
        nativeLanguage: Maybe<
          { __typename?: "Language" } & Pick<
            Language,
            "id" | "name" | "nativeName" | "languageCode"
          >
        >;
      }
  >;
};

export type AggregatedFeedQueryVariables = {
  userId: Scalars["ID"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<PostFilterInput>;
  sort?: Maybe<PostSortInput>;
};

export type AggregatedFeedQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        subscriptionFeed: Array<
          { __typename?: "Post" } & Pick<Post, "isLikedBy" | "isReportedBy"> & {
              originalPost: Maybe<
                { __typename?: "Post" } & Pick<Post, "isLikedBy"> &
                  ShallowPostFieldsFragment
              >;
            } & ShallowPostFieldsFragment
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
  currentUserId: Scalars["ID"];
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
      | "totalRating"
      | "totalSubscribers"
      | "isFollowedBy"
    >
  >;
};

export type HelpPageQueryVariables = {
  slug: Scalars["String"];
};

export type HelpPageQuery = { __typename?: "Query" } & {
  helpPage: Maybe<
    { __typename?: "HelpPage" } & Pick<
      HelpPage,
      "id" | "createdAt" | "displayType" | "title" | "header" | "foldTitles"
    > & {
        mainImage: Maybe<{ __typename?: "Asset" } & ImageFragment>;
        intro: Maybe<{ __typename?: "RichText" } & Pick<RichText, "raw">>;
        main: Maybe<{ __typename?: "RichText" } & Pick<RichText, "raw">>;
        folds: Array<{ __typename?: "RichText" } & Pick<RichText, "raw">>;
        outro: Maybe<{ __typename?: "RichText" } & Pick<RichText, "raw">>;
        references: Maybe<{ __typename?: "RichText" } & Pick<RichText, "raw">>;
      }
  >;
};

export type HelpPageListQueryVariables = {};

export type HelpPageListQuery = { __typename?: "Query" } & {
  helpPages: Array<
    Maybe<
      { __typename?: "HelpPage" } & Pick<
        HelpPage,
        "id" | "createdAt" | "title" | "slug"
      >
    >
  >;
};

export type PageQueryVariables = {
  slug: Scalars["String"];
};

export type PageQuery = { __typename?: "Query" } & {
  page: Maybe<
    { __typename?: "Page" } & Pick<
      Page,
      "id" | "header" | "imageHeader" | "imageSubheader"
    > & {
        mainImage: Maybe<{ __typename?: "Asset" } & ImageFragment>;
        intro: Maybe<{ __typename?: "RichText" } & Pick<RichText, "raw">>;
        main: Maybe<{ __typename?: "RichText" } & Pick<RichText, "raw">>;
        blurbs: Array<{ __typename?: "RichText" } & Pick<RichText, "raw">>;
        outro: Maybe<{ __typename?: "RichText" } & Pick<RichText, "raw">>;
      }
  >;
};

export type FeedQueryVariables = {
  userId: Scalars["ID"];
  currentUserId: Scalars["ID"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<PostFilterInput>;
  sort?: Maybe<PostSortInput>;
};

export type FeedQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<User, "id"> & {
        feed: Array<
          { __typename?: "Post" } & Pick<Post, "isLikedBy" | "isReportedBy"> & {
              originalPost: Maybe<
                { __typename?: "Post" } & Pick<Post, "isLikedBy"> &
                  ShallowPostFieldsFragment
              >;
            } & ShallowPostFieldsFragment
        >;
      }
  >;
};

export type GlobalDecksQueryVariables = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<DeckFilterInput>;
  sort?: Maybe<DeckSortInput>;
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

export type IssueQueryVariables = {
  id: Scalars["ID"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<IssueReplyFilterInput>;
  sort?: Maybe<IssueReplySortInput>;
  userId: Scalars["ID"];
};

export type IssueQuery = { __typename?: "Query" } & {
  issue: Maybe<
    { __typename?: "Issue" } & Pick<Issue, "content"> & {
        replies: Array<
          { __typename?: "IssueReply" } & Pick<
            IssueReply,
            "id" | "content" | "postedAt" | "editedOn" | "isReportedBy"
          > & {
              by: { __typename?: "User" } & Pick<
                User,
                "id" | "username" | "picture"
              >;
            }
        >;
      } & ShallowIssueFragment
  >;
};

export type IssuesQueryVariables = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<IssueFilterInput>;
  sort?: Maybe<IssueSortingInput>;
};

export type IssuesQuery = { __typename?: "Query" } & {
  issues: Array<{ __typename?: "Issue" } & ShallowIssueFragment>;
};

export type IssuesCountQueryVariables = {
  filter?: Maybe<IssueFilterInput>;
};

export type IssuesCountQuery = { __typename?: "Query" } & Pick<
  Query,
  "issuesCount"
>;

export type LanguageQueryVariables = {
  languageCode: Scalars["String"];
};

export type LanguageQuery = { __typename?: "Query" } & {
  language: Maybe<{ __typename?: "Language" } & LanguageFieldsFragment>;
};

export type LanguagesQueryVariables = {};

export type LanguagesQuery = { __typename?: "Query" } & {
  languages: Maybe<
    Array<Maybe<{ __typename?: "Language" } & LanguageFieldsFragment>>
  >;
};

export type ReviewsQueryVariables = {
  userId: Scalars["ID"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<ReviewFilterInput>;
  sort?: Maybe<ReviewSortInput>;
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
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<CardFilterInput>;
  sort?: Maybe<CardSortInput>;
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

export type ReviewsCountQueryVariables = {
  userId: Scalars["ID"];
  filter: ReviewFilterInput;
};

export type ReviewsCountQuery = { __typename?: "Query" } & {
  user: Maybe<{ __typename?: "User" } & Pick<User, "id" | "reviewsCount">>;
};

export type ShallowDecksQueryVariables = {
  id: Scalars["ID"];
  userId: Scalars["ID"];
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
        nativeLanguage: Maybe<
          { __typename?: "Language" } & LanguageFieldsFragment
        >;
      }
  >;
};

export type UsersQueryVariables = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  filter?: Maybe<UserFilterInput>;
  sort?: Maybe<UserSortInput>;
};

export type UsersQuery = { __typename?: "Query" } & {
  users: Maybe<
    Array<
      Maybe<
        { __typename?: "User" } & Pick<
          User,
          "id" | "picture" | "username" | "totalRating" | "totalSubscribers"
        >
      >
    >
  >;
};

import gql from "graphql-tag";
import * as ReactApollo from "react-apollo";
import * as ReactApolloHooks from "react-apollo-hooks";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export const imageFragmentDoc = gql`
  fragment image on Asset {
    id
    url
    width
    height
  }
`;
export const shallowIssueFragmentDoc = gql`
  fragment shallowIssue on Issue {
    id
    by {
      id
      username
      picture
    }
    title
    postedAt
    lastActivity
    replyCount
    editedOn
  }
`;
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
    likeCount
    editedOn
  }
`;
export const AddPostDocument = gql`
  mutation AddPost(
    $input: PostInput!
    $limit: Int
    $offset: Int
    $filter: PostFilterInput
    $sort: PostSortInput
  ) {
    createPost(
      input: $input
      limit: $limit
      offset: $offset
      filter: $filter
      sort: $sort
    ) {
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
export const ChangePostLikeDocument = gql`
  mutation ChangePostLike($id: ID!, $userId: ID!, $value: Boolean!) {
    changePostLikeStatus(id: $id, userID: $userId, value: $value) {
      id
      isLikedBy(userID: $userId)
      likeCount
    }
  }
`;
export type ChangePostLikeMutationFn = ReactApollo.MutationFn<
  ChangePostLikeMutation,
  ChangePostLikeMutationVariables
>;
export type ChangePostLikeProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    ChangePostLikeMutation,
    ChangePostLikeMutationVariables
  >
> &
  TChildProps;
export function withChangePostLike<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ChangePostLikeMutation,
    ChangePostLikeMutationVariables,
    ChangePostLikeProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ChangePostLikeMutation,
    ChangePostLikeMutationVariables,
    ChangePostLikeProps<TChildProps>
  >(ChangePostLikeDocument, {
    alias: "withChangePostLike",
    ...operationOptions
  });
}

export function useChangePostLikeMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ChangePostLikeMutation,
    ChangePostLikeMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ChangePostLikeMutation,
    ChangePostLikeMutationVariables
  >(ChangePostLikeDocument, baseOptions);
}
export const CreateIssueDocument = gql`
  mutation CreateIssue($input: IssueInput!) {
    createIssue(input: $input) {
      id
    }
  }
`;
export type CreateIssueMutationFn = ReactApollo.MutationFn<
  CreateIssueMutation,
  CreateIssueMutationVariables
>;
export type CreateIssueProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<CreateIssueMutation, CreateIssueMutationVariables>
> &
  TChildProps;
export function withCreateIssue<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CreateIssueMutation,
    CreateIssueMutationVariables,
    CreateIssueProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    CreateIssueMutation,
    CreateIssueMutationVariables,
    CreateIssueProps<TChildProps>
  >(CreateIssueDocument, {
    alias: "withCreateIssue",
    ...operationOptions
  });
}

export function useCreateIssueMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateIssueMutation,
    CreateIssueMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateIssueMutation,
    CreateIssueMutationVariables
  >(CreateIssueDocument, baseOptions);
}
export const AddCardDocument = gql`
  mutation AddCard(
    $card: CardInput!
    $limit: Int
    $offset: Int
    $filter: CardFilterInput
    $sort: CardSortInput
  ) {
    createCard(input: $card) {
      id
      cards(limit: $limit, offset: $offset, filter: $filter, sort: $sort) {
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
  mutation AddDeck($input: DeckInput!, $userId: ID!) {
    addDeck(input: $input) {
      id
      ownedDecks {
        id
        name
        cardCount
        rating
        isLikedBy(userID: $userId)
        language {
          ...languageFields
        }
      }
    }
  }
  ${languageFieldsFragmentDoc}
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
    $limit: Int
    $offset: Int
    $filter: CardFilterInput
    $sort: CardSortInput
  ) {
    deleteCards(deck: $deckId, ids: $cardIds) {
      id
      cards(limit: $limit, offset: $offset, filter: $filter, sort: $sort) {
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
export const DeleteIssueDocument = gql`
  mutation DeleteIssue($id: ID!) {
    deleteIssue(id: $id) {
      id
    }
  }
`;
export type DeleteIssueMutationFn = ReactApollo.MutationFn<
  DeleteIssueMutation,
  DeleteIssueMutationVariables
>;
export type DeleteIssueProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteIssueMutation, DeleteIssueMutationVariables>
> &
  TChildProps;
export function withDeleteIssue<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DeleteIssueMutation,
    DeleteIssueMutationVariables,
    DeleteIssueProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteIssueMutation,
    DeleteIssueMutationVariables,
    DeleteIssueProps<TChildProps>
  >(DeleteIssueDocument, {
    alias: "withDeleteIssue",
    ...operationOptions
  });
}

export function useDeleteIssueMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteIssueMutation,
    DeleteIssueMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteIssueMutation,
    DeleteIssueMutationVariables
  >(DeleteIssueDocument, baseOptions);
}
export const DeleteIssueReplyDocument = gql`
  mutation DeleteIssueReply(
    $id: ID!
    $limit: Int
    $offset: Int
    $filter: IssueReplyFilterInput
    $sort: IssueReplySortInput
  ) {
    deleteIssueReply(id: $id) {
      id
      replies(limit: $limit, offset: $offset, filter: $filter, sort: $sort) {
        id
      }
      replyCount
    }
  }
`;
export type DeleteIssueReplyMutationFn = ReactApollo.MutationFn<
  DeleteIssueReplyMutation,
  DeleteIssueReplyMutationVariables
>;
export type DeleteIssueReplyProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    DeleteIssueReplyMutation,
    DeleteIssueReplyMutationVariables
  >
> &
  TChildProps;
export function withDeleteIssueReply<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DeleteIssueReplyMutation,
    DeleteIssueReplyMutationVariables,
    DeleteIssueReplyProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteIssueReplyMutation,
    DeleteIssueReplyMutationVariables,
    DeleteIssueReplyProps<TChildProps>
  >(DeleteIssueReplyDocument, {
    alias: "withDeleteIssueReply",
    ...operationOptions
  });
}

export function useDeleteIssueReplyMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteIssueReplyMutation,
    DeleteIssueReplyMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteIssueReplyMutation,
    DeleteIssueReplyMutationVariables
  >(DeleteIssueReplyDocument, baseOptions);
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
export const EditIssueDocument = gql`
  mutation EditIssue($id: ID!, $input: IssueInput!) {
    editIssue(id: $id, input: $input) {
      id
      title
      content
    }
  }
`;
export type EditIssueMutationFn = ReactApollo.MutationFn<
  EditIssueMutation,
  EditIssueMutationVariables
>;
export type EditIssueProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<EditIssueMutation, EditIssueMutationVariables>
> &
  TChildProps;
export function withEditIssue<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    EditIssueMutation,
    EditIssueMutationVariables,
    EditIssueProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    EditIssueMutation,
    EditIssueMutationVariables,
    EditIssueProps<TChildProps>
  >(EditIssueDocument, {
    alias: "withEditIssue",
    ...operationOptions
  });
}

export function useEditIssueMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    EditIssueMutation,
    EditIssueMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    EditIssueMutation,
    EditIssueMutationVariables
  >(EditIssueDocument, baseOptions);
}
export const EditIssueReplyDocument = gql`
  mutation EditIssueReply($id: ID!, $content: String!) {
    editIssueReply(id: $id, content: $content) {
      id
      content
    }
  }
`;
export type EditIssueReplyMutationFn = ReactApollo.MutationFn<
  EditIssueReplyMutation,
  EditIssueReplyMutationVariables
>;
export type EditIssueReplyProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    EditIssueReplyMutation,
    EditIssueReplyMutationVariables
  >
> &
  TChildProps;
export function withEditIssueReply<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    EditIssueReplyMutation,
    EditIssueReplyMutationVariables,
    EditIssueReplyProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    EditIssueReplyMutation,
    EditIssueReplyMutationVariables,
    EditIssueReplyProps<TChildProps>
  >(EditIssueReplyDocument, {
    alias: "withEditIssueReply",
    ...operationOptions
  });
}

export function useEditIssueReplyMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    EditIssueReplyMutation,
    EditIssueReplyMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    EditIssueReplyMutation,
    EditIssueReplyMutationVariables
  >(EditIssueReplyDocument, baseOptions);
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
export const ReplyToIssueDocument = gql`
  mutation ReplyToIssue(
    $id: ID!
    $content: String!
    $limit: Int
    $offset: Int
    $filter: IssueReplyFilterInput
    $sort: IssueReplySortInput
  ) {
    replyToIssue(id: $id, content: $content) {
      id
      replies(limit: $limit, offset: $offset, filter: $filter, sort: $sort) {
        id
        content
        by {
          id
          username
          picture
        }
        postedAt
        editedOn
      }
      replyCount
    }
  }
`;
export type ReplyToIssueMutationFn = ReactApollo.MutationFn<
  ReplyToIssueMutation,
  ReplyToIssueMutationVariables
>;
export type ReplyToIssueProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<ReplyToIssueMutation, ReplyToIssueMutationVariables>
> &
  TChildProps;
export function withReplyToIssue<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ReplyToIssueMutation,
    ReplyToIssueMutationVariables,
    ReplyToIssueProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ReplyToIssueMutation,
    ReplyToIssueMutationVariables,
    ReplyToIssueProps<TChildProps>
  >(ReplyToIssueDocument, {
    alias: "withReplyToIssue",
    ...operationOptions
  });
}

export function useReplyToIssueMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ReplyToIssueMutation,
    ReplyToIssueMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ReplyToIssueMutation,
    ReplyToIssueMutationVariables
  >(ReplyToIssueDocument, baseOptions);
}
export const ReportIssueDocument = gql`
  mutation ReportIssue(
    $id: ID!
    $reason: ReportReason!
    $message: String
    $userId: ID!
  ) {
    reportIssue(id: $id, reason: $reason, message: $message) {
      id
      isReportedBy(id: $userId)
    }
  }
`;
export type ReportIssueMutationFn = ReactApollo.MutationFn<
  ReportIssueMutation,
  ReportIssueMutationVariables
>;
export type ReportIssueProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<ReportIssueMutation, ReportIssueMutationVariables>
> &
  TChildProps;
export function withReportIssue<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ReportIssueMutation,
    ReportIssueMutationVariables,
    ReportIssueProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ReportIssueMutation,
    ReportIssueMutationVariables,
    ReportIssueProps<TChildProps>
  >(ReportIssueDocument, {
    alias: "withReportIssue",
    ...operationOptions
  });
}

export function useReportIssueMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ReportIssueMutation,
    ReportIssueMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ReportIssueMutation,
    ReportIssueMutationVariables
  >(ReportIssueDocument, baseOptions);
}
export const ReportIssueReplyDocument = gql`
  mutation ReportIssueReply(
    $id: ID!
    $reason: ReportReason!
    $message: String
    $userId: ID!
  ) {
    reportIssueReply(id: $id, reason: $reason, message: $message) {
      id
      isReportedBy(id: $userId)
    }
  }
`;
export type ReportIssueReplyMutationFn = ReactApollo.MutationFn<
  ReportIssueReplyMutation,
  ReportIssueReplyMutationVariables
>;
export type ReportIssueReplyProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    ReportIssueReplyMutation,
    ReportIssueReplyMutationVariables
  >
> &
  TChildProps;
export function withReportIssueReply<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ReportIssueReplyMutation,
    ReportIssueReplyMutationVariables,
    ReportIssueReplyProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ReportIssueReplyMutation,
    ReportIssueReplyMutationVariables,
    ReportIssueReplyProps<TChildProps>
  >(ReportIssueReplyDocument, {
    alias: "withReportIssueReply",
    ...operationOptions
  });
}

export function useReportIssueReplyMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ReportIssueReplyMutation,
    ReportIssueReplyMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ReportIssueReplyMutation,
    ReportIssueReplyMutationVariables
  >(ReportIssueReplyDocument, baseOptions);
}
export const ReportPostDocument = gql`
  mutation ReportPost(
    $postId: ID!
    $userId: ID!
    $reason: ReportReason!
    $message: String
  ) {
    addReportToPost(
      id: $postId
      reportedBy: $userId
      reason: $reason
      message: $message
    ) {
      id
      isReportedBy(userID: $userId)
    }
  }
`;
export type ReportPostMutationFn = ReactApollo.MutationFn<
  ReportPostMutation,
  ReportPostMutationVariables
>;
export type ReportPostProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<ReportPostMutation, ReportPostMutationVariables>
> &
  TChildProps;
export function withReportPost<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ReportPostMutation,
    ReportPostMutationVariables,
    ReportPostProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ReportPostMutation,
    ReportPostMutationVariables,
    ReportPostProps<TChildProps>
  >(ReportPostDocument, {
    alias: "withReportPost",
    ...operationOptions
  });
}

export function useReportPostMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ReportPostMutation,
    ReportPostMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ReportPostMutation,
    ReportPostMutationVariables
  >(ReportPostDocument, baseOptions);
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
export const UpdatePostDocument = gql`
  mutation UpdatePost($id: ID!, $content: String) {
    editPost(id: $id, input: { content: $content }) {
      id
      content
      editedOn
    }
  }
`;
export type UpdatePostMutationFn = ReactApollo.MutationFn<
  UpdatePostMutation,
  UpdatePostMutationVariables
>;
export type UpdatePostProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdatePostMutation, UpdatePostMutationVariables>
> &
  TChildProps;
export function withUpdatePost<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UpdatePostMutation,
    UpdatePostMutationVariables,
    UpdatePostProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    UpdatePostMutation,
    UpdatePostMutationVariables,
    UpdatePostProps<TChildProps>
  >(UpdatePostDocument, {
    alias: "withUpdatePost",
    ...operationOptions
  });
}

export function useUpdatePostMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(UpdatePostDocument, baseOptions);
}
export const UploadProfilePictureDocument = gql`
  mutation UploadProfilePicture($userId: ID!, $file: Upload!) {
    uploadProfilePicture(userId: $userId, file: $file) {
      id
      picture
    }
  }
`;
export type UploadProfilePictureMutationFn = ReactApollo.MutationFn<
  UploadProfilePictureMutation,
  UploadProfilePictureMutationVariables
>;
export type UploadProfilePictureProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    UploadProfilePictureMutation,
    UploadProfilePictureMutationVariables
  >
> &
  TChildProps;
export function withUploadProfilePicture<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UploadProfilePictureMutation,
    UploadProfilePictureMutationVariables,
    UploadProfilePictureProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    UploadProfilePictureMutation,
    UploadProfilePictureMutationVariables,
    UploadProfilePictureProps<TChildProps>
  >(UploadProfilePictureDocument, {
    alias: "withUploadProfilePicture",
    ...operationOptions
  });
}

export function useUploadProfilePictureMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UploadProfilePictureMutation,
    UploadProfilePictureMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UploadProfilePictureMutation,
    UploadProfilePictureMutationVariables
  >(UploadProfilePictureDocument, baseOptions);
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
export const ChangeFollowingStatusDocument = gql`
  mutation ChangeFollowingStatus(
    $userId: ID!
    $currentUserId: ID!
    $value: Boolean!
  ) {
    changeFollowingStatus(
      id: $userId
      followerID: $currentUserId
      value: $value
    ) {
      id
      isFollowedBy(id: $currentUserId)
    }
  }
`;
export type ChangeFollowingStatusMutationFn = ReactApollo.MutationFn<
  ChangeFollowingStatusMutation,
  ChangeFollowingStatusMutationVariables
>;
export type ChangeFollowingStatusProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    ChangeFollowingStatusMutation,
    ChangeFollowingStatusMutationVariables
  >
> &
  TChildProps;
export function withChangeFollowingStatus<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ChangeFollowingStatusMutation,
    ChangeFollowingStatusMutationVariables,
    ChangeFollowingStatusProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ChangeFollowingStatusMutation,
    ChangeFollowingStatusMutationVariables,
    ChangeFollowingStatusProps<TChildProps>
  >(ChangeFollowingStatusDocument, {
    alias: "withChangeFollowingStatus",
    ...operationOptions
  });
}

export function useChangeFollowingStatusMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ChangeFollowingStatusMutation,
    ChangeFollowingStatusMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ChangeFollowingStatusMutation,
    ChangeFollowingStatusMutationVariables
  >(ChangeFollowingStatusDocument, baseOptions);
}
export const ChangeLikeStatusDocument = gql`
  mutation ChangeLikeStatus($userId: ID!, $deckId: ID!, $value: Boolean!) {
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
export const AggregatedFeedDocument = gql`
  query AggregatedFeed(
    $userId: ID!
    $limit: Int
    $offset: Int
    $filter: PostFilterInput
    $sort: PostSortInput
  ) {
    user(id: $userId) {
      id
      subscriptionFeed(
        limit: $limit
        offset: $offset
        filter: $filter
        sort: $sort
      ) {
        ...shallowPostFields
        isLikedBy(userID: $userId)
        isReportedBy(userID: $userId)
        originalPost {
          ...shallowPostFields
          isLikedBy(userID: $userId)
        }
      }
    }
  }
  ${shallowPostFieldsFragmentDoc}
`;
export type AggregatedFeedProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<AggregatedFeedQuery, AggregatedFeedQueryVariables>
> &
  TChildProps;
export function withAggregatedFeed<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AggregatedFeedQuery,
    AggregatedFeedQueryVariables,
    AggregatedFeedProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    AggregatedFeedQuery,
    AggregatedFeedQueryVariables,
    AggregatedFeedProps<TChildProps>
  >(AggregatedFeedDocument, {
    alias: "withAggregatedFeed",
    ...operationOptions
  });
}

export function useAggregatedFeedQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<AggregatedFeedQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    AggregatedFeedQuery,
    AggregatedFeedQueryVariables
  >(AggregatedFeedDocument, baseOptions);
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
  query Profile($id: ID!, $currentUserId: ID!) {
    user(id: $id) {
      id
      username
      email
      name
      picture
      introStep
      isSocial
      badges
      totalRating
      totalSubscribers
      isFollowedBy(id: $currentUserId)
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
export const HelpPageDocument = gql`
  query HelpPage($slug: String!) {
    helpPage(where: { slug: $slug }) {
      id
      createdAt
      displayType
      title
      header
      mainImage {
        ...image
      }
      intro {
        raw
      }
      main {
        raw
      }
      foldTitles
      folds {
        raw
      }
      outro {
        raw
      }
      references {
        raw
      }
    }
  }
  ${imageFragmentDoc}
`;
export type HelpPageProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<HelpPageQuery, HelpPageQueryVariables>
> &
  TChildProps;
export function withHelpPage<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    HelpPageQuery,
    HelpPageQueryVariables,
    HelpPageProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    HelpPageQuery,
    HelpPageQueryVariables,
    HelpPageProps<TChildProps>
  >(HelpPageDocument, {
    alias: "withHelpPage",
    ...operationOptions
  });
}

export function useHelpPageQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<HelpPageQueryVariables>
) {
  return ReactApolloHooks.useQuery<HelpPageQuery, HelpPageQueryVariables>(
    HelpPageDocument,
    baseOptions
  );
}
export const HelpPageListDocument = gql`
  query HelpPageList {
    helpPages(where: { displayType: Public }) {
      id
      createdAt
      title
      slug
    }
  }
`;
export type HelpPageListProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<HelpPageListQuery, HelpPageListQueryVariables>
> &
  TChildProps;
export function withHelpPageList<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    HelpPageListQuery,
    HelpPageListQueryVariables,
    HelpPageListProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    HelpPageListQuery,
    HelpPageListQueryVariables,
    HelpPageListProps<TChildProps>
  >(HelpPageListDocument, {
    alias: "withHelpPageList",
    ...operationOptions
  });
}

export function useHelpPageListQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<HelpPageListQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    HelpPageListQuery,
    HelpPageListQueryVariables
  >(HelpPageListDocument, baseOptions);
}
export const PageDocument = gql`
  query Page($slug: String!) {
    page(where: { slug: $slug }) {
      id
      header
      mainImage {
        ...image
      }
      imageHeader
      imageSubheader
      intro {
        raw
      }
      main {
        raw
      }
      blurbs {
        raw
      }
      outro {
        raw
      }
    }
  }
  ${imageFragmentDoc}
`;
export type PageProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<PageQuery, PageQueryVariables>
> &
  TChildProps;
export function withPage<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    PageQuery,
    PageQueryVariables,
    PageProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    PageQuery,
    PageQueryVariables,
    PageProps<TChildProps>
  >(PageDocument, {
    alias: "withPage",
    ...operationOptions
  });
}

export function usePageQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<PageQueryVariables>
) {
  return ReactApolloHooks.useQuery<PageQuery, PageQueryVariables>(
    PageDocument,
    baseOptions
  );
}
export const FeedDocument = gql`
  query Feed(
    $userId: ID!
    $currentUserId: ID!
    $limit: Int
    $offset: Int
    $filter: PostFilterInput
    $sort: PostSortInput
  ) {
    user(id: $userId) {
      id
      feed(limit: $limit, offset: $offset, filter: $filter, sort: $sort) {
        ...shallowPostFields
        isLikedBy(userID: $currentUserId)
        isReportedBy(userID: $currentUserId)
        originalPost {
          ...shallowPostFields
          isLikedBy(userID: $currentUserId)
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
  query GlobalDecks(
    $limit: Int
    $offset: Int
    $filter: DeckFilterInput
    $sort: DeckSortInput
    $userId: ID!
  ) {
    decks(limit: $limit, offset: $offset, filter: $filter, sort: $sort) {
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
export const IssueDocument = gql`
  query Issue(
    $id: ID!
    $limit: Int
    $offset: Int
    $filter: IssueReplyFilterInput
    $sort: IssueReplySortInput
    $userId: ID!
  ) {
    issue(id: $id) {
      ...shallowIssue
      content
      replies(limit: $limit, offset: $offset, filter: $filter, sort: $sort) {
        id
        content
        by {
          id
          username
          picture
        }
        postedAt
        editedOn
        isReportedBy(id: $userId)
      }
    }
  }
  ${shallowIssueFragmentDoc}
`;
export type IssueProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IssueQuery, IssueQueryVariables>
> &
  TChildProps;
export function withIssue<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IssueQuery,
    IssueQueryVariables,
    IssueProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IssueQuery,
    IssueQueryVariables,
    IssueProps<TChildProps>
  >(IssueDocument, {
    alias: "withIssue",
    ...operationOptions
  });
}

export function useIssueQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<IssueQueryVariables>
) {
  return ReactApolloHooks.useQuery<IssueQuery, IssueQueryVariables>(
    IssueDocument,
    baseOptions
  );
}
export const IssuesDocument = gql`
  query Issues(
    $limit: Int
    $offset: Int
    $filter: IssueFilterInput
    $sort: IssueSortingInput
  ) {
    issues(limit: $limit, offset: $offset, filter: $filter, sort: $sort) {
      ...shallowIssue
    }
  }
  ${shallowIssueFragmentDoc}
`;
export type IssuesProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IssuesQuery, IssuesQueryVariables>
> &
  TChildProps;
export function withIssues<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IssuesQuery,
    IssuesQueryVariables,
    IssuesProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IssuesQuery,
    IssuesQueryVariables,
    IssuesProps<TChildProps>
  >(IssuesDocument, {
    alias: "withIssues",
    ...operationOptions
  });
}

export function useIssuesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<IssuesQueryVariables>
) {
  return ReactApolloHooks.useQuery<IssuesQuery, IssuesQueryVariables>(
    IssuesDocument,
    baseOptions
  );
}
export const IssuesCountDocument = gql`
  query IssuesCount($filter: IssueFilterInput) {
    issuesCount(filter: $filter)
  }
`;
export type IssuesCountProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IssuesCountQuery, IssuesCountQueryVariables>
> &
  TChildProps;
export function withIssuesCount<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IssuesCountQuery,
    IssuesCountQueryVariables,
    IssuesCountProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IssuesCountQuery,
    IssuesCountQueryVariables,
    IssuesCountProps<TChildProps>
  >(IssuesCountDocument, {
    alias: "withIssuesCount",
    ...operationOptions
  });
}

export function useIssuesCountQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<IssuesCountQueryVariables>
) {
  return ReactApolloHooks.useQuery<IssuesCountQuery, IssuesCountQueryVariables>(
    IssuesCountDocument,
    baseOptions
  );
}
export const LanguageDocument = gql`
  query Language($languageCode: String!) {
    language(languageCode: $languageCode) {
      ...languageFields
    }
  }
  ${languageFieldsFragmentDoc}
`;
export type LanguageProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<LanguageQuery, LanguageQueryVariables>
> &
  TChildProps;
export function withLanguage<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LanguageQuery,
    LanguageQueryVariables,
    LanguageProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    LanguageQuery,
    LanguageQueryVariables,
    LanguageProps<TChildProps>
  >(LanguageDocument, {
    alias: "withLanguage",
    ...operationOptions
  });
}

export function useLanguageQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<LanguageQueryVariables>
) {
  return ReactApolloHooks.useQuery<LanguageQuery, LanguageQueryVariables>(
    LanguageDocument,
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
export const ReviewsDocument = gql`
  query Reviews(
    $userId: ID!
    $limit: Int
    $offset: Int
    $filter: ReviewFilterInput
    $sort: ReviewSortInput
  ) {
    user(id: $userId) {
      id
      reviewQueue(
        limit: $limit
        offset: $offset
        filter: $filter
        sort: $sort
      ) {
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
  query Cards(
    $deckID: ID!
    $limit: Int
    $offset: Int
    $filter: CardFilterInput
    $sort: CardSortInput
  ) {
    deck(id: $deckID) {
      id
      cardCount
      cards(limit: $limit, offset: $offset, filter: $filter, sort: $sort) {
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
  query ShallowDecks($id: ID!, $userId: ID!) {
    user(id: $id) {
      id
      ownedDecks {
        id
        name
        cardCount
        rating
        isLikedBy(userID: $userId)
        language {
          ...languageFields
        }
      }
      subscribedDecks {
        id
        name
        cardCount
        rating
        isLikedBy(userID: $userId)
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
export const UsersDocument = gql`
  query Users(
    $limit: Int
    $offset: Int
    $filter: UserFilterInput
    $sort: UserSortInput
  ) {
    users(limit: $limit, offset: $offset, filter: $filter, sort: $sort) {
      id
      picture
      username
      totalRating
      totalSubscribers
    }
  }
`;
export type UsersProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<UsersQuery, UsersQueryVariables>
> &
  TChildProps;
export function withUsers<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UsersQuery,
    UsersQueryVariables,
    UsersProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    UsersQuery,
    UsersQueryVariables,
    UsersProps<TChildProps>
  >(UsersDocument, {
    alias: "withUsers",
    ...operationOptions
  });
}

export function useUsersQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<UsersQueryVariables>
) {
  return ReactApolloHooks.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
