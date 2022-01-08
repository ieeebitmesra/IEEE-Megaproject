import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "d19ecb6c3bd041b0aa792108fea5f7bf";
// eslint-disable-next-line
let token =
  "006117cbbe21954403da09d4b8f555e6b4bIABFWIHVh9jSM6HxvvM8TmUWmXiUNG6/Y83UOov7eYv0LEGu9ScAAAAAEACVNqlcO93KYQEAAQA73cph/RZCGNlBu/U+RaSyhA0d5owGf3fC1cpUlB0Gu9ScAAAAAEACVNqlc69nKYQEAAQDr2cph";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: null };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

