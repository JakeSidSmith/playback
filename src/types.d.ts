// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string, any>;

type JSXChildren =
  | readonly (JSXElement | JSXChildren | string | number | null | undefined)[];

type JSXStyle = Partial<Omit<CSSStyleDeclaration, 'length' | 'parentRule'>>;

interface JSXIntrinsicElement<T extends keyof JSX.IntrinsicElements> {
  type: T;
  props: JSX.IntrinsicElements[T];
  children: JSXChildren;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface JSXFunctionElement<T extends FunctionComponent<any>> {
  type: T;
  props: Parameters<T>[0];
  children: JSXChildren;
}

type JSXElement =
  | JSXIntrinsicElement<keyof JSX.IntrinsicElements>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | JSXFunctionElement<FunctionComponent<any>>;

type FunctionComponent<P extends AnyObject> = (props: P) => JSXElement | null;

interface CommonProps {
  className?: string;
  style?: JSXStyle;
  onClick?: (event: MouseEvent) => void;
}

declare namespace JSX {
  interface IntrinsicElements {
    div: CommonProps;
    button: CommonProps;
    p: CommonProps;
  }
}
