import Link from 'next/link';
import { HeaderLogo, PageHeader, HeaderBrand, HeaderTitle } from './styles';

const Header = () => {
  return (
    <PageHeader>
      <HeaderBrand>
        <Link href="/" prefetch={false}>
          <HeaderLogo src="/img/logo-pet.png" alt="Logo" />
        </Link>
      </HeaderBrand>
    </PageHeader>
  );
};

export default Header;
