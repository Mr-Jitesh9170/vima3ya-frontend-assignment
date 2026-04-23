import { useEffect, useState } from "react";

const sections = ["sectionA", "sectionB", "sectionC", "sectionD"];

const Sidebar = () => {
    const [active, setActive] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            const updated = [];

            sections.forEach((id) => {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight / 2.1) {
                        updated.push(id);
                    }
                }
            });

            setActive(updated);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div style={{ position: "fixed", left: "20px", top: "100px" }}>
            {sections.map((sec, index) => (
                <div
                    key={sec}
                    style={{
                        marginBottom: "20px",
                        color: active.includes(sec) ? "blue" : "gray",
                    }}
                >
                    ● Section {String.fromCharCode(65 + index)}
                </div>
            ))}
        </div>
    );
}

export default Sidebar