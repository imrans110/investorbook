import React from "react";
import styled from "styled-components";
import { Button, Header, Input, Modal, Form } from "semantic-ui-react";

const AddCompanyModal = ({ trigger, open, setOpen }) => {
  return (
    <StyledModal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={trigger}
    >
      <Header>
        Add Company
        <Header.Subheader>
          Please Enter the Details of the Company.
        </Header.Subheader>
      </Header>
      <Modal.Content>
        <Form onSubmit={() => setOpen(false)}>
          <Form.Field>
            <StyledInput
              required
              type="text"
              placeholder="Enter Company Name"
            />
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

export default AddCompanyModal;

const StyledInput = styled(Input)`
  & input {
    border: 0 !important;
    border-bottom: 1.2px solid black !important;
    border-radius: 0 !important;
  }
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
