import styled from 'styled-components';

export const TransactionStyled = styled.div`
  max-height: calc(100vh - 100px);
  overflow: auto;
  .ant-card-head {
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
  }
  .ant-collapse {
    border: none;
    .ant-collapse-item {
      border: none;
      background: white;
      /* border-top: 1px solid #ececec; */
    }
  }
`;
export const ButtonConnect = styled.button`
  background-color: rgb(46, 29, 69);
  border-color: white;
  color: white;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-color: white;
`;
export const TransactionBlock = styled.div`
  .ant-collapse .ant-collapse-content > .ant-collapse-content-box {
    padding: 16px 0;
    .ant-card {
      border-color: #cfcccc;
    }
  }
`;
