/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import * as yup from "yup";

interface MainFormProps {
  className?: string;
  children?: any;
  onSubmit: (values: any) => any;
  formId: string;
  validationSchema?: yup.AnyObjectSchema;
  defaultValues?: any;
}

export default function MainForm({
  className,
  children,
  onSubmit,
  formId,
  validationSchema,
  defaultValues,
}: MainFormProps) {
  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {() => (
        <Form id={formId} className={className}>
          {children}
        </Form>
      )}
    </Formik>
  );
}
