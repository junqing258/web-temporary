import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from '@/components/Spinner';

test('text value', () => {
  const a = 1;
  expect(a === 1).toBe(true);
});

test('Basic text value', () => {
  const { container, asFragment } = render(
    <Spinner>
      <p>hello</p>
    </Spinner>,
  );
  expect(container.firstChild).toHaveClass('bc_spinner--warp');
  expect(asFragment()).toMatchSnapshot();
});
