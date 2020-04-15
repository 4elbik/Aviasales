import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/logo.svg';

const Header = () => <Logo className="header" />;

const Logo = styled.div`
    margin: 0 auto;
    margin-bottom: 31px;
    width: 82px;
    height: 89px;
    background-image: url("${logo}");
`;

export default Header;
