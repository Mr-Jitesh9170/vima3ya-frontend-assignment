import { useField } from "formik";

const validators = {
    required: (value) => (!value ? "This field is required" : ""),
    email: (value) =>
        !value
            ? "Email is required"
            : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? ""
                : "Invalid email",
    phone: (value) =>
        !value
            ? "Phone is required"
            : /^[6-9]\d{9}$/.test(value)
                ? ""
                : "Invalid phone number",
    number: (value) => typeof value != "number" ? "Age should be number" : "",
};

export default function FormField({
    name,
    placeholder,
    validator,
    errorMessage,
    showError,
}) {
    const [field, meta] = useField(name);

    const error =
        validator && validators[validator]
            ? validators[validator](field.value)
            : !field.value
                ? errorMessage || "This field is required"
                : "";

    return (
        <div style={{ marginBottom: "16px" }}>
            <input
                {...field}
                placeholder={placeholder}
                style={{
                    padding: "10px",
                    width: "100%",
                    border: error && showError ? "1px solid red" : "1px solid #ccc",
                }}
            />
            {showError && error && (
                <div style={{ color: "red", fontSize: "12px" }}>{error}</div>
            )}
        </div>
    );
}