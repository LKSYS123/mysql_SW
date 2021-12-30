import React from 'react';
import styled from 'styled-components'
import Button from '../common/Button';

const WriteActionButtonBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 3rem;
    float: right;
    button + button {
        margin-left: 0.5rem;
    }
`;

const StyledButton = styled(Button)`
    height: 2.125rem;
    & + & {
        margin-left: 0.5rem;
    }
`;

const WriteActionButtons = ({ onCancel, onPublish }) => {
    return (
        <WriteActionButtonBlock>
            <StyledButton cyan onClick={onPublish}>
                글 등록
            </StyledButton>
            <StyledButton onClick={onCancel}>취소</StyledButton>
        </WriteActionButtonBlock>
    );
};

export default WriteActionButtons;