import { Card, CardContent } from "../components/ui/card"

function WelcomeCard() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-xl font-bold">👋 Welcome to Agentic UX</h1>
          <p className="text-sm mt-2 text-gray-600">
            Start by creating your first UX project and talk to the AI agent.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default WelcomeCard