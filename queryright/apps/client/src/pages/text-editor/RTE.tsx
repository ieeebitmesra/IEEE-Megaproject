// import { PlateEditor } from "./components/editor/plate-editor"

// import {
//   LiveblocksProvider,
//   RoomProvider,
// } from "@liveblocks/react/suspense";
// app.tsx or page.tsx
// import { ClientSideSuspense } from '@liveblocks/react/suspense';
// import { RoomProvider } from './components/editor/liveblocks.config';
// import { PlateEditor } from './components/editor/plate-editor';
import MyStaticPage from './components/editor/plate-static-editor'

// function RTE() {
//   return (
//     <RoomProvider
//       id="my-collaborative-document"
//       initialPresence={{}}
//       // IMPORTANT: Set user info for cursors
//       initialStorage={{}}
//     >
//       <ClientSideSuspense fallback={<div>Loading room...</div>}>
//         {() => <PlateEditor />}
//       </ClientSideSuspense>
//     </RoomProvider>
//   );
// }

// export default RTE;
function RTE() {
  return (
    //  <LiveblocksProvider publicApiKey={"pk_dev_Wg39_VcSqHhi4AxZbkEfx_v0UwSrLghUQy2Qv9XbcdUC7u5AG3lEMqtgtxlIeFEy"}>
    <MyStaticPage />
  )
}
export default RTE
