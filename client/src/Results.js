import React, {useCallback} from "react";

export default (shortURL, onUrlChange) => {

  const handleInputChange = useCallback(event => {
    onUrlChange(event.target.value)
  }, [onUrlChange])

  return (
    <div style={{ marginBottom: 30 }} id="results" className="search-results" onChange={handleInputChange}>
        {shortURL}
    </div>
  );
};
