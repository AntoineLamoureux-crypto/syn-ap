import React from "react";
import { Box } from '@chakra-ui/react'

function UserDetails() {
  return (
    <Box height={'200px'} w={'100%'}>
        <TextOnlyWithButton
        spanText1="Light variant"
        spanText2="Card layouts can vary to support the types of content they contain. The following elements are commonly found among that variety."
        spanText3="Purchase"
        />
    </Box>
  );
}

export default UserDetails;

function TextOnlyWithButton(props) {
  const { spanText1, spanText2, spanText3 } = props;

  return (
    <div className="text-only_with-button">
      <h1 className="titlevalign-text-middleinter-normal-ebony-clay-24px">
        <span>
          <span className="inter-normal-ebony-clay-24px">{spanText1}</span>
        </span>
      </h1>
      <p className="bodyinter-normal-ebony-clay-14px">
        <span className="inter-normal-ebony-clay-14px">{spanText2}</span>
      </p>
      <div className="labeled_centeredborder-1px-tory-blue">
        <div className="labelvalign-text-middleinter-medium-tory-blue-14px">
          <span>
            <span className="inter-medium-tory-blue-14px">{spanText3}</span>
          </span>
        </div>
      </div>
    </div>
  );
}