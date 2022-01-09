export const UseUtils = () => {

   const close = (s) => {
      var element = document.getElementById(s);
      element.classList.add("d-none");
   }

   const open = (s) => {
      var element = document.getElementById(s);
      element.classList.remove("d-none");
   }

   const show_video = () => {
      close("chat_space");
      close("board_space");
      close("code_space");
      close("git_space");
      open("setting_space");
      open("video_space");
   }

   const show_chat = () => {
      close("video_space");
      close("board_space");
      close("code_space");
      close("git_space");
      close("setting_space");
      open("chat_space");
   }

   const show_board = () => {
      close("video_space");
      close("chat_space");
      close("code_space");
      close("git_space")
      close("setting_space");
      open("board_space");
   }

   const show_code = () => {
      close("video_space");
      close("chat_space");
      close("board_space");
      close("git_space")
      close("setting_space");
      open("code_space");
   }

   const show_git = () => {
      close("video_space");
      close("chat_space");
      close("board_space");
      close("code_space");
      close("setting_space");
      open("git_space");
   }

   return {
      show_video, show_chat, show_board, show_code, show_git
   };
}

