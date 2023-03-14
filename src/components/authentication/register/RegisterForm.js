/* eslint-disable consistent-return */
import * as Yup from 'yup';
import PhoneInput from 'react-phone-number-input'
import "react-phone-number-input/style.css";
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';

import { useNavigate } from 'react-router-dom';

// hooks
//import { createUser } from '../../../redux/reducers/auth/UserReducer';

import { addUser } from '../../..//store/users';

import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';

//import { loadusers , addUser } from "../../../store/users";


export default function RegisterForm() {

  const dispatch = useDispatch();

    const navigate = useNavigate();

    const [contactMethod, setContactMethod] = useState('email');

    const [showPassword, setShowPassword] = useState(false);

   const [errorMessage, setErrorMessage] = useState(null);

   const [pic, setPic] = useState(null);


    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('First name required'),
        lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
        email: Yup.string().email('Email must be a valid email address'),
        phone: Yup.string(),
        password: Yup.string().required('Password is required')
      });


    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: 'user',
          phone: '',
          pic:''
        },
        validationSchema: RegisterSchema,
        onSubmit: async (data) => {
          console.log(data);
          const formData = new FormData();
          if (pic) {
            formData.append('file', pic);
          }
          formData.append('firstName', data?.firstName);
          formData.append('lastName', data?.lastName);
          formData.append('email', data?.email);
          formData.append('password', data?.password);
          formData.append('role', data?.role);
          formData.append('phone', data?.phone);

          const userData = formData;
          const result =  dispatch(addUser(userData));

          Promise.resolve(result).then(error => {
            if (error === 'phone' || error === 'email') {
              setErrorMessage("A User with this " +error+ " already exists");

              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);

            }else{
              if(data.email !==""){
                navigate("/login")
              }
              if(data.phone!=""){
                navigate("/verify-account-sms")
              }
            }
          });
        }

      });

      const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;


      const handleContactMethodChange = (event) => {
        setContactMethod(event.target.value);
        if(event.target.value==="email"){
          setFieldValue('phone', "");
      };
        if(event.target.value==="phone"){
            setFieldValue('email', "");
        };
    }

    const handleChangeFile = (event) => {
      setPic(event.target.files[0]);
    };

    return (


<FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
        <Stack sm={6} xs={12}>
            <TextField name="pic" fullWidth type="file" onChange={handleChangeFile} />

            <div
              style={{
                display: 'flex',
                width: '100%',

                justifyContent: 'center'
              }}
            >
              <img
                src={
                  // eslint-disable-next-line no-nested-ternary
                  pic
                    ? URL.createObjectURL(pic)
                    : touched?.pic
                    ? touched?.pic
                    : 'https://res.cloudinary.com/clouder32/image/upload/v1655285221/1200px-Breezeicons-actions-22-im-user.svg_r4qbs1.png'
                }
                alt="UserImage"
                style={{
                  width: '40%',
                  height: '20%',
                  objectFit: 'contain',
                  paddingTop: 16
                }}
              />
            </div>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Name"
              name="firstName"
              type="text"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
            
          </Stack>
         
            
       
          <RadioGroup value={contactMethod} onChange={handleContactMethodChange}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <FormControlLabel value="email" control={<Radio />} label="Email" />
        <FormControlLabel value="phone" control={<Radio />} label="Phone number" />
        </Stack>

      </RadioGroup>
      {contactMethod === 'email' ? (
        <TextField
          fullWidth
          label="Email"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      ) : (

        <PhoneInput 
        placeholder="Phone number"
        value={formik.values.phone}
        onChange={(value) => formik.setFieldValue('phone', value)}
        onBlur={formik.handleBlur('phone')}
        defaultCountry="TN" 
      />

       
       /* <TextField
        
          fullWidth
          label="Phone number"
          {...formik.getFieldProps('phone')}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />*/
      )}

     


          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />


        <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Inscription
          </LoadingButton>


          {errorMessage?<Alert severity="error">{errorMessage}</Alert>:""}
          


        </Stack>
      </Form>
    </FormikProvider>





    );
}
