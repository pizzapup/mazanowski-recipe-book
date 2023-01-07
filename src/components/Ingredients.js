import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const initialValues = {
  ingredients: [
    {
      ingredient: "",
      amount: "",
    },
  ],
};

export const Ingredients = () => (
  <div>
    <h1>Ingredients</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="ingredients">
            {({ insert, remove, push, move }) => (
              <div>
                {values.ingredients.length > 0 &&
                  values.ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <div>
                        <label htmlFor={`ingredients.${index}.ingredient`}>
                          Name
                        </label>
                        <Field
                          name={`ingredients.${index}.ingredient`}
                          placeholder="syrup"
                          type="text"
                        />
                        <ErrorMessage
                          name={`ingredients.${index}.ingredient`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`ingredients.${index}.amount`}>
                          amount
                        </label>
                        <Field
                          name={`ingredients.${index}.amount`}
                          placeholder="1 tsp"
                          type="text"
                        />
                        <ErrorMessage
                          name={`ingredients.${index}.amount`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={() => push({ ingredient: "", amount: "" })}
                >
                  Add to list
                </button>
                <button
                  type="button"
                  onClick={() => move()}
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
