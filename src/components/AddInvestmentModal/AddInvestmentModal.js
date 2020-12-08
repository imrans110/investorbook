import React, { useState } from "react";
import styled from "styled-components";
import { Button, Header, Input, Modal, Form, Select } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { GET_Companies_Lite } from "../../queries/companies";
import { Add_Investments } from "../../queries/investors";

import Loader from "../Shared/Loader";

const sanitizeResponse = ({ company }) => {
  const data = company.map((item) => {
    console.log();
    const option = {
      key: item.id,
      value: item.id,
      text: item.name,
    };
    return option;
  });
  return data;
};

const AddInvestmentModal = ({ trigger, open, setOpen, investor_id }) => {
  const [form, setForm] = useState({
    amount: null,
    company_id: null,
    investor_id,
  });
  const [loading, setLoading] = useState(false);

  const { data, loading: loadingCompanies } = useQuery(GET_Companies_Lite, {
    variables: {
      offset: 0,
      limit: 25,
    },
  });

  const [addInvestment] = useMutation(Add_Investments, {
    onCompleted({ insert_investment_one }) {
      toast.success(`New investment has been added successfully`);
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
    console.log({ name, value });
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    addInvestment({ variables: form });
  };

  if (loadingCompanies) {
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
        <Form loading={loading}>
          <Form.Field>
            <StyledSelect
              placeholder="Select Company"
              search
              onChange={handleChange}
              options={sanitizeResponse(data)}
              name="company_id"
            />
          </Form.Field>
          <Form.Field>
            <StyledInput
              required
              name="amount"
              type="number"
              onChange={handleChange}
              placeholder="Investment Amount"
            />
          </Form.Field>
          <FormAction>
            <CancelButton onClick={() => setOpen(false)}>Cancel</CancelButton>
            <AddButton onClick={handleSubmit}>Add Company</AddButton>
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
