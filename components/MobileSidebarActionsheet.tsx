import React from "react";

import Sidebar from "./SliderFilters";
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from "./ui/actionsheet";

const MobileSidebarActionsheet = ({
  actionsheetVisible,
  setActionsheetVisible,
}: any) => {
  const handleClose = () => {
    setActionsheetVisible(false);
  };
  return (
    <Actionsheet
      isOpen={actionsheetVisible}
      onClose={handleClose}
      snapPoints={[80]}  
    >
      <ActionsheetBackdrop />
      <ActionsheetContent className="w-full ios:pb-20 android:pb-10">  
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <Sidebar />
      </ActionsheetContent>
    </Actionsheet>
  );
};
export default MobileSidebarActionsheet;
