import React from "react";
import ContentForm from "./components/ContentForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        AI Content Assistant
      </h1>
      <ContentForm />
    </div>
  );
}

export default App;
