import { useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Edit from "@mui/icons-material/Edit";
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';

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

const EditIcon = styled(Edit)({
    //position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
})

const EditModal = ({ post, onEdit }: any) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePost = (e: any) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const data = { ...post, title, body };
        onEdit(data)
        setOpen(false);
    };

    return (
        <div>
            <EditIcon
                //variant={"outlined"}
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
                            Edit
                        </Typography>
                        <form onSubmit={handlePost}>
                            <TextField
                                label="Title"
                                name="title"
                                defaultValue={post.title}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Body"
                                name="body"
                                defaultValue={post.body}
                                fullWidth
                                margin="normal"
                            />
                            <MuiGrid item xs={12}>
                                <MuiGrid container spacing={3} justifyContent="space-between">
                                    <MuiGrid item>
                                        <Button
                                            type="submit"
                                            color="primary"
                                        >
                                            Edit
                                        </Button>
                                    </MuiGrid>
                                    <MuiGrid item>
                                        <Button color="secondary" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                    </MuiGrid>
                                </MuiGrid>
                            </MuiGrid>
                        </form>
                    </Paper>
                </Fade>
            </StyledModal>
        </div>
    );
}

export default EditModal;