"use client";

import { useEffect, useState } from "react";

export default function AnalyticsChart({ handle, links }) {
    const [chartData, setChartData] = useState([]);
    const [selected, setSelected] = useState(null); // 👈 NEW

    useEffect(() => {
        const fetchAnalytics = async () => {
            const res = await fetch(`/api/analytics?handle=${handle}`);
            const data = await res.json();

            const grouped = data.analytics.reduce((acc, item) => {
                const dateObj = new Date(item.timestamp);

                const date = dateObj.toLocaleDateString();
                const hour = dateObj.getHours(); // 👈 KEY CHANGE
                const link = item.linkTitle;

                if (!data.analytics || data.analytics.length === 0) {
                    // fallback using links
                    const fakeData = [
                        {
                            date: "Today",
                            ...links.reduce((acc, link) => {
                                acc[link.title] = {
                                    total: link.clicks || 0,
                                    hours: {}
                                };
                                return acc;
                            }, {})
                        }
                    ];

                    setChartData(fakeData);
                    return;
                }

                if (!acc[date]) {
                    acc[date] = {};
                }

                if (!acc[date][link]) {
                    acc[date][link] = {
                        total: 0,
                        hours: {} // 👈 store hour distribution
                    };
                }

                // total clicks
                acc[date][link].total++;

                // hour clicks
                if (!acc[date][link].hours[hour]) {
                    acc[date][link].hours[hour] = 0;
                }

                acc[date][link].hours[hour]++;

                return acc;
            }, {});

            const formatted = Object.keys(grouped).map(date => ({
                date,
                ...grouped[date]
            }));
            setChartData(formatted);
        };

        fetchAnalytics();
    }, [handle]);

    return (
        <>
            <div style={{ display: "flex", alignItems: "flex-end", height: "200px", gap: "30px" }}>
                {chartData.map((item, index) => {
                    const links = Object.keys(item).filter(key => key !== "date");

                    return (
                        <div key={index} style={{ textAlign: "center" }}>

                            <div style={{ display: "flex", gap: "5px", alignItems: "flex-end" }}>
                                {links.map((link, i) => (
                                    <div key={i} style={{ textAlign: "center" }}>

                                        <div
                                            onClick={() =>
                                                setSelected({
                                                    date: item.date,
                                                    link,
                                                    clicks: item[link].total,
                                                    hours: item[link].hours
                                                })
                                            }
                                            style={{
                                                height: `${item[link].total * 20}px`,
                                                width: "20px",
                                                background:
                                                    link === "instagram"
                                                        ? "#E1306C"
                                                        : link === "facebook"
                                                            ? "#1877F2"
                                                            : "#999",
                                                borderRadius: "4px",
                                                cursor: "pointer"
                                            }}
                                        ></div>

                                        <p style={{ fontSize: "10px" }}>{link}</p>
                                    </div>
                                ))}
                            </div>

                            <p style={{ marginTop: "8px", fontSize: "12px" }}>
                                {item.date}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* 👇 DETAILS PANEL */}
            {selected && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
                    <h4>Details</h4>
                    <p><strong>Date:</strong> {selected.date}</p>
                    <p><strong>Link:</strong> {selected.link}</p>
                    <p><strong>Clicks:</strong> {selected.clicks}</p>

                    <p><strong>Clicks by Hour:</strong></p>
                    <ul>
                        {Object.entries(selected.hours).map(([hour, count]) => (
                            <li key={hour}>
                                {hour}:00 → {count}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}