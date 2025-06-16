import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";



const ErrorModal = ({ message, onRetry }) => {
  return (
    <Overlay>
      <ModalBox>
        <Message>{message || "Something went wrong!"}</Message>
        <RetryButton onClick={onRetry}>Retry</RetryButton>
      </ModalBox>
    </Overlay>
  );
};

ErrorModal.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const Message = styled.p`
  margin-bottom: 1.5rem;
  color: #d32f2f;
  font-size: 1.1rem;
`;

const RetryButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #115293;
  }
`;
