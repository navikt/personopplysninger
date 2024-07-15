import { render } from '@testing-library/react';
import PageNotFound from '@/pages/404/404';

describe('PageNotFound', () => {
    it('renders correctly', () => {
        const { asFragment } = render(<PageNotFound />);
        expect(asFragment()).toMatchSnapshot();
    });
});
