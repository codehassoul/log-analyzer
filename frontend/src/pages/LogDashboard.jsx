import { useState, useEffect } from "react";
import { mockLogs } from "../mocks/logs";
import LogsTable from "../components/LogsTable";
import LogFilters from "../components/LogFilters";
import { requestAISummary, getErrorGroup } from "../services/api";

export default function LogDashboard() {
  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  /* ------------------ filters ------------------ */

  const services = [...new Set(mockLogs.map((l) => l.service))];
  const levels = [...new Set(mockLogs.map((l) => l.level))];

  const filteredLogs = mockLogs.filter((log) => {
    if (selectedService && log.service !== selectedService) return false;
    if (selectedLevel && log.level !== selectedLevel) return false;
    return true;
  });

  /* ---------- keep selection in sync with filters ---------- */

  useEffect(() => {
    if (selectedLog && !filteredLogs.some((log) => log.id === selectedLog.id)) {
      setSelectedLog(null);
    }
  }, [filteredLogs, selectedLog]);

  /* ---------- load & reset AI summary on log change ---------- */

  useEffect(() => {
    setAiLoading(false);

    if (selectedLog?.errorGroupId) {
      const group = getErrorGroup(selectedLog.errorGroupId);
      setAiSummary(group?.ai_summary || null);
    } else {
      setAiSummary(null);
    }
  }, [selectedLog]);

  /* ------------------ render ------------------ */

  return (
    <div className="dashboard">
      <h2>Log Analysis Dashboard</h2>

      {/* Filters panel */}
      <div className="panel">
        <LogFilters
          services={services}
          levels={levels}
          selectedService={selectedService}
          selectedLevel={selectedLevel}
          onServiceChange={setSelectedService}
          onLevelChange={setSelectedLevel}
          onClear={() => {
            setSelectedService(null);
            setSelectedLevel(null);
          }}
        />
      </div>

      {/* Logs table panel */}
      <div className="panel">
        <LogsTable
          logs={filteredLogs}
          onSelectLog={setSelectedLog}
          selectedLogId={selectedLog?.id}
        />
      </div>

      {/* Details panel */}
      {selectedLog && (
        <div className="details-panel">
          <h3>Log Details</h3>

          <p>
            <strong>Service:</strong> {selectedLog.service}
          </p>
          <p>
            <strong>Level:</strong> {selectedLog.level}
          </p>
          <p>
            <strong>Timestamp:</strong>{" "}
            {new Date(selectedLog.timestamp).toLocaleString()}
          </p>

          <p>
            <strong>Message:</strong>
            <br />
            {selectedLog.message}
          </p>

          {selectedLog.stacktrace && (
            <>
              <p>
                <strong>Stacktrace:</strong>
              </p>
              <pre className="stacktrace">{selectedLog.stacktrace}</pre>
            </>
          )}

          {/* ---------- AI summary ---------- */}

          {selectedLog.errorGroupId && (
            <div style={{ marginTop: "24px" }}>
              <h4>AI Summary</h4>

              {aiSummary ? (
                <pre className="ai-summary">{aiSummary}</pre>
              ) : (
                <button
                  className="ai-button"
                  disabled={aiLoading}
                  onClick={async () => {
                    if (aiLoading) return;

                    setAiLoading(true);
                    const summary = await requestAISummary(
                      selectedLog.errorGroupId,
                    );
                    setAiSummary(summary);
                    setAiLoading(false);
                  }}
                >
                  {aiLoading ? "Generating..." : "Generate AI Summary"}
                </button>
              )}

              <p style={{ fontSize: "12px", color: "#666" }}>
                AI-generated summaries may be incomplete or inaccurate.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
