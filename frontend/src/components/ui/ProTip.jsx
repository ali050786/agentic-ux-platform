import { Card } from "./card";
import { Badge } from "./badge";
import { Lightbulb } from "lucide-react";

export function ProTip({ children }) {
  return (
    <Card className="border-l-4 border-yellow-500 bg-yellow-100 p-4 flex items-start gap-3">
      <Lightbulb className="text-yellow-500 mt-1 flex-shrink-0" size={20} strokeWidth={2} />
      <div>
        <Badge
          variant="outline"
          className="text-yellow-900 border-yellow-500 bg-yellow-200 mb-1"
        >
          Pro Tip
        </Badge>
        <p className="text-sm text-gray-900">
          {children}
        </p>
      </div>
    </Card>
  );
} 