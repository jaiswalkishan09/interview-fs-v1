import { useState } from "react";
import { Button, Radio, Input } from "react-daisyui";

type EventCount = {
  yes: number;
  no: number;
  mayBe: number;
};

function App() {
  const [eventCount, setEventCount] = useState<EventCount>();
  const [loading, setLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    "yes" | "no" | "mayBe" | ""
  >("");

  const fetchEventCount = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/get");
      const eventAllData = await res.json();
      const eventData = eventAllData.data;
      setEventCount(eventData);
    } catch (e) {
      alert("Something went wrong while fetching event count.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAction) {
      alert("Please select an action.");
      return;
    }

    try {
      setLoading(true);
      await fetch(`/api/update?action=${selectedAction}`, {
        method: "PUT",
      });
      await fetchEventCount(); // Refresh count after update
    } catch (e) {
      alert("Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <Button color="primary" onClick={fetchEventCount} disabled={loading}>
        {loading ? "Loading..." : "Show Event Action Count"}
      </Button>

      {eventCount && (
        <div className="flex flex-col gap-2 text-center">
          <div className="flex gap-2 justify-center">
            <span>Yes:</span>
            <span>{eventCount.yes}</span>
          </div>
          <div className="flex gap-2 justify-center">
            <span>No:</span>
            <span>{eventCount.no}</span>
          </div>
          <div className="flex gap-2 justify-center">
            <span>MayBe:</span>
            <span>{eventCount.mayBe}</span>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="border rounded-lg p-4 w-full max-w-sm flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold">Submit Your Response</h2>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <Radio
              name="response"
              checked={selectedAction === "yes"}
              onChange={() => setSelectedAction("yes")}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <Radio
              name="response"
              checked={selectedAction === "no"}
              onChange={() => setSelectedAction("no")}
            />
            No
          </label>
          <label className="flex items-center gap-2">
            <Radio
              name="response"
              checked={selectedAction === "mayBe"}
              onChange={() => setSelectedAction("mayBe")}
            />
            MayBe
          </label>
        </div>
        <Button color="success" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}

export default App;
