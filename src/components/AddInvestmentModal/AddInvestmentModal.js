import React from "react";
import styled from "styled-components";
import { Button, Header, Input, Modal, Form, Select } from "semantic-ui-react";
import { useQuery } from "@apollo/client";

import { GET_Companies_Lite } from "../../queries/companies";
import Loader from "../Shared/Loader";

const sanitizeResponse = ({ company }) => {
  const data = company.map((item) => {
    const option = {
      key: item.id,
      value: item.id,
      text: item.name,
    };
    return option;
  });
  return data;
};

const AddInvestmentModal = ({ trigger, open, setOpen }) => {
  const { data, loading } = useQuery(GET_Companies_Lite, {
    variables: {
      offset: 0,
      limit: 25,
    },
  });

  if (loading) {
    return <Loader />;
  }
  return (
    <StyledModal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={trigger}
    >
      <Header>
        Add Investments
        <Header.Subheader>
          Please Enter the Details of the Investment.
        </Header.Subheader>
      </Header>
      <Modal.Content>
        <Form onSubmit={() => setOpen(false)}>
          <Form.Field>
            <StyledSelect
              placeholder="Select Company"
              options={sanitizeResponse(data)}
            />
          </Form.Field>
          <Form.Field>
            <StyledInput type="number" placeholder="Investment Amount" />
          </Form.Field>
          <FormAction>
            <CancelButton onClick={() => setOpen(false)}>Cancel</CancelButton>
            <AddButton type="submit">Add Company</AddButton>
          </FormAction>
        </Form>
      </Modal.Content>
    </StyledModal>
  );
};

export default AddInvestmentModal;

const StyledInput = styled(Input)`
  & input {
    border: 0 !important;
    border-bottom: 1.2px solid black !important;
    border-radius: 0 !important;
  }
`;

const StyledSelect = styled(Select)`
  border: 0 !important;
  border-bottom: 1.2px solid black !important;
  border-radius: 0 !important;
`;

const FormAction = styled.div`
  text-align: right;
  margin-top: 10px;
`;

const AddButton = styled(Button)`
  background-color: ${(props) => props.theme.primary} !important;
  color: white !important;
`;

const CancelButton = styled(Button)`
  background: transparent !important;
  color: ${(props) => props.theme.primary} !important;
`;

const StyledModal = styled(Modal)`
  width: 40% !important;
`;
