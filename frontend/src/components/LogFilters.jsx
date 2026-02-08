export default function LogFilters({
  services,
  levels,
  selectedService,
  selectedLevel,
  onServiceChange,
  onLevelChange,
  onClear,
}) {
  return (
    <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
      {/* Service filter */}
      <select
        value={selectedService || ""}
        onChange={(e) => onServiceChange(e.target.value || null)}
      >
        <option value="">All services</option>
        {services.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>

      {/* Level filter */}
      <select
        value={selectedLevel || ""}
        onChange={(e) => onLevelChange(e.target.value || null)}
      >
        <option value="">All levels</option>
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      <button onClick={onClear}>Clear</button>
    </div>
  );
}
