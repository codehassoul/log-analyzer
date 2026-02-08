export default function LogsTable({ logs, onSelectLog, selectedLogId }) {
  return (
    <table className="logs-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Level</th>
          <th>Service</th>
          <th>Message</th>
        </tr>
      </thead>

      <tbody>
        {logs.map((log) => {
          const isSelected = log.id === selectedLogId;

          return (
            <tr
              key={log.id}
              onClick={() => onSelectLog(log)}
              className={isSelected ? "selected" : ""}
            >
              <td>{new Date(log.timestamp).toLocaleString()}</td>

              <td className={`level ${log.level.toLowerCase()}`}>
                {log.level}
              </td>

              <td>{log.service}</td>

              <td className="message">
                {log.message.length > 60
                  ? log.message.slice(0, 60) + "…"
                  : log.message}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
