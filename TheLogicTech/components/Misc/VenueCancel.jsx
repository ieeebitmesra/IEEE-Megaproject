import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteEvent } from "../../config/api/eventAPI";
import { useContext, useState } from "react";
import { UserContext } from "../../context/Users";
import { mutate } from "swr";
import { LoadingButton } from "@mui/lab";
import { deleteVenue } from "../../config/api/venueAPI";
import { deleteUserVenue } from "../../config/api/userVenueAPI";

export default function AlertDialog({
  title,
  open,
  setOpen,
  venue,
  type,
  uid,
  setAlertOpen,
}) {
  const [loading, setLoading] = useState(false);
	const user = useContext(UserContext);


  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
		try {
			await deleteUserVenue(venue.id);
			await deleteVenue(venue.type, venue.id);
			mutate(`/api/user/${user.uid}/uservenue`);
		} catch (err) {
			console.log(err);
		}
    setOpen(false);
	};
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="poppins" id="alert-dialog-title">
          {"Cancel Event"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="poppins" id="alert-dialog-description">
            Are you sure you want to Delete{" "}
            <b className="capitalize">{title}?</b>
          </DialogContentText>
        </DialogContent>
        <div className="flex justify-end gap-3 p-4">
          <Button
            sx={{
              ":hover": {
                backgroundColor: "rgb(244, 244, 245)",
              },
            }}
            onClick={handleClose}
          >
            <div className=" capitalize text-gray-500">Cancel</div>
          </Button>
          <LoadingButton
            variant="contained"
            onClick={handleDelete}
            loading={loading}
            sx={{
              backgroundColor: "rgb(239, 68, 68)",
              ":hover": {
                backgroundColor: "rgb(220, 38, 38)",
              },
            }}
          >
            <div className="capitalize">Confirm</div>
          </LoadingButton>
        </div>
      </Dialog>
    </div>
  );
}
