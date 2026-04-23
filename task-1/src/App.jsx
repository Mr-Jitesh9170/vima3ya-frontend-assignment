import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import FormField from "./components/FormField.jsx";
import Section from "./components/Section.jsx";
import Sidebar from "./components/sidebar.jsx";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    company: "",
    role: "",
    experience: "",
    skills: "",
  };

  const isValid = (values) => {
    return Object.values(values).every((v) => v.trim() !== "");
  };

  const onFormComplete = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div style={{ display: "flex", gap: "40px", padding: "100px 20px" }}>
      <div className="siderBar" style={{ flex: 1 }}>
        <Sidebar />
      </div>
      <div style={{ padding: "20px", flex: 9 }}>
        <Formik initialValues={initialValues} onSubmit={() => setSubmitted(true)}>
          {
            ({ values }) => {
              useEffect(() => {
                if (isValid(values)) {
                  onFormComplete();
                }
              }, [values]);

              return (
                <Form >
                  <Section id="sectionA" title="Section A — Personal Info">
                    <FormField name="firstName" placeholder="first name" showError={submitted} />
                    <FormField name="lastName" placeholder="last name" showError={submitted} />
                    <FormField name="email" placeholder="Email" validator="email" showError={submitted} />
                  </Section>

                  <Section id="sectionB" title="Section B — Contact">
                    <FormField name="phone" placeholder="Phone" validator="phone" showError={submitted} />
                    <FormField name="city" placeholder="City" showError={submitted} />
                  </Section>

                  <Section id="sectionC" title="Section C — Work">
                    <FormField name="company" placeholder="Company" showError={submitted} />
                    <FormField name="role" placeholder="Role" showError={submitted} />
                  </Section>

                  <Section id="sectionD" title="Section D — Skills">
                    <FormField name="experience" placeholder="Experience" showError={submitted} />
                    <FormField name="skills" placeholder="Skills" showError={submitted} />
                  </Section>

                  <button type="submit">Submit</button>

                  {loading && (
                    <div style={{ marginTop: "20px" }}>
                      🔄 Loading (Simulating API...)
                    </div>
                  )}
                </Form>
              );
            }}
        </Formik>
      </div>
    </div>
  );
}

export default App