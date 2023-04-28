import { isArray } from './utils';

export const createElement = <T extends keyof JSX.IntrinsicElements>(
  type: T,
  props: JSX.IntrinsicElements[T],
  ...children: JSXChildren
) => ({
  type,
  props,
  children: (children ?? []).flat(),
});

const renderElement = (target: HTMLElement, element: JSXElement) => {
  if (typeof element.type === 'function') {
    const result = element.type(element.props);

    if (result) {
      renderElement(target, result);
    }

    return;
  }

  const node = document.createElement(element.type);

  Object.entries(element.props || {}).forEach(([key, value]) => {
    if (key === 'className') {
      node.setAttribute('class', value);
      return;
    }

    if (key === 'style') {
      Object.entries(value).forEach(([styleKey, styleValue]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (node.style as any)[styleKey] = styleValue;
      });
      return;
    }

    if (key.startsWith('on')) {
      const event = key.substring(2).toLowerCase();
      node.addEventListener(event, value);
      return;
    }

    node.setAttribute(key, value.toString());
  });

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  renderChildren(node, element.children);

  target.appendChild(node);
};

const renderChildren = (target: HTMLElement, children: JSXChildren) => {
  children.forEach((child) => {
    if (isArray(child)) {
      renderChildren(target, child);
      return;
    }

    if (typeof child === 'string' || typeof child === 'number') {
      const textNode = document.createTextNode(child.toString());
      target.appendChild(textNode);
      return;
    }

    if (!child || typeof child === 'boolean') {
      return;
    }

    renderElement(target, child);
  });
};

export const render = (target: HTMLElement, element: JSXElement) => {
  window.requestAnimationFrame(() => {
    target.innerHTML = '';

    renderElement(target, element);
  });

  return () => {
    target.innerHTML = '';
  };
};
