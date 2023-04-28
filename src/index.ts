// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const main = document.getElementsByTagName('main')[0]!;

main.innerHTML = '';
const paragraph = document.createElement('p');
paragraph.innerHTML = 'Loaded!';

main.appendChild(paragraph);
