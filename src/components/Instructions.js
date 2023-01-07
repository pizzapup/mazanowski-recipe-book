import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const initialValues = {
  instructions: [
    {
      instruction: "",
      step: 1,
    },
  ],
};

export const Instructions = () => (
  <div>
    <h1>instructions</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="instructions">
            {({ insert, remove, push }) => (
              <div>
                {values.instructions.length > 0 &&
                  values.instructions.map((ingredient, index) => (
                    <div
                      className="row"
                      key={index}
                    >
                      <div className="col">
                        <label htmlFor={`instructions.${index}.instruction`}>
                          instruction
                        </label>
                        <Field
                          name={`instructions.${index}.instruction`}
                          placeholder="syrup"
                          type="text"
                        />
                        <ErrorMessage
                          name={`instructions.${index}.instruction`}
                          component="div"
                          className="field-error"
                        />
                      </div>

                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ instruction: "" })}
                >
                  Add to list
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Done</button>
        </Form>
      )}
    </Formik>
  </div>
);
