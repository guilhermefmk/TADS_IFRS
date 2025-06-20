import React from "react";
import { View, TextInput, Text, Button } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { PostFetch, urls } from "../services/apiBase";


// Validation schema
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  bio: Yup.string().required("Bio is required"),
});

const RegisterForm = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", bio: "" }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        console.log("Submitted", values);
        createUser(values)
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View className="p-4">
          <TextInput
            className="border border-gray-300 p-2 rounded mb-2"
            placeholder="Name"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />
          {touched.name && errors.name && (
            <Text className="text-red-500 mb-2">{errors.name}</Text>
          )}

          <TextInput
            className="border border-gray-300 p-2 rounded mb-2"
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          {touched.email && errors.email && (
            <Text className="text-red-500 mb-2">{errors.email}</Text>
          )}

          <TextInput
            className="border border-gray-300 p-2 rounded mb-2"
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />
          {touched.password && errors.password && (
            <Text className="text-red-500 mb-2">{errors.password}</Text>
          )}

          <TextInput
            className="border border-gray-300 p-2 rounded mb-2"
            placeholder="Bio"
            onChangeText={handleChange("bio")}
            onBlur={handleBlur("bio")}
            value={values.bio}
          />
          {touched.bio && errors.bio && (
            <Text className="text-red-500 mb-2">{errors.bio}</Text>
          )}

          <Button title="Register" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;
