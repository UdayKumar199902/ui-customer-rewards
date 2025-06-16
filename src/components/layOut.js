import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header>Customer Rewards Dashboard</Header>
      {children}
    </Wrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
