import { useEffect, useState } from "react";

const Form = ({ fields, submitFunction, submitButtonLabel }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(
    fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.initialValue }),
      {}
    )
  ); // dynamically generate initial form values based on fields prop
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const errors = {};

    fields.forEach((field) => {
      const { name, label, required, validationRules } = field;
      const fieldValue = formValues[name];

      if (required && !fieldValue) {
        errors[name] = `${label} is required`;
      }

      if (validationRules) {
        validationRules.forEach((rule) => {
          if (!rule.validate(fieldValue)) {
            errors[name] = rule.message;
          }
        });
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        await submitFunction(formValues);
      } catch (err) {
        console.log("error in form submission", err);
      } finally {
        setIsLoading(false);
        setFormValues(
          fields.reduce(
            (acc, field) => ({ ...acc, [field.name]: field.initialValue }),
            {}
          )
        );
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prevValues) => ({ ...prevValues, [name]: newValue }));

    setFormErrors((prevErrors) => {
      const { [name]: removedError, ...rest } = prevErrors;
      return rest;
    });
  };

  return (
    <form
      className="bg-white shadow rounded px-8 pt-2 pb-2 mb-4"
      onSubmit={handleSubmit}
    >
      <div className="my-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
        {fields.map((field) => {
          const { name, label, type, options, placeholder } = field;

          return (
            <div key={name}>
              <label className="form-label">{label}</label>
              {type === "select" ? (
                <select
                  name={name}
                  className={`form-input ${
                    formErrors[name] ? "border-red-500" : ""
                  }`}
                  value={formValues[name]}
                  onChange={handleFormChange}
                >
                  <option value="" disabled>
                    {placeholder}
                  </option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  className={`form-input ${
                    formErrors[name] ? "border-red-500" : ""
                  } ${type === "checkbox" && "w-auto"} `}
                  value={formValues[name]}
                  onChange={handleFormChange}
                />
              )}
              {formErrors[name] && (
                <p className="text-red-500">{formErrors[name]}</p>
              )}
            </div>
          );
        })}
        <div className="sm:flex sm:items-center">
          <button
            className={`btn-primary sm:ml-auto ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {submitButtonLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
