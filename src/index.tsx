// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { render, createElement } from './reactish';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const main = document.getElementsByTagName('main')[0]!;

const App = () => (
  <div>
    <p>Hello, World!</p>
    <button
      onClick={() => alert('test')}
      className="test"
      style={{ color: 'red' }}
    >
      Click me
    </button>
  </div>
);

render(main, <App />);
