import { useEffect, useState } from "react";
import { getLineStatus } from "../services/api";

function LiveUpdates() {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLineStatus()
      .then((data) => {
        setLines(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading....</p>;

  return (
    <div>
      <h1>London Live Transport Updates</h1>

      {lines.map((line) => (
        <div key={line.id}>
          <h2>{line.name}</h2>

          {line.lineStatuses.map((status, index) => (
            <p key={index}>
              Status: <strong>{status.statusSeverityDescription}</strong>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default LiveUpdates;