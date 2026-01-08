declare namespace JSX {
  interface IntrinsicElements {
    "gmpx-api-loader": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        "solution-channel"?: string;
        key?: string;
      },
      HTMLElement
    >;
    "gmpx-store-locator": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        "map-id"?: string;
        [key: string]: any;
      },
      HTMLElement
    >;
  }
}
