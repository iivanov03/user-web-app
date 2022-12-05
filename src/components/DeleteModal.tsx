import { useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Delete from "@mui/icons-material/Delete";
import MuiGrid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
})

const Paper = styled('div')(({ theme }) => ({
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
}))


const DeleteModal = ({ post, onDelete }: any) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleDelete = (event: any) => {
        event.preventDefault();
        onDelete(post.id)
        handleClose();
    };

    return (
        <div>
            <Delete
                color={"primary"}
                onClick={handleOpen}
            />
            <StyledModal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Paper>
                        <Typography variant={"h5"} component={"h6"}>
                            Are you sure you want to delete this post?
                        </Typography>
                        <MuiGrid item xs={12}>
                            <MuiGrid container spacing={3} justifyContent="space-between">
                                <MuiGrid item>
                                    <Button
                                        onClick={handleDelete}
                                        color="primary"
                                    >
                                        Delete
                                    </Button>
                                </MuiGrid>
                                <MuiGrid item>
                                    <Button color="secondary" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </MuiGrid>
                            </MuiGrid>
                        </MuiGrid>
                    </Paper>
                </Fade>
            </StyledModal>
        </div>
    );
}

export default DeleteModal;