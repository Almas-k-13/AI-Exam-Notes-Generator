import React, { useState } from 'react'
import ReactMarkdown from "react-markdown"
import MermaidSetup from './MermaidSetup';
import RechartSetup from './RechartSetup';
import { downloadPdf } from '../services/api';

const markDownComponent = {
    h1: ({ children }) => (
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mt-8 mb-5 border-b border-gray-200 pb-2">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-2xl font-semibold text-indigo-400 mt-6 mb-4">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
        <ul className="list-disc ml-6 space-y-2 text-gray-700">{children}</ul>
    ),
    li: ({ children }) => (
        <li className="marker:text-indigo-500">{children}</li>
    ),
};

function FinalResult({ result }) {
    const [quickRevision, setQuickRevision] = useState(false);
    if (
        !result ||
        !result.subTopics ||
        !result.questions ||
        !result.questions.short ||
        !result.questions.long ||
        !result.revisionPoints
    ) {
        return null;
    }
    return (
        <div className="mt-8 p-6 space-y-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                    📘 Generated Notes
                </h2>

                <div className="flex gap-3">
                    <button
                        onClick={() => setQuickRevision(!quickRevision)}
                        className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-md ${quickRevision
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                    >
                        {quickRevision ? "Exit Revision Mode" : "Quick Revision (5 min)"}
                    </button>
                    <button
                        onClick={() => downloadPdf(result)}
                        className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 shadow-md"
                    >
                        ⬇️ Download PDF
                    </button>
                </div>
            </div>

            {/* Sub Topics */}
            {!quickRevision && (
                <section>
                    <SectionHeader icon="⭐" title="Sub Topics" color="indigo" />
                    {Object.entries(result.subTopics).map(([star, topics]) => (
                        <div key={star} className="mb-4">
                            <p className="font-semibold text-indigo-600 mb-2">
                                {star} Priority
                            </p>
                            <ul className="list-disc ml-6 text-gray-700 space-y-1">
                                {topics.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* Detailed Notes */}
            {!quickRevision && (
                <section>
                    <SectionHeader icon="📝" title="Detailed Notes" color="purple" />
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                        <ReactMarkdown components={markDownComponent}>
                            {result.notes}
                        </ReactMarkdown>
                    </div>
                </section>
            )}

            {/* Quick Revision */}
            {quickRevision && (
                <section className="rounded-2xl bg-gradient-to-r from-green-100 to-green-50 border border-green-200 p-6 shadow-sm">
                    <h3 className="font-bold text-green-700 mb-4 text-lg">
                        ⚡ Exam Quick Revision Points
                    </h3>
                    <ul className="list-disc ml-6 space-y-2 text-gray-800">
                        {result.revisionPoints.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Diagram */}
            {result.diagram?.data && (
                <section>
                    <SectionHeader icon="📊" title="Diagram" color="cyan" />
                    <MermaidSetup diagram={result.diagram?.data} />
                    <p className="mt-3 text-xs text-gray-500 italic">
                        ℹ️ Save this diagram for future reference by taking a screenshot.
                    </p>
                </section>
            )}

            {/* Charts */}
            {result.charts?.length > 0 && (
                <section>
                    <SectionHeader icon="📈" title="Visual Charts" color="indigo" />
                    <RechartSetup charts={result.charts} />
                    <p className="mt-3 text-xs text-gray-500 italic">
                        ℹ️ Save this chart for future reference by taking a screenshot.
                    </p>
                </section>
            )}

            {result.charts && result.charts.length === 0 && (
                <p className="text-sm text-gray-400 italic">
                    📉 Charts are not relevant for this topic.
                </p>
            )}

            {/* Questions */}
            <section>
                <SectionHeader icon="❓" title="Important Questions" color="rose" />
                <p className="font-semibold text-gray-800">Short Questions:</p>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                    {result.questions.short.map((q, i) => (
                        <li key={i}>{q}</li>
                    ))}
                </ul>

                <p className="font-semibold text-gray-800 mt-5">Long Questions:</p>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                    {result.questions.long.map((q, i) => (
                        <li key={i}>{q}</li>
                    ))}
                </ul>

                <p className="font-semibold text-gray-800 mt-5">Diagram Questions:</p>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                    <li>{result.questions.diagram}</li>
                </ul>
            </section>
        </div>
    );
}

function SectionHeader({ icon, title, color }) {
    const colors = {
        indigo: "from-indigo-100 to-indigo-50 text-indigo-700",
        purple: "from-purple-100 to-purple-50 text-purple-700",
        blue: "from-blue-100 to-blue-50 text-blue-700",
        green: "from-green-100 to-green-50 text-green-700",
        cyan: "from-cyan-100 to-cyan-50 text-cyan-700",
        rose: "from-rose-100 to-rose-50 text-rose-700",
    };
    return (
        <div
            className={`mb-6 px-5 py-3 rounded-xl bg-gradient-to-r ${colors[color]} font-semibold flex items-center gap-3 shadow-sm`}
        >
            <span className="text-lg">{icon}</span>
            <span>{title}</span>
        </div>
    );
}


export default FinalResult