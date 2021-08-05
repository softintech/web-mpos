// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Button, Card, Jumbotron, Modal, ProgressBar,InputGroup,FormControl,Image } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ShopsCreshopEditDialogHeader } from "./ShopsCreshopEditDialogHeader";


import {
  Input,
  Select,
  Switch,
  Upload,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const ShopsCreshopEditSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Firstname is required"),
  lastName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Lastname is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  userName: Yup.string().required("Username is required"),
  dateOfBbirth: Yup.mixed()
    .nullable(false)
    .required("Date of Birth is required"),
  ipAddress: Yup.string().required("IP Address is required"),
});

export function ShopsCreshopEditForm({
  saveShopsCreshop,
  ShopsCreshop,
  actionsLoading,
  onHide,
  id,
  useLang,
}) {
  const [state, setState] = React.useState({
    active: false
  })
  const [tempfile,setTempfiel] = React.useState('');
  const handleChange = (e, name) => {
    console.log(e.target.checked);
    setState({ ...state, [name]: e.target.checked });
  }
  console.log(tempfile); // เอาไฟล์ไปเก็บ server
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={ShopsCreshop}
        validationSchema={ShopsCreshopEditSchema}
        onSubmit={(values) => {
          saveShopsCreshop(values);
        }}
      >
        {({ handleSubmit }) => (
          <div className="row" >
            <Modal.Body className="overlay overlay-block cursor-default col-12">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right d-flex row">
                <Card className="col-md-4 pt-3 pb-3" style={{ height: "38vh" }}>   
                  <Field
                        name="pic"
                        component={Upload}
                        tempfile={setTempfiel}
                      />  
                </Card>
                <> </>
                <Card className="col-md-8" aria-labelledby="example-modal-sizes-title-lg">
                  <ShopsCreshopEditDialogHeader id={id} onHide={onHide} />
                  <div className="form-group row">
                    {/* First Name */}
                    <div className="col-lg-4">
                      <Field
                        name="firstName"
                        component={Input}
                        placeholder="First Name"
                        label="First Name"
                      />
                    </div>
                    {/* Last Name */}
                    <div className="col-lg-4">
                      <Field
                        name="lastName"
                        component={Input}
                        placeholder="Last Name"
                        label="Last Name"
                      />
                    </div>
                    {/* Login */}
                    <div className="col-lg-4">
                      <Field
                        name="userName"
                        component={Input}
                        placeholder="Login"
                        label="Login"
                      />
                    </div>
                  </div>
                  {/* Email */}
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <Field
                        type="email"
                        name="email"
                        component={Input}
                        placeholder="Email"
                        label="Email"
                      />
                    </div>
                    {/* Date of birth */}
                    <div className="col-lg-4">
                      <DatePickerField
                        name="dateOfBbirth"
                        label="Date of Birth"
                      />
                    </div>
                    {/* IP Address */}
                    <div className="col-lg-4">
                      <Field
                        name="ipAddress"
                        component={Input}
                        placeholder="IP Address"
                        label="IP Address"
                        customFeedbackLabel="We'll never share ShopsCreshop IP Address with anyone else"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    {/* Gender */}
                    <div className="col-lg-4">
                      <Select name="Gender" label="Gender">
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </Select>
                    </div>
                    {/* Type */}
                    <div className="col-lg-4">
                      <Select name="type" label="Type">
                        <option value="0">Business</option>
                        <option value="1">Individual</option>
                      </Select>
                    </div>
                  </div>
                </Card>


              </Form>
            </Modal.Body>
            <Modal.Footer className=" col-12  pl-3 pr-3" >
              <Card style={{width:'100%'}} className="p-3">
              <div className="d-flex" style={{width:'100%'}}>
                <div
                  className="mr-auto "
                >
                  <Switch onChange={(e) => handleChange(e, 'active')} lng={useLang} checked={state.active} />
                </div>
                <div className="ml-auto" >
                  <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                  >
                    {useLang=='en'?'Cancel':'ยกเลิก'}
                  </button>
                  <> </>
                  <button
                    type="submit"
                    onClick={() => handleSubmit()}
                    className="btn btn-primary btn-elevate"
                  >
                    {useLang=='en'?'Save':'บันทึก'}
                  </button>
                </div>
              </div>
              </Card>

            </Modal.Footer>
          </div>
        )}
      </Formik>
    </>
  );
}
