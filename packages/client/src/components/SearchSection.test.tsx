import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react';
import SearchSection from './SearchSection';

test('renders section title', () => {
  render(<SearchSection title="Test Section" items={[]} renderItem={() => <div>Item</div>} />);
  expect(screen.getByText('Test Section')).toBeInTheDocument();
});

test('renders items', () => {
  const items = ['Item 1', 'Item 2'];
  render(
    <SearchSection
      title="Test Section"
      items={items}
      renderItem={(item) => <div key={item}>{item}</div>}
    />
  );
  expect(screen.getByText('Item 1')).toBeInTheDocument();
  expect(screen.getByText('Item 2')).toBeInTheDocument();
});

test('renders no items message', () => {
  render(<SearchSection title="Test Section" items={[]} renderItem={() => <div>Item</div>} />);
  expect(screen.getByText('No test section matched')).toBeInTheDocument();
});
