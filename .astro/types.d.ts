declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"benefits": {
"backed-by-exceptional-customer-service.md": {
	id: "backed-by-exceptional-customer-service.md";
  slug: "backed-by-exceptional-customer-service";
  body: string;
  collection: "benefits";
  data: InferEntrySchema<"benefits">
} & { render(): Render[".md"] };
"built-on-20-years-experience.md": {
	id: "built-on-20-years-experience.md";
  slug: "built-on-20-years-experience";
  body: string;
  collection: "benefits";
  data: InferEntrySchema<"benefits">
} & { render(): Render[".md"] };
"carried-out-by-uniformed.md": {
	id: "carried-out-by-uniformed.md";
  slug: "carried-out-by-uniformed";
  body: string;
  collection: "benefits";
  data: InferEntrySchema<"benefits">
} & { render(): Render[".md"] };
"consistently-good-cleaning.md": {
	id: "consistently-good-cleaning.md";
  slug: "consistently-good-cleaning";
  body: string;
  collection: "benefits";
  data: InferEntrySchema<"benefits">
} & { render(): Render[".md"] };
"environmental-innovators.md": {
	id: "environmental-innovators.md";
  slug: "environmental-innovators";
  body: string;
  collection: "benefits";
  data: InferEntrySchema<"benefits">
} & { render(): Render[".md"] };
"environmentally-aware.md": {
	id: "environmentally-aware.md";
  slug: "environmentally-aware";
  body: string;
  collection: "benefits";
  data: InferEntrySchema<"benefits">
} & { render(): Render[".md"] };
"established-20-years.md": {
	id: "established-20-years.md";
  slug: "established-20-years";
  body: string;
  collection: "benefits";
  data: InferEntrySchema<"benefits">
} & { render(): Render[".md"] };
"ethical-employer-and-accredited.md": {
	id: "ethical-employer-and-accredited.md";
  slug: "ethical-employer-and-accredited";
  body: string;
  collection: "benefits";
  data: InferEntrySchema<"benefits">
} & { render(): Render[".md"] };
"flexible-and-bespoke.md": {
	id: "flexible-and-bespoke.md";
  slug: "flexible-and-bespoke";
  body: string;
  collection: "benefits";
  data: InferEntrySchema<"benefits">
} & { render(): Render[".md"] };
"peace-of-mind.md": {
	id: "peace-of-mind.md";
  slug: "peace-of-mind";
  body: string;
  collection: "benefits";
  data: InferEntrySchema<"benefits">
} & { render(): Render[".md"] };
"provided-by-an-ethical-employer.md": {
	id: "provided-by-an-ethical-employer.md";
  slug: "provided-by-an-ethical-employer";
  body: string;
  collection: "benefits";
  data: InferEntrySchema<"benefits">
} & { render(): Render[".md"] };
"value-for-money.md": {
	id: "value-for-money.md";
  slug: "value-for-money";
  body: string;
  collection: "benefits";
  data: InferEntrySchema<"benefits">
} & { render(): Render[".md"] };
};
"blog": {
"decoration-inspiration-in-the-reception-or-lobby.md": {
	id: "decoration-inspiration-in-the-reception-or-lobby.md";
  slug: "decoration-inspiration-in-the-reception-or-lobby";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-can-you-make-your-office-building-more-sustainable.md": {
	id: "how-can-you-make-your-office-building-more-sustainable.md";
  slug: "how-can-you-make-your-office-building-more-sustainable";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what’s-the-optimal-temperature-for-a-uk-office.md": {
	id: "what’s-the-optimal-temperature-for-a-uk-office.md";
  slug: "whats-the-optimal-temperature-for-a-uk-office";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"faq": {
"can-i-have-the-same-office-cleaner-consistently.md": {
	id: "can-i-have-the-same-office-cleaner-consistently.md";
  slug: "can-i-have-the-same-office-cleaner-consistently";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"can-i-request-a-different-cleaner.md": {
	id: "can-i-request-a-different-cleaner.md";
  slug: "can-i-request-a-different-cleaner";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"how-are-office-cleaners-vetted.md": {
	id: "how-are-office-cleaners-vetted.md";
  slug: "how-are-office-cleaners-vetted";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"how-do-i-pay-for-the-service.md": {
	id: "how-do-i-pay-for-the-service.md";
  slug: "how-do-i-pay-for-the-service";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"how-long-does-office-cleaning-take.md": {
	id: "how-long-does-office-cleaning-take.md";
  slug: "how-long-does-office-cleaning-take";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"what-about-cleaning-materials-and-products.md": {
	id: "what-about-cleaning-materials-and-products.md";
  slug: "what-about-cleaning-materials-and-products";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"what-if-im-dissatisfied-with-the-cleaning-service.md": {
	id: "what-if-im-dissatisfied-with-the-cleaning-service.md";
  slug: "what-if-im-dissatisfied-with-the-cleaning-service";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"what-if-the-cleaner-damages-something.md": {
	id: "what-if-the-cleaner-damages-something.md";
  slug: "what-if-the-cleaner-damages-something";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"what-if-the-cleaner-is-unavailable.md": {
	id: "what-if-the-cleaner-is-unavailable.md";
  slug: "what-if-the-cleaner-is-unavailable";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"what-is-included-in-the-office-cleaning-service.md": {
	id: "what-is-included-in-the-office-cleaning-service.md";
  slug: "what-is-included-in-the-office-cleaning-service";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
"will-office-cleaning-disrupt-work.md": {
	id: "will-office-cleaning-disrupt-work.md";
  slug: "will-office-cleaning-disrupt-work";
  body: string;
  collection: "faq";
  data: InferEntrySchema<"faq">
} & { render(): Render[".md"] };
};
"locations": {
"city-of-london-and-shoreditch.md": {
	id: "city-of-london-and-shoreditch.md";
  slug: "city-of-london-and-shoreditch";
  body: string;
  collection: "locations";
  data: InferEntrySchema<"locations">
} & { render(): Render[".md"] };
"kings-cross-islington.md": {
	id: "kings-cross-islington.md";
  slug: "kings-cross-islington";
  body: string;
  collection: "locations";
  data: InferEntrySchema<"locations">
} & { render(): Render[".md"] };
"lambeth-vauxhall.md": {
	id: "lambeth-vauxhall.md";
  slug: "lambeth-vauxhall";
  body: string;
  collection: "locations";
  data: InferEntrySchema<"locations">
} & { render(): Render[".md"] };
"soho-west-end.md": {
	id: "soho-west-end.md";
  slug: "soho-west-end";
  body: string;
  collection: "locations";
  data: InferEntrySchema<"locations">
} & { render(): Render[".md"] };
"waterloo-southwark.md": {
	id: "waterloo-southwark.md";
  slug: "waterloo-southwark";
  body: string;
  collection: "locations";
  data: InferEntrySchema<"locations">
} & { render(): Render[".md"] };
"westminster-victoria.md": {
	id: "westminster-victoria.md";
  slug: "westminster-victoria";
  body: string;
  collection: "locations";
  data: InferEntrySchema<"locations">
} & { render(): Render[".md"] };
};
"sectors": {
"architects-firms.md": {
	id: "architects-firms.md";
  slug: "architects-firms";
  body: string;
  collection: "sectors";
  data: InferEntrySchema<"sectors">
} & { render(): Render[".md"] };
"corporate-office-buildings.md": {
	id: "corporate-office-buildings.md";
  slug: "corporate-office-buildings";
  body: string;
  collection: "sectors";
  data: InferEntrySchema<"sectors">
} & { render(): Render[".md"] };
"financial-service-companies.md": {
	id: "financial-service-companies.md";
  slug: "financial-service-companies";
  body: string;
  collection: "sectors";
  data: InferEntrySchema<"sectors">
} & { render(): Render[".md"] };
"law-firms.md": {
	id: "law-firms.md";
  slug: "law-firms";
  body: string;
  collection: "sectors";
  data: InferEntrySchema<"sectors">
} & { render(): Render[".md"] };
"media-and-design-agencies.md": {
	id: "media-and-design-agencies.md";
  slug: "media-and-design-agencies";
  body: string;
  collection: "sectors";
  data: InferEntrySchema<"sectors">
} & { render(): Render[".md"] };
"medical-and-dental.md": {
	id: "medical-and-dental.md";
  slug: "medical-and-dental";
  body: string;
  collection: "sectors";
  data: InferEntrySchema<"sectors">
} & { render(): Render[".md"] };
"small-offices.md": {
	id: "small-offices.md";
  slug: "small-offices";
  body: string;
  collection: "sectors";
  data: InferEntrySchema<"sectors">
} & { render(): Render[".md"] };
"technology-companies.md": {
	id: "technology-companies.md";
  slug: "technology-companies";
  body: string;
  collection: "sectors";
  data: InferEntrySchema<"sectors">
} & { render(): Render[".md"] };
};
"services": {
"air-ducts-and-vents.md": {
	id: "air-ducts-and-vents.md";
  slug: "air-ducts-and-vents";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"bathrooms.md": {
	id: "bathrooms.md";
  slug: "bathrooms";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"bins-and-refuse-areas.md": {
	id: "bins-and-refuse-areas.md";
  slug: "bins-and-refuse-areas";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"curtains-and-blinds.md": {
	id: "curtains-and-blinds.md";
  slug: "curtains-and-blinds";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"desks-and-furniture.md": {
	id: "desks-and-furniture.md";
  slug: "desks-and-furniture";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"drains.md": {
	id: "drains.md";
  slug: "drains";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"floors.md": {
	id: "floors.md";
  slug: "floors";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"gutters-and-roofs.md": {
	id: "gutters-and-roofs.md";
  slug: "gutters-and-roofs";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"kitchens.md": {
	id: "kitchens.md";
  slug: "kitchens";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"lobbies-and-reception-areas.md": {
	id: "lobbies-and-reception-areas.md";
  slug: "lobbies-and-reception-areas";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"post-construction.md": {
	id: "post-construction.md";
  slug: "post-construction";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"pressure-cleaning.md": {
	id: "pressure-cleaning.md";
  slug: "pressure-cleaning";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
"windows.md": {
	id: "windows.md";
  slug: "windows";
  body: string;
  collection: "services";
  data: InferEntrySchema<"services">
} & { render(): Render[".md"] };
};
"testimonials": {
"01-xero.md": {
	id: "01-xero.md";
  slug: "01-xero";
  body: string;
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".md"] };
"02-lorem.md": {
	id: "02-lorem.md";
  slug: "02-lorem";
  body: string;
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../src/content/config.js");
}
