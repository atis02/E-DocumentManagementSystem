import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const phoneNumbers = [
  "+1 202-555-0123",
  "+1 303-555-0142",
  "+44 20 7946 0958",
  "+91 98765 43210",
  "+49 30 12345678",
];

function PhoneNumberAutocomplete() {
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      options={phoneNumbers}
      sx={{
        width: { lg: "70%", md: "70%", sm: "90%", xs: "90%" },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Phone Number"
          placeholder="Type or select a number"
          variant="outlined"
        />
      )}
      freeSolo
    />
  );
}

export default PhoneNumberAutocomplete;
