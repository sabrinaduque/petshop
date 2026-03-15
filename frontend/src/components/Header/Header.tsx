import Link from 'next/link';
import { HeaderLogo, PageHeader, HeaderBrand, HeaderTitle } from './styles';

const Header = () => {
  return (
    <PageHeader>
      <HeaderBrand>
        <Link href="/" prefetch={false}>
          <HeaderLogo src="/img/logo.svg" alt="Logo" />
        </Link>
        <HeaderTitle>Petshop</HeaderTitle>
      </HeaderBrand>
    </PageHeader>
  );
};

export default Header;
