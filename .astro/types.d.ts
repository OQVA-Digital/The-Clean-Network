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
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

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
"peace-of-mind.md": {
	id: "peace-of-mind.md";
  slug: "peace-of-mind";
  body: string;
  collection: "benefits";
  data: InferEntrySchema<"benefits">
} & { render(): Render[".md"] };
};
"blog": {
"blog-post-01.md": {
	id: "blog-post-01.md";
  slug: "blog-post-01";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blog-post-02.md": {
	id: "blog-post-02.md";
  slug: "blog-post-02";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blog-post-03.md": {
	id: "blog-post-03.md";
  slug: "blog-post-03";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blog-post-04.md": {
	id: "blog-post-04.md";
  slug: "blog-post-04";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blog-post-05.md": {
	id: "blog-post-05.md";
  slug: "blog-post-05";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blog-post-06.md": {
	id: "blog-post-06.md";
  slug: "blog-post-06";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blog-post-07.md": {
	id: "blog-post-07.md";
  slug: "blog-post-07";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blog-post-08.md": {
	id: "blog-post-08.md";
  slug: "blog-post-08";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blog-post-09.md": {
	id: "blog-post-09.md";
  slug: "blog-post-09";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blog-post-10.md": {
	id: "blog-post-10.md";
  slug: "blog-post-10";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blog-post-11.md": {
	id: "blog-post-11.md";
  slug: "blog-post-11";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blog-post-12.md": {
	id: "blog-post-12.md";
  slug: "blog-post-12";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"first-test-blog-post-01.md": {
	id: "first-test-blog-post-01.md";
  slug: "first-test-blog-post-01";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-make-your-office-building-more-sustainable.md": {
	id: "how-to-make-your-office-building-more-sustainable.md";
  slug: "how-to-make-your-office-building-more-sustainable";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
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

	type ContentConfig = typeof import("../src/content/config");
}
