import React from "react";
import { useEffect, useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

const CategorySection = () => {
  const [open, setOpen] = useState(true);
  const focusRef = useRef();



  return (
      <BottomSheet
        open={true}
        className="neumorphism pressed accent"
        //onDismiss={() => setOpen(false)}
        blocking={false}
        header={
          <input
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-300 focus:bg-white focus:ring-0"
            type="text"
            placeholder="Text input field in a sticky header"
          />
        }
        defaultSnap={({ maxHeight }) => maxHeight * 0.4}
        snapPoints={({ maxHeight }) => [maxHeight * 0.4, maxHeight * 0.9]}
      >
        <p>
          it's possible to use the Bottom Sheet as an height adjustable
          sidebar/panel.
        </p>
        <p>You can combine this wito fine-tune the behavior you want.</p>
      </BottomSheet>
  );
};

export default CategorySection;
