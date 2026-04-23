const Section = ({ id, title, children }) => {
    return (
        <div id={id} style={{ marginBottom: "80px" }}>
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export default Section