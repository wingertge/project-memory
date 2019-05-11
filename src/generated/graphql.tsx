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
  /** The `Upload` scalar type represents a file upload. */
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
};

export type AssetCreateOneWithoutMainImagePageInput = {
  create?: Maybe<AssetCreateWithoutMainImagePageInput>;
  connect?: Maybe<AssetWhereUniqueInput>;
};

export type AssetCreateWithoutMainImagePageInput = {
  status?: Maybe<Status>;
  handle: Scalars["String"];
  fileName: Scalars["String"];
  height?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  mimeType?: Maybe<Scalars["String"]>;
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

export type AssetUpdateOneWithoutMainImagePageInput = {
  create?: Maybe<AssetCreateWithoutMainImagePageInput>;
  connect?: Maybe<AssetWhereUniqueInput>;
  disconnect?: Maybe<Scalars["Boolean"]>;
  delete?: Maybe<Scalars["Boolean"]>;
  update?: Maybe<AssetUpdateWithoutMainImagePageDataInput>;
  upsert?: Maybe<AssetUpsertWithoutMainImagePageInput>;
};

export type AssetUpdateWithoutMainImagePageDataInput = {
  status?: Maybe<Status>;
  handle?: Maybe<Scalars["String"]>;
  fileName?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["Float"]>;
  width?: Maybe<Scalars["Float"]>;
  size?: Maybe<Scalars["Float"]>;
  mimeType?: Maybe<Scalars["String"]>;
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
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  sortDirection?: Maybe<SortDirection>;
  sortBy?: Maybe<CardSortingOptions>;
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
  excludeOwnedBy?: Maybe<Array<Scalars["ID"]>>;
  excludeSubscribedBy?: Maybe<Array<Scalars["ID"]>>;
};

export type DeckInput = {
  name?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["String"]>;
  language?: Maybe<Scalars["ID"]>;
  nativeLanguage?: Maybe<Scalars["ID"]>;
  cards?: Maybe<Array<Maybe<CardInput>>>;
};

export type DeckSortBy = "name" | "cardCount" | "rating" | "subscriberCount";

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
  updateAsset?: Maybe<Asset>;
  updatePage?: Maybe<Page>;
  deleteAsset?: Maybe<Asset>;
  deleteLocation?: Maybe<Location>;
  deletePage?: Maybe<Page>;
  upsertAsset: Asset;
  upsertPage: Page;
  updateManyAssets: BatchPayload;
  updateManyPages: BatchPayload;
  deleteManyAssets: BatchPayload;
  deleteManyLocations: BatchPayload;
  deleteManyPages: BatchPayload;
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

export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};

export type MutationCreatePageArgs = {
  data: PageCreateInput;
};

export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput;
  where: AssetWhereUniqueInput;
};

export type MutationUpdatePageArgs = {
  data: PageUpdateInput;
  where: PageWhereUniqueInput;
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

export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyMutationInput;
  where?: Maybe<AssetWhereInput>;
};

export type MutationUpdateManyPagesArgs = {
  data: PageUpdateManyMutationInput;
  where?: Maybe<PageWhereInput>;
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

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars["ID"];
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
  assets: Array<Maybe<Asset>>;
  locations: Array<Maybe<Location>>;
  pages: Array<Maybe<Page>>;
  asset?: Maybe<Asset>;
  location?: Maybe<Location>;
  page?: Maybe<Page>;
  assetsConnection: AssetConnection;
  locationsConnection: LocationConnection;
  pagesConnection: PageConnection;
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

export type QueryAssetArgs = {
  where: AssetWhereUniqueInput;
};

export type QueryLocationArgs = {
  where: LocationWhereUniqueInput;
};

export type QueryPageArgs = {
  where: PageWhereUniqueInput;
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

export type QueryNodeArgs = {
  id: Scalars["ID"];
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
  nativeLanguage?: Maybe<Language>;
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
export type ImageFragment = { __typename?: "Asset" } & Pick<
  Asset,
  "id" | "url" | "width" | "height"
>;

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
      | "totalRating"
      | "totalSubscribers"
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
        nativeLanguage: Maybe<
          { __typename?: "Language" } & LanguageFieldsFragment
        >;
      }
  >;
};

export type UsersQueryVariables = {
  filter: UserFilterInput;
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
      totalRating
      totalSubscribers
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
export const UsersDocument = gql`
  query Users($filter: UserFilterInput!) {
    users(filter: $filter) {
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
