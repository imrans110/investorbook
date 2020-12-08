import React, { useState } from "react";
import styled from "styled-components";
import { Button, Header, Input, Modal, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { ADD_Investor } from "../../queries/investors";

const AddInvestorModal = ({ trigger, open, setOpen }) => {
  const [form, setForm] = useState({ name: "" });
  const [loading, setLoading] = useState(false);

  const [addInvestor] = useMutation(ADD_Investor, {
    onCompleted({ insert_investor_one }) {
      toast.success(
        `New investor [${insert_investor_one.name}] has been added successfully`
      );
      setOpen(false);
      setLoading(false);
    },
    onError(err) {
      toast.error(err.message);
      setOpen(false);
      setLoading(false);
    },
  });

  const handleChange = (e, { value, name }) => {
    e.preventDefault();
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    addInvestor({ variables: { name: form.name } });
  };

  return (
    <StyledModal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={trigger}
    >
      <Header>
        Add Investor
        <Header.Subheader>
          Please Enter the Details of the Investor.
        </Header.Subheader>
      </Header>
      <Modal.Content>
        <Form loading={loading}>
          <Form.Field
            name="name"
            onChange={handleChange}
            control={StyledInput}
            placeholder="Enter Investor Name"
            required
          />

          <FormAction>
            <CancelButton onClick={() => setOpen(false)}>Cancel</CancelButton>
            <AddButton disabled={loading} onClick={handleSubmit}>
              Add Investor
            </AddButton>
          </FormAction>
        </Form>
      </Modal.Content>
    </StyledModal>
  );
};

export default AddInvestorModal;

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
