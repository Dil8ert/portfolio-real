import { MemoryRouter } from 'react-router-dom';
import { render, within } from '@test-utils';
import userEvent from '@testing-library/user-event';
import { MobileNavbar } from './MobileNavbar';

function DummyPage() {
  return <div>page content</div>;
}

describe('MobileNavbar', () => {
  it('closes the sidebar when a nav link is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter initialEntries={['/home']}>
        <MobileNavbar component={DummyPage} />
      </MemoryRouter>
    );

    const burger = container.querySelector('.mantine-Burger-root');
    expect(burger).toBeTruthy();
    await user.click(burger as HTMLElement);

    const burgerIcon = container.querySelector('.mantine-Burger-burger');
    expect(burgerIcon).toHaveAttribute('data-opened', 'true');

    const navbar = container.querySelector('nav');
    expect(navbar).toBeTruthy();
    await user.click(within(navbar as HTMLElement).getByRole('link', { name: 'Blog' }));

    expect(container.querySelector('.mantine-Burger-burger')).not.toHaveAttribute('data-opened');
  });
});
