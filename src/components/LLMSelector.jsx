import React from "react";
import Select from "./Select";

function LLMSelector({ selectedModel, models, setSelectedModel }) {
  return (
    <Select
      label=""
      options={models}
      value={selectedModel}
      onChange={(e) => setSelectedModel(e.target.value)}
      classNames="text-lg"
    />
  );
}

export default LLMSelector;
