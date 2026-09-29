import { useState } from "react";

import {
  Activity,
  Brain,
  CheckCircle2,
  Clock3,
  Database,
  GitBranch,
  Loader2,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
  XCircle,
  Zap
} from "lucide-react";

import "./App.css";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [incident, setIncident] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Analyze incident
  const analyzeIncident = async () => {
    if (!incident.trim()) {
      setError("Please describe the production incident first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/analyze-incident`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          incident: incident
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to MemoryOps backend. Make sure FastAPI is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  // Format AI analysis
  const formatAnalysis = (text) => {
    if (!text) return [];

    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  // Hindsight memories
  const memories = result?.memories?.results || [];

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-icon">
            <Brain size={23} />
          </div>

          <div>
            <h1>MemoryOps</h1>
            <span>AI Incident Response</span>
          </div>

        </div>


        <div className="sidebar-section">

          <p className="section-label">
            SYSTEM
          </p>

          <div className="nav-item active">
            <Activity size={18} />
            Incident Center
          </div>

          <div className="nav-item">
            <Brain size={18} />
            Memory
          </div>

          <div className="nav-item">
            <Terminal size={18} />
            Runbooks
          </div>

        </div>


        {/* SYSTEM STATUS */}

        <div className="system-card">

          <div className="system-header">

            <span>
              System Status
            </span>

            <span className="status-dot"></span>

          </div>


          <div className="system-status">

            <CheckCircle2 size={16} />

            All systems operational

          </div>


          <div className="system-line">

            <span>
              Hindsight
            </span>

            <strong>
              Connected
            </strong>

          </div>


          <div className="system-line">

            <span>
              Groq AI
            </span>

            <strong>
              Connected
            </strong>

          </div>


          <div className="system-line">

            <span>
              Memory Bank
            </span>

            <strong>
              Active
            </strong>

          </div>

        </div>


        {/* SIDEBAR FOOTER */}

        <div className="sidebar-footer">

          <div className="powered">

            <Sparkles size={14} />

            Powered by Hindsight

          </div>

          <span>
            Memory that learns.
          </span>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="main">

        {/* TOPBAR */}

        <header className="topbar">

          <div>

            <p className="eyebrow">
              OPERATIONS CENTER
            </p>

            <h2>
              Incident Intelligence
            </h2>

          </div>


          <div className="top-status">

            <span className="live-dot"></span>

            LIVE

          </div>

        </header>


        {/* ================= HERO ================= */}

        <section className="hero">

          <div className="hero-content">

            <div className="hero-badge">

              <Brain size={15} />

              MEMORY-DRIVEN AI

            </div>


            <h3>

              Resolve incidents with

              <span>
                organizational memory.
              </span>

            </h3>


            <p>

              MemoryOps recalls previous incidents,
              identifies patterns, and recommends
              proven resolutions before your team
              starts troubleshooting from scratch.

            </p>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="orbit orbit-one"></div>

            <div className="orbit orbit-two"></div>


            <div className="brain-core">

              <Brain size={42} />

            </div>


            <div className="floating-icon icon-one">

              <Database size={17} />

            </div>


            <div className="floating-icon icon-two">

              <Server size={17} />

            </div>


            <div className="floating-icon icon-three">

              <GitBranch size={17} />

            </div>

          </div>

        </section>


        {/* ================= INCIDENT INPUT ================= */}

        <section className="incident-card">

          <div className="card-heading">

            <div className="heading-icon">

              <Terminal size={19} />

            </div>


            <div>

              <h3>
                Report Production Incident
              </h3>

              <p>
                Describe the symptoms and let
                MemoryOps investigate.
              </p>

            </div>

          </div>


          {/* DEMO BUTTON */}

          <button
            className="demo-btn"
            onClick={() =>
              setIncident(
                "Payment service is again returning HTTP 503 errors during peak traffic. Requests are timing out and the service cannot obtain database connections."
              )
            }
          >

            <Zap size={15} />

            Load Demo Incident

          </button>


          {/* INCIDENT TEXTAREA */}

          <textarea
            value={incident}
            onChange={(e) =>
              setIncident(e.target.value)
            }
            placeholder="Example: Payment API is returning HTTP 503 errors. Database connections are failing and requests are timing out..."
          />


          {/* INPUT FOOTER */}

          <div className="input-footer">

            <span>

              <ShieldCheck size={15} />

              Your incident will be analyzed
              and stored as organizational memory.

            </span>


            <button
              className="analyze-btn"
              onClick={analyzeIncident}
              disabled={loading}
            >

              {loading ? (

                <>

                  <Loader2
                    className="spin"
                    size={18}
                  />

                  Analyzing...

                </>

              ) : (

                <>

                  <Zap size={18} />

                  Analyze Incident

                </>

              )}

            </button>

          </div>


          {/* ERROR */}

          {error && (

            <div className="error-message">

              <XCircle size={17} />

              {error}

            </div>

          )}

        </section>


        {/* ================= RESULTS ================= */}

        {result ? (

          <section className="results-grid">


            {/* ================= MEMORY PANEL ================= */}

            <div className="panel memory-panel">

              <div className="panel-header">

                <div>

                  <div className="panel-title">

                    <Brain size={18} />

                    Memory Recall

                  </div>


                  <p>

                    Hindsight found{" "}
                    {memories.length} relevant memories

                  </p>

                </div>


                <div className="memory-badge">

                  <Search size={14} />

                  RECALLED

                </div>

              </div>


              {/* MEMORY LIST */}

              <div className="memory-list">

                {memories.length > 0 ? (

                  <>

                    {/* MATCH BANNER */}

                    <div className="memory-match-banner">

                      <div className="match-icon">

                        <CheckCircle2 size={18} />

                      </div>


                      <div>

                        <strong>
                          Similar Incident Found
                        </strong>

                        <span>

                          Hindsight recalled{" "}
                          {memories.length} relevant{" "}

                          {memories.length === 1
                            ? "memory"
                            : "memories"}.

                        </span>

                      </div>

                    </div>


                    {/* MEMORY ITEMS */}

                    {memories
                      .slice(0, 3)
                      .map((memory, index) => (

                        <div
                          className="memory-item"
                          key={
                            memory.id || index
                          }
                        >

                          <div className="memory-number">

                            {index + 1}

                          </div>


                          <div className="memory-content">

                            <div className="memory-meta">

                              <span>

                                {memory.type ||
                                  "INCIDENT MEMORY"}

                              </span>


                              {memory.occurred_start && (

                                <span>

                                  <Clock3 size={12} />

                                  {new Date(
                                    memory.occurred_start
                                  ).toLocaleDateString()}

                                </span>

                              )}

                            </div>


                            <p>

                              {memory.text}

                            </p>

                          </div>

                        </div>

                      ))}

                  </>

                ) : (

                  /* NO MEMORY */

                  <div className="no-memory">

                    <Search size={20} />

                    <div>

                      <strong>
                        No previous incident found
                      </strong>

                      <span>

                        This incident will become
                        new organizational knowledge
                        after analysis.

                      </span>

                    </div>

                  </div>

                )}

              </div>

            </div>


            {/* ================= AI ANALYSIS ================= */}

            <div className="panel analysis-panel">

              <div className="panel-header">

                <div>

                  <div className="panel-title">

                    <Sparkles size={18} />

                    AI Analysis

                  </div>


                  <p>

                    Generated using recalled
                    organizational knowledge

                  </p>

                </div>


                <div className="ai-badge">

                  GROQ

                </div>

              </div>


              <div className="analysis-content">

                {formatAnalysis(
                  result.analysis
                ).map((line, index) => {

                  const isHeading =
                    /^\*\*\d+\./.test(line) ||
                    line.startsWith("**");


                  const cleanLine = line
                    .replace(/\*\*/g, "")
                    .replace(/^[-•]\s*/, "")
                    .trim();


                  return (

                    <div
                      className={
                        isHeading
                          ? "analysis-section"
                          : "analysis-line"
                      }
                      key={index}
                    >

                      {isHeading && (

                        <div className="analysis-heading">

                          <Wrench size={15} />

                          {cleanLine}

                        </div>

                      )}


                      {!isHeading && (

                        <div className="analysis-text">

                          {cleanLine}

                        </div>

                      )}

                    </div>

                  );

                })}

              </div>

            </div>

          </section>

        ) : (

          /* ================= EMPTY STATE ================= */

          <section className="empty-state">

            <div className="empty-icon">

              <Brain size={30} />

            </div>


            <h3>
              Memory is ready
            </h3>


            <p>

              Submit a production incident above
              to recall previous experiences and
              generate a memory-informed response.

            </p>


            <div className="example-chip">

              Try the Payment API 503 example

            </div>

          </section>

        )}


        {/* ================= MEMORY LEARNING ================= */}

       {/* ================= MEMORY LEARNING ================= */}

{result && (

  <section className="learning-section">

    <div className="learning-header">

      <div>
        <p className="eyebrow">MEMORY PIPELINE</p>

        <h3>How MemoryOps Learns</h3>

        <p>
          Every incident becomes an experience that can
          improve future incident response.
        </p>
      </div>

      <div className="learning-status">
        <span></span>
        MEMORY UPDATED
      </div>

    </div>


    <div className="learning-flow">

      {/* STEP 1 */}

      <div className="flow-step">

        <div className="flow-icon">
          <Terminal size={19} />
        </div>

        <div>
          <strong>Incident</strong>

          <span>
            Production failure reported
          </span>
        </div>

      </div>


      <div className="flow-arrow">→</div>


      {/* STEP 2 */}

      <div className="flow-step">

        <div className="flow-icon">
          <Search size={19} />
        </div>

        <div>
          <strong>Hindsight Recall</strong>

          <span>
            Search past experiences
          </span>
        </div>

      </div>


      <div className="flow-arrow">→</div>


      {/* STEP 3 */}

      <div className="flow-step">

        <div className="flow-icon">
          <Brain size={19} />
        </div>

        <div>
          <strong>Past Experience</strong>

          <span>
            Find similar incidents
          </span>
        </div>

      </div>


      <div className="flow-arrow">→</div>


      {/* STEP 4 */}

      <div className="flow-step">

        <div className="flow-icon">
          <Sparkles size={19} />
        </div>

        <div>
          <strong>AI Analysis</strong>

          <span>
            Generate memory-informed fix
          </span>
        </div>

      </div>


      <div className="flow-arrow">→</div>


      {/* STEP 5 */}

      <div className="flow-step">

        <div className="flow-icon">
          <Database size={19} />
        </div>

        <div>
          <strong>New Memory</strong>

          <span>
            Store the new experience
          </span>
        </div>

      </div>

    </div>


    {/* STORED MESSAGE */}

    <div className="learning-message">

      <CheckCircle2 size={19} />

      <div>

        <strong>
          Incident successfully learned
        </strong>

        <span>
          This incident and its AI analysis have
          been retained in Hindsight. Future incidents
          can use this experience during recall.
        </span>

      </div>

    </div>

  </section>

)}


        {/* ================= FOOTER ================= */}

        <footer>

          <span>

            MemoryOps · AI Incident Response

          </span>


          <span>

            Hindsight Memory + Groq AI

          </span>

        </footer>

      </main>

    </div>
  );
}

export default App;