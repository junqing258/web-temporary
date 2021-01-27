import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from '@/components/Spinner';

test('Spinner text value', () => {
  const { container, asFragment } = render(
    <Spinner>
      <p>hello</p>
    </Spinner>,
  );
  expect(container.firstChild).toHaveClass('bc_spinner--warp');
  expect(asFragment()).toMatchSnapshot();
});
