import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";

export function SeedDataButton() {
  const seedData = useMutation(api.seed.seedData);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const result = await seedData({});
      toast.success(result.message);
    } catch (error) {
      toast.error("Failed to seed data");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <button
      onClick={handleSeed}
      disabled={isSeeding}
      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSeeding ? "Loading..." : "Load Sample Data"}
    </button>
  );
}
